<template>
  <div>
    <ul
      class="flex flex-nowrap py-5 overflow-auto space-x-5"
      v-if="comments && comments.data.length > 0"
    >
      <li
        class="inline-block"
        v-for="comment in comments.data"
        :key="comment.id"
      >
        <div
          class="
            w-96
            h-48
            p-4
            space-y-2
            max-w-xs
            overflow-hidden
            rounded-lg
            bg-gray-100
            dark:bg-content-bg
          "
        >
          <n-link
            :to="`/u/${comment.user.username}`"
            class="flex justify-between"
          >
            <div class="flex items-center">
              <vs-avatar size="28">
                <img
                  :src="`${smallAvatar + comment.user.avatar}.jpg`"
                  :alt="comment.user.username"
                />
              </vs-avatar>
              <div class="ml-1 flex flex-col leading-4">
                <h5>{{ comment.user.name }}</h5>
                <span class="text-xs dark:text-gray-400 text-gray-600">{{
                  '@' + comment.user.username
                }}</span>
              </div>
            </div>
            <div class="flex flex-col items-end">
              <StarRate
                :disabled="true"
                :hide="true"
                size="sm"
                :point="comment.star.toString()"
              />
              <span class="text-xs dark:text-gray-400 text-gray-600">{{
                $moment(comment.created_at).format('ll')
              }}</span>
            </div>
          </n-link>

          <p class="text-gray-700 dark:text-gray-300">
            {{ comment.comment }}
          </p>
        </div>
      </li>
    </ul>
    <client-only>
      <InfiniteScrollingHorizontal
        v-if="!enough"
        direction="right"
        spinner="spiral"
        :distance="300"
        @infinite="infiniteHandler"
        ><span slot="no-results"></span><span slot="no-more"></span
      ></InfiniteScrollingHorizontal>
    </client-only>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import StarRate from '~/components/Rating/StarRate'
import InfiniteScrollingHorizontal from '../../helpers/horizontalScroll'
export default {
  name: 'GameComments',
  components: { StarRate, InfiniteScrollingHorizontal },
  props: {
    game: {
      type: Object,
    },
  },
  computed: {
    ...mapState({
      comments: (state) => state.game.comments,
      loading: (state) => state.game.commentsLoading,
      enoughState: (state) => state.game.commentsEnough,
      pageState: (state) => state.game.commentsPage,
    }),
    page: {
      get() {
        return this.pageState
      },
      set(value) {
        this.setCurrentPage(value)
      },
    },
    enough: {
      get() {
        return this.enoughState
      },
      set(value) {
        this.setEnough(value)
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
      getGameComments: 'game/getGameComments',
      toggleCommentLoading: 'game/toggleCommentsLoading',
      setEnough: 'game/toggleCommentsEnough',
      setCurrentPage: 'game/setCommentsPage',
    }),
    infiniteHandler($state) {
      const self = this
      if (!this.enough) {
        this.toggleCommentLoading(true)
        this.getGameComments(this.game.id).then((res) => {
          if (res.data.length < 10) {
            $state.complete()
            self.enough = true
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
<style scoped>
.vs-card__group .vs-card__group-cards .vs-card-content {
  min-width: 240px;
}
</style>
