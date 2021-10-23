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
          <div class="flex flex-row text-xs text-gray-700 dark:text-gray-400">
            {{ swap.platform.name }}
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
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import NoData from '~/components/UI/NoData.vue'
export default {
  components: { NoData },
  props: {
    id: null,
  },
  computed: {
    ...mapState({
      swaps: (state) => state.game.swaps,
      loading: (state) => state.game.swapsLoading,
      pageState: (state) => state.game.swapsPage,
      enough: (state) => state.game.swapsEnough,
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
      smallAvatar: process.env.AVATAR_SMALL,
    }
  },
  methods: {
    ...mapActions({
      getSwaps: 'game/getSwaps',
      toggleSwapsLoading: 'game/toggleSwapsLoading',
      setSwapsPage: 'game/setSwapsPage',
      toggleSwapsEnough: 'game/toggleSwapsEnough',
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
  },
}
</script>

<style lang="scss"></style>
