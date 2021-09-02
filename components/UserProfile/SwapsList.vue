<template>
  <ul
    ref="swaps"
    v-infinite-scroll="loadMore"
    infinite-scroll-distance="1000"
    infinite-scroll-throttle-delay="1000"
    :class="{ 'h-72': swaps.length === 0 }"
    class="relative divide-y divide-gray-100 dark:divide-gray-600 dark:divide-opacity-20 divide-solid"
  >
    <li v-for="swap in swaps" :key="swap.id">
      <div class="flex flex-row items-center px-5 py-3">
        <vs-avatar size="56">
          <img
            class="cursor-pointer"
            :src="`${smallCover + swap.game.image}.jpg`"
            alt="Game Cover"
          />
        </vs-avatar>
        <h5 class="ml-3">
          {{ swap.game.name }}
        </h5>
      </div>
    </li>
  </ul>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import infiniteScroll from 'vue-infinite-scroll'
export default {
  props: {
    id: null,
  },
  computed: {
    ...mapState({
      swaps: (state) => state.profile.swaps,
      loading: (state) => state.profile.swapsLoading,
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
    }
  },
  watch: {
    loading(newVal, oldVal) {
      if (newVal != oldVal) {
        if (!newVal) {
          this.userLoading.close()
        } else {
          this.userLoading = this.$vs.loading({
            target: this.$refs.swaps,
          })
        }
      }
    },
  },
  methods: {
    ...mapActions({
      getSwaps: 'profile/getSwaps',
      toggleSwapsLoading: 'profile/toggleSwapsLoading',
      setSwapsPage: 'profile/setSwapsPage',
      toggleSwapsEnough: 'profile/toggleSwapsEnough',
    }),
    async loadMore() {
      const self = this
      if (this.page === 0) {
        this.toggleSwapsLoading(true)
      }
      if (!this.enough) {
        this.page += 1
        this.getSwaps(this.id).then(function (res) {
          if (res.data.length < 10) {
            self.toggleSwapsEnough(true)
          }
        })
      }
    },
  },
  directives: {
    infiniteScroll,
  },
}
</script>

<style></style>
