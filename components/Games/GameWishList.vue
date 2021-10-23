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
      <li v-for="wish in wishes" :key="wish.id">
        <div
          class="
            flex flex-row
            justify-between
            border-l-4
            items-center
            px-5
            py-3
          "
          :style="'border-color:' + wish.platform.color"
        >
          <n-link
            class="flex flex-row items-center"
            :to="'/u/' + wish.user.username"
          >
            <img
              class="cursor-pointer h-12 w-12 rounded-xl object-cover"
              :src="`${smallAvatar + wish.user.avatar}.jpg`"
              alt="Game Cover"
            />
            <div class="flex flex-col ml-3">
              <h4>
                {{ wish.user.name }}
              </h4>
              <span class="text-xs text-gray-700 dark:text-gray-400">
                {{ '@' + wish.user.username }}
              </span>
            </div>
          </n-link>
          <div class="flex flex-row text-xs text-gray-700 dark:text-gray-400">
            {{ wish.platform.name }}
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
    <NoData v-if="!loading && wishes.length === 0" class="m-6" />
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
      wishes: (state) => state.game.wishes,
      loading: (state) => state.game.wishesLoading,
      pageState: (state) => state.game.wishesPage,
      enough: (state) => state.game.wishesEnough,
    }),
    page: {
      get() {
        return this.pageState
      },
      set(value) {
        this.setWishesPage(value)
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
      getWishes: 'game/getWishes',
      toggleWishesLoading: 'game/toggleWishesLoading',
      setWishesPage: 'game/setWishesPage',
      toggleWishesEnough: 'game/toggleWishesEnough',
    }),
    infiniteHandler($state) {
      const self = this
      if (this.page === 0) {
        this.toggleWishesLoading(true)
      }
      if (!this.enough) {
        this.page += 1
        this.getWishes(this.id).then(function (res) {
          if (res.data.length < 10) {
            $state.complete()
            self.toggleWishesEnough(true)
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
