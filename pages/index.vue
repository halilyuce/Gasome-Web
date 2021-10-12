<template>
  <div
    class="
      bg-white
      dark:bg-black
      h-screen
      overflow-y-auto overflow-x-hidden
      disable-scrollbars
    "
  >
    <div class="lg:my-3">
      <div
        class="
          hidden
          lg:flex
          justify-between
          items-center
          px-5
          pb-3
          border-b border-gray-100
          dark:border-gray-600 dark:border-opacity-20
        "
      >
        <vs-input
          v-model="search"
          color="#7d33ff"
          type="search"
          icon-after
          :placeholder="$t('mainPage.search')"
          class="w-52 lg:w-56 xl:w-72"
          disabled
        >
          <template #icon>
            <i class="bx bx-search"></i>
          </template>
        </vs-input>
        <vs-button @click="openComposer()">
          <i class="bx bx-edit text-lg"></i>

          <span class="px-2">{{ $t('mainPage.newPost') }}</span>
        </vs-button>
      </div>

      <div>
        <PostsBody
          :posts="posts"
          @favorite-post="favorite"
          @boost-post="boost"
          @quote-post="quote"
        />
      </div>

      <client-only>
        <infinite-loading
          ref="infinite"
          spinner="spiral"
          :distance="300"
          :identifier="infiniteID"
          @infinite="infiniteHandler"
          ><span slot="no-results"></span><span slot="no-more"></span
        ></infinite-loading>
      </client-only>

      <div
        class="flex flex-col bg-gray-50 dark:bg-content-bg rounded-xl m-5 px-5"
        v-if="showSuggestions"
      >
        <vs-alert class="text-xs my-5">
          <template #icon>
            <i class="bx bxs-smile"></i>
          </template>
          {{ $t('mainPage.followSuggestions') }}
        </vs-alert>
        <UserSuggestions :fullWidth="true" @reloadPosts="reloadPage" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import PostsBody from '../components/Posts/PostsBody.vue'
import UserSuggestions from '../components/Layout/UserSuggestions.vue'
export default {
  components: {
    PostsBody,
    UserSuggestions,
  },
  layout: 'sidebars',
  computed: {
    ...mapState({
      alert: (state) => state.alert,
      posts: (state) => state.posts.posts,
      loading: (state) => state.posts.loading,
      pageState: (state) => state.posts.page,
      quotedPostState: (state) => state.posts.quotedPost,
    }),
    page: {
      get() {
        return this.pageState
      },
      set(value) {
        this.setCurrentPage(value)
      },
    },
    quotedPost: {
      get() {
        return this.quotedPostState
      },
      set(value) {
        this.setQuotedPost(value)
      },
    },
  },
  data() {
    return {
      infiniteID: 1,
      enough: false,
      search: '',
      smallAvatar: process.env.AVATAR_SMALL,
      showSuggestions: false,
    }
  },
  methods: {
    ...mapActions({
      loadMorePosts: 'posts/loadMorePosts',
      toggleComposer: 'posts/toggleComposer',
      clearAlert: 'alert/clear',
      favoritePost: 'posts/favoritePost',
      boostPost: 'posts/boostPost',
      toggleLoading: 'posts/toggleLoading',
      setCurrentPage: 'posts/setCurrentPage',
      setQuotedPost: 'posts/setQuotedPost',
      resetPosts: 'posts/resetPosts',
    }),

    openComposer() {
      this.quotedPost = null
      this.toggleComposer(true)
    },

    async reloadPage() {
      this.page = 1
      this.resetPosts()
      this.infiniteID = +new Date()
    },

    infiniteHandler($state) {
      const self = this
      this.loadMorePosts().then(function (res) {
        if (res.data.length < 10) {
          if (self.page === 1) {
            self.showSuggestions = true
          }
          $state.complete()
        } else {
          if (self.showSuggestions) {
            self.showSuggestions = false
          }
          self.page += 1
          $state.loaded()
        }
      })
    },
    async favorite(id) {
      await this.favoritePost(id)
    },
    async boost(post) {
      await this.boostPost(post)
    },
    async quote(post) {
      this.quotedPost = post
      await this.toggleComposer(true)
    },
  },
}
</script>
