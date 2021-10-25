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

    <div
      ref="swaps"
      class="
        relative
        flex flex-row
        lg:flex-col lg:divide-y lg:divide-gray-200
        dark:divide-gray-700
        pl-3
        lg:pl-0
        mt-4
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
      >
        <div class="flex justify-between">
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
            class="flex flex-col w-12 justify-center rounded-xl p-1"
            :style="'background-color:' + swap.left_game.platform.color"
          >
            <img
              :src="`${smallGameCover + swap.left_game.game.image}.jpg`"
              :alt="swap.left_game.game.name"
              class="rounded-lg w-10 h-12"
            />
          </div>

          <div
            class="flex flex-col w-12 justify-center rounded-xl p-1"
            :style="'background-color:' + swap.right_game.platform.color"
          >
            <img
              :src="`${smallGameCover + swap.right_game.game.image}.jpg`"
              :alt="swap.right_game.game.name"
              class="rounded-lg w-10 h-12"
            />
          </div>
        </div>
      </div>

      <client-only>
        <infinite-loading
          v-if="swaps && !enough"
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
      loading: (state) => state.swaps.loading,
      swapsPage: (state) => state.swaps.page,
      swaps: (state) => state.swaps.swaps,
      enough: (state) => state.swaps.enough,
    }),
    page: {
      get() {
        return this.swapsPage
      },
      set(value) {
        this.setSwapsPage(value)
      },
    },
  },
  data() {
    return {
      search: '',
      smallAvatar: process.env.AVATAR_SMALL,
      smallGameCover: process.env.GAMECOVER_SMALL,
    }
  },
  methods: {
    ...mapActions({
      getSwaps: 'swaps/getSwaps',
      setSwapsPage: 'swaps/setSwapsPage',
      setSwapsEnough: 'swaps/setSwapsEnough',
    }),
    infiniteHandler($state) {
      const self = this
      if (!this.enough) {
        this.getSwaps(this.page).then(function (res) {
          if (res.data.length < 10) {
            self.setSwapsEnough(true)
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
