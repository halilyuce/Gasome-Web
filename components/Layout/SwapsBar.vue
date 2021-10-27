<template>
  <div
    class="
      flex flex-row
      lg:flex-col
      bg-white
      h-24
      dark:bg-black
      w-full
      2xl:w-1/2 2xl:ml-auto
      lg:h-screen lg:border-l lg:border-r
      border-gray-200 border-b
      lg:border-b-0
      dark:border-gray-700
    "
  >
    <div class="mx-5 mt-5 mb-2 flex flex-row items-center hidden lg:flex">
      <h1 class="mb-1 mr-1">{{ $t('swaps.title') }}</h1>
    </div>

    <ul
      class="
        w-full
        grid grid-cols-2
        border-b border-gray-200
        dark:border-gray-700
        text-sm
      "
    >
      <li
        v-for="tab in tabs"
        :key="tab.value"
        class="
          py-3
          flex
          transition
          duration-300
          ease-in-out
          justify-center
          cursor-pointer
          hover-bg
        "
        :class="{ 'border-b-4 border-purple-500': activeTab === tab.value }"
        @click="setTab(tab.value)"
      >
        <b>{{ tab.title }}</b>
      </li>
    </ul>

    <div
      ref="swaps"
      class="
        relative
        flex flex-row
        lg:flex-col lg:divide-y lg:divide-gray-200
        dark:divide-gray-700
        pl-3
        lg:pl-0
        overflow-auto
        disable-scrollbars
      "
      :class="{ 'w-screen lg:h-screen': loading }"
    >
      <div
        v-for="swap in swaps"
        :key="swap.id"
        class="
          flex flex-col
          p-2
          rounded-lg
          lg:rounded-none lg:pl-5 lg:pr-3 lg:py-4
        "
        :class="
          swap.process === 2
            ? 'bg-red-50 dark:bg-red-600 dark:bg-opacity-5'
            : swap.process === 3
            ? 'bg-green-50 dark:bg-green-600 dark:bg-opacity-5'
            : ''
        "
        :disabled="swap.process !== 1"
      >
        <div class="flex justify-between mb-2">
          <div class="flex flex-row">
            <vs-avatar size="42">
              <img
                :src="`${smallAvatar + swap.user.avatar}.jpg`"
                alt="Avatar"
              />
            </vs-avatar>
            <div class="flex flex-col ml-3">
              <h4 class="truncate lg:w-36">
                {{ swap.user.name }}
              </h4>
              <span class="text-gray-400 text-xs">
                {{ '@' + swap.user.username }}
              </span>
            </div>
          </div>
          <span
            class="
              hidden
              lg:flex
              text-xs text-right text-gray-500
              dark:text-gray-400
            "
            >{{ $moment(swap.created_at).fromNow(true) }}</span
          >
        </div>
        <div class="flex justify-between mt-2">
          <div
            class="flex flex-col w-24 items-center justify-center rounded-xl"
            :style="'background-color:' + swap.left_game.platform.color"
          >
            <h6 class="text-white text-xs my-1">
              {{ swap.left_game.platform.name }}
            </h6>
            <img
              :src="`${smallGameCover + swap.left_game.game.image}.jpg`"
              :alt="swap.left_game.game.name"
              class="rounded-b-xl w-24 h-28"
            />
          </div>

          <div
            v-if="swap.process === 1 && activeTab === 'incoming'"
            class="flex flex-col justify-between"
          >
            <vs-button success icon flat>
              <i class="bx bx-check"></i>
              <span class="mx-1">{{ $t('swaps.accept') }}</span>
            </vs-button>
            <vs-button :to="`/messages?room=${swap.user.id}`" icon flat>
              <i class="bx bx-envelope"></i> <span class="mx-1">DM</span>
            </vs-button>
            <vs-button danger icon flat>
              <i class="bx bx-x"></i>
              <span class="mx-1">{{ $t('swaps.reject') }}</span>
            </vs-button>
          </div>

          <div
            v-if="swap.process === 1 && activeTab === 'outgoing'"
            class="flex flex-col justify-center text-xs items-center"
          >
            <i class="bx bx-time text-2xl mb-1"></i>
            {{ $t('swaps.waiting') }}
          </div>

          <div
            v-if="swap.process === 2"
            class="flex flex-col justify-center text-xs items-center"
          >
            <i class="bx bx-x text-2xl"></i>
            {{ $t('swaps.declined') }}
          </div>

          <div
            v-if="swap.process === 3"
            class="flex flex-col justify-center text-xs items-center"
          >
            <i class="bx bx-check text-2xl"></i>
            {{ $t('swaps.accepted') }}
          </div>

          <div
            class="flex flex-col w-24 justify-center items-center rounded-xl"
            :style="'background-color:' + swap.right_game.platform.color"
          >
            <h6 class="text-white text-xs my-1">
              {{ swap.right_game.platform.name }}
            </h6>
            <img
              :src="`${smallGameCover + swap.right_game.game.image}.jpg`"
              :alt="swap.right_game.game.name"
              class="rounded-b-xl w-24 h-28"
            />
          </div>
        </div>
      </div>

      <client-only>
        <infinite-loading
          v-if="swaps && !enough"
          :identifier="activeTab"
          spinner="spiral"
          :distance="300"
          @infinite="infiniteHandler"
          ><span slot="no-results"></span><span slot="no-more"></span
        ></infinite-loading>
      </client-only>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters(['loggedInUser']),
    ...mapState({
      loading: (state) => state.swaps.dealsLoading,
      swapsPage: (state) => state.swaps.dealsPage,
      swapDeals: (state) => state.swaps.swapDeals,
      dealsEnough: (state) => state.swaps.dealsEnough,
      activeTabState: (state) => state.swaps.activeTab,
    }),
    activeTab: {
      get() {
        return this.activeTabState
      },
      set(value) {
        this.setActiveTab(value)
      },
    },
    swaps: {
      get() {
        return this.swapDeals
      },
      set(value) {
        this.setSwapDeals(value)
      },
    },
    page: {
      get() {
        return this.swapsPage
      },
      set(value) {
        this.setDealsPage(value)
      },
    },
    enough: {
      get() {
        return this.dealsEnough
      },
      set(value) {
        this.setDealsEnough(value)
      },
    },
  },
  data() {
    return {
      search: '',
      smallAvatar: process.env.AVATAR_SMALL,
      smallGameCover: process.env.GAMECOVER_SMALL,
      tabs: [
        {
          title: this.$t('swaps.incoming'),
          value: 'incoming',
        },
        {
          title: this.$t('swaps.outgoing'),
          value: 'outgoing',
        },
      ],
    }
  },
  methods: {
    ...mapActions({
      getSwapDeals: 'swaps/getSwapDeals',
      setSwapDeals: 'swaps/setSwapDeals',
      setDealsPage: 'swaps/setDealsPage',
      setDealsEnough: 'swaps/setDealsEnough',
      setActiveTab: 'swaps/setActiveTab',
    }),
    setTab(val) {
      if (val !== this.activeTab) {
        this.enough = false
        this.swaps = []
        this.page = 1
        this.activeTab = val
      }
    },
    infiniteHandler($state) {
      const self = this
      if (!this.enough) {
        const type = this.activeTab === 'incoming' ? 1 : 0
        this.getSwapDeals(type).then(function (res) {
          if (res.data.length < 10) {
            self.setDealsEnough(true)
            $state.complete()
          } else {
            self.page += 1
            $state.loaded()
          }
        })
      }
    },
  },
}
</script>

<style></style>
