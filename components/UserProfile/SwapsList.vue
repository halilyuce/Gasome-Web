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
        <div class="flex flex-row justify-between items-center px-5 py-3">
          <n-link class="flex flex-row items-center" :to="'/g/' + swap.game.id">
            <img
              class="cursor-pointer h-16 w-12 rounded object-cover"
              :src="`${smallCover + swap.game.image}.jpg`"
              alt="Game Cover"
            />
            <div class="flex flex-col ml-3">
              <h4>
                {{ swap.game.name }}
              </h4>
              <span class="text-xs text-gray-700 dark:text-gray-400">
                {{ swap.platform.name }}
              </span>
            </div>
          </n-link>
          <div class="flex flex-row">
            <vs-button
              v-if="same"
              icon
              flat
              :loading="swapListLoading"
              @click="
                addSwapList({ id: swap.game.id, platform: swap.platform.id })
              "
            >
              <i class="bx bx-shuffle"></i>
            </vs-button>
            <vs-button
              v-if="same"
              :loading="wishListLoading"
              @click="
                addWishList({ id: swap.game.id, platform: swap.platform.id })
              "
              icon
              flat
            >
              <i class="bx bx-heart"></i>
            </vs-button>
            <vs-button
              v-else
              :loading="removeLoading"
              @click="openModal(swap)"
              danger
              icon
              flat
            >
              <i class="bx bx-trash"></i>
            </vs-button>
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
    <no-data class="m-6" v-if="!loading && swaps.length === 0" />
    <vs-dialog v-model="showRemove">
      <template #header>
        <h4 class="not-margin">Are you sure to <b>Remove?</b></h4>
      </template>

      <div v-if="removedSwap" class="flex flex-col justify-center items-center">
        <img
          class="cursor-pointer h-16 w-12 rounded object-cover"
          :src="`${smallCover + removedSwap.game.image}.jpg`"
          alt="Game Cover"
        />
        <h4>
          {{ removedSwap.game.name }}
        </h4>
        <span class="text-xs text-gray-700 dark:text-gray-400">
          {{ removedSwap.platform.name }}
        </span>
      </div>

      <template #footer>
        <div class="flex flex-col">
          <vs-button danger @click="removeSwapList(removedSwap.id)" block>
            Yes, remove
          </vs-button>
          <vs-button transparent danger @click="showRemove = false" block>
            Cancel
          </vs-button>
        </div>
      </template>
    </vs-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import NoData from '~/components/UI/NoData.vue'
export default {
  components: { NoData },
  props: {
    id: null,
    same: false,
  },
  computed: {
    ...mapState({
      swaps: (state) => state.profile.swaps,
      loading: (state) => state.profile.swapsLoading,
      swapListLoading: (state) => state.profile.swapListLoading,
      wishListLoading: (state) => state.profile.wishListLoading,
      removeLoading: (state) => state.profile.removeLoading,
      pageState: (state) => state.profile.swapsPage,
      enough: (state) => state.profile.swapsEnough,
    }),
    page: {
      get() {
        return this.pageState
      },
      set(value) {
        this.setSwapsPage(value)
      },
    },
  },
  data() {
    return {
      smallCover: process.env.GAMECOVER_SMALL,
      showRemove: false,
      removedSwap: null,
    }
  },
  methods: {
    ...mapActions({
      getSwaps: 'profile/getSwaps',
      toggleSwapsLoading: 'profile/toggleSwapsLoading',
      addToSwapList: 'profile/addToSwapList',
      addToWishList: 'profile/addToWishList',
      removeFromSwapList: 'profile/removeFromSwapList',
      setSwapsPage: 'profile/setSwapsPage',
      toggleSwapsEnough: 'profile/toggleSwapsEnough',
    }),
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
    openModal(swap) {
      this.removedSwap = swap
      this.showRemove = true
    },
    removeSwapList(id) {
      this.showRemove = false
      this.removeFromSwapList(id)
        .then((res) => {
          this.$vs.notification({
            flat: true,
            color: 'success',
            icon: `<i class='bx bx-check' ></i>`,
            position: 'top-center',
            title: 'Successfully Removed',
            text: 'Game removed successfully from your Swap List',
          })
        })
        .catch((err) => {
          this.$vs.notification({
            flat: true,
            color: 'danger',
            icon: `<i class='bx bx-error' ></i>`,
            position: 'top-center',
            title: 'An Error Occured',
            text: err,
          })
        })
    },
    addSwapList(payload) {
      this.addToSwapList(payload)
        .then((res) => {
          this.$vs.notification({
            flat: true,
            color: 'success',
            icon: `<i class='bx bx-check' ></i>`,
            position: 'top-center',
            title: 'Successfully Added',
            text: res.game.name + ' added your Swap List successfully',
          })
        })
        .catch((err) => {
          this.$vs.notification({
            flat: true,
            color: 'danger',
            icon: `<i class='bx bx-error' ></i>`,
            position: 'top-center',
            title: 'An Error Occured',
            text: err,
          })
        })
    },
    addWishList(payload) {
      this.addToWishList(payload)
        .then((res) => {
          this.$vs.notification({
            flat: true,
            color: 'success',
            icon: `<i class='bx bx-check' ></i>`,
            position: 'top-center',
            title: 'Successfully Added',
            text: res.game.name + ' added your Wish List successfully',
          })
        })
        .catch((err) => {
          this.$vs.notification({
            flat: true,
            color: 'danger',
            icon: `<i class='bx bx-error' ></i>`,
            position: 'top-center',
            title: 'An Error Occured',
            text: err,
          })
        })
    },
  },
}
</script>

<style lang="scss"></style>
