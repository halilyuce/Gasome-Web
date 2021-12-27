<template>
  <div>
    <ul
      class="
        relative
        divide-y divide-gray-100
        dark:divide-gray-600 dark:divide-opacity-20
        divide-solid
      "
    >
      <li v-for="swap in swaps" :key="swap.id">
        <div
          class="
            flex flex-row
            justify-between
            border-l-4
            items-center
            px-5
            py-3
          "
          :style="'border-color:' + swap.platform.color"
        >
          <n-link
            class="flex flex-row items-center"
            :to="'/u/' + swap.user.username"
          >
            <img
              class="cursor-pointer h-12 w-12 rounded-xl object-cover"
              :src="`${smallAvatar + swap.user.avatar}.jpg`"
              alt="Game Cover"
            />
            <div class="flex flex-col ml-3">
              <h4>
                {{ swap.user.name }}
              </h4>
              <span class="text-xs text-gray-700 dark:text-gray-400">
                {{ '@' + swap.user.username }}
              </span>
            </div>
          </n-link>
          <div
            class="
              flex flex-col
              items-end
              text-xs text-gray-700
              dark:text-gray-400
            "
          >
            <h4>{{ swap.platform.name }}</h4>
            <vs-button
              danger
              :loading="deleteLoading === swap.id"
              @click="removeSwap(swap.id)"
              v-if="loggedInUser.id === swap.user.id"
              >{{ $t('g.remove') }}</vs-button
            >
            <vs-button v-else @click="showModal(swap)">{{
              $t('g.swap')
            }}</vs-button>
          </div>
        </div>
      </li>

      <client-only>
        <infinite-loading
          v-if="!enough"
          spinner="spiral"
          :distance="300"
          @infinite="infiniteHandler"
          ><span slot="no-results"></span><span slot="no-more"></span
        ></infinite-loading>
      </client-only>
    </ul>
    <NoData v-if="!loading && swaps.length === 0" class="m-6" />
    <vs-dialog v-model="showGames">
      <template #header>
        <h4 class="not-margin text-xs">
          {{ $t('g.selectSwapGame') }}
        </h4>
      </template>

      <div
        class="
          bg-white
          dark:bg-black
          shadow-xl
          max-w-2xl
          px-5
          py-3
          mb-3
          rounded-lg
        "
      >
        <ul
          v-if="userSwapList && userSwapList.length > 0"
          class="flex flex-row items-center w-full overflow-auto space-x-5"
        >
          <li
            class="cursor-pointer transition duration-150 ease-in-out"
            :class="{
              'bg-purple-200 dark:bg-purple-300 p-2 rounded-xl':
                selectedGame === swap.id,
            }"
            v-for="swap in userSwapList"
            :key="swap.id"
            @click="selectedGame = swap.id"
          >
            <div
              class="flex flex-col w-20 items-center justify-center rounded-xl"
              :style="'background-color:' + swap.platform.color"
            >
              <h6 class="text-white text-2xs truncate text-center w-20 my-1">
                {{ swap.platform.name }}
              </h6>
              <img
                :src="`${smallGameCover + swap.game.image}.jpg`"
                :alt="swap.game.name"
                class="rounded-b-xl w-20 h-24"
              />
            </div>
          </li>
        </ul>
        <no-data
          v-if="
            !userSwapListLoading && userSwapList && userSwapList.length === 0
          "
        />
        <client-only>
          <InfiniteScrollingHorizontal
            v-if="!swapListEnough"
            :identifier="loggedInUser.id"
            direction="right"
            spinner="spiral"
            :distance="300"
            @infinite="SwapListInfiniteHandler"
            ><span slot="no-results"></span><span slot="no-more"></span
          ></InfiniteScrollingHorizontal>
        </client-only>
      </div>

      <template #footer>
        <div class="flex flex-col">
          <vs-button
            :loading="createSwapLoading"
            @click="sendSwapRequest()"
            block
          >
            {{ $t('g.sendSwap') }}
          </vs-button>
          <vs-button transparent danger block @click="showGames = false">
            {{ $t('g.cancel') }}
          </vs-button>
        </div>
      </template>
    </vs-dialog>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import NoData from '~/components/UI/NoData.vue'
import InfiniteScrollingHorizontal from '../../helpers/horizontalScroll'
export default {
  components: { NoData, InfiniteScrollingHorizontal },
  props: {
    id: null,
  },
  computed: {
    ...mapGetters(['loggedInUser']),
    ...mapState({
      swaps: (state) => state.game.swaps,
      loading: (state) => state.game.swapsLoading,
      pageState: (state) => state.game.swapsPage,
      enough: (state) => state.game.swapsEnough,
      userSwapList: (state) => state.swaps.userSwapList,
      userSwapListLoading: (state) => state.swaps.userSwapListLoading,
      userSwapListEnough: (state) => state.swaps.userSwapListEnough,
      userSwapListPageState: (state) => state.swaps.userSwapListPage,
      createSwapLoading: (state) => state.swaps.createSwapLoading,
      deleteLoading: (state) => state.game.deleteLoading,
    }),
    page: {
      get() {
        return this.pageState
      },
      set(value) {
        this.setSwapsPage(value)
      },
    },
    userSwapListPage: {
      get() {
        return this.userSwapListPageState
      },
      set(value) {
        this.setCurrentPage(value)
      },
    },
    swapListEnough: {
      get() {
        return this.userSwapListEnough
      },
      set(value) {
        this.setEnough(value)
      },
    },
  },
  data() {
    return {
      smallAvatar: process.env.AVATAR_SMALL,
      smallGameCover: process.env.GAMECOVER_SMALL,
      mediumGameCover: process.env.GAMECOVER_MEDIUM,
      showGames: false,
      selectedGame: null,
      selectedSwap: null,
    }
  },
  methods: {
    ...mapActions({
      getSwaps: 'game/getSwaps',
      toggleSwapsLoading: 'game/toggleSwapsLoading',
      setSwapsPage: 'game/setSwapsPage',
      toggleSwapsEnough: 'game/toggleSwapsEnough',
      getUserSwapList: 'swaps/getUserSwapList',
      setCurrentPage: 'swaps/setUserSwapListPage',
      setEnough: 'swaps/setUserSwapListEnough',
      toggleUserSwapListLoading: 'swaps/toggleUserSwapListLoading',
      createSwap: 'swaps/createSwap',
      deleteFromSwapList: 'game/deleteFromSwapList',
    }),
    showModal(swap) {
      this.selectedSwap = swap
      this.showGames = !this.showGames
    },
    removeSwap(id) {
      this.deleteFromSwapList(id)
    },
    sendSwapRequest() {
      const self = this
      this.createSwap({
        receiverId: this.selectedSwap.user_id,
        swapId: this.selectedGame,
        wishId: this.selectedSwap.id,
        process: 1,
      })
        .then((res) => {
          self.$vs.notification({
            flat: true,
            color: 'success',
            icon: `<i class='bx bx-check-circle' ></i>`,
            position: 'bottom-right',
            title: self.$t('swaps.sentSwapSuccessTitle'),
            text: self.$t('swaps.sentSwapSuccessDesc'),
          })
          self.showGames = false
        })
        .catch((err) => {
          self.$vs.notification({
            flat: true,
            color: 'danger',
            icon: `<i class='bx bx-error-circle'></i>`,
            position: 'bottom-right',
            title: self.$t('login.error'),
            text: err,
          })
        })
    },
    SwapListInfiniteHandler($state) {
      const self = this
      if (!this.swapListEnough) {
        this.toggleUserSwapListLoading(true)
        this.getUserSwapList(this.loggedInUser.username).then(function (res) {
          if (res.data.length < 10) {
            $state.complete()
            self.swapListEnough = true
            self.selectedGame = res.data[0].id
          } else {
            self.userSwapListPage += 1
            $state.loaded()
          }
        })
      }
    },
    infiniteHandler($state) {
      const self = this
      if (this.page === 0) {
        this.toggleSwapsLoading(true)
      }
      if (!this.enough) {
        this.page += 1
        this.getSwaps(this.id).then(function (res) {
          if (res.data.length < 10) {
            $state.complete()
            self.toggleSwapsEnough(true)
          } else {
            $state.loaded()
          }
        })
      }
    },
  },
}
</script>

<style lang="scss"></style>
