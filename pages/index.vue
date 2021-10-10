<template>
  <div
    class="bg-white dark:bg-black h-screen overflow-y-auto disable-scrollbars"
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
          class="w-52 lg:w-64 xl:w-72"
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

      <div v-if="posts && posts.length > 0">
        <PostsBody
          :posts="posts"
          @favorite-post="favorite"
          @boost-post="boost"
          @quote-post="quote"
        />
      </div>

      <div v-else>
        <UserSuggestions @reloadPosts="reloadPage" />
      </div>

      <client-only>
        <infinite-loading
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
      enough: false,
      search: '',
      smallAvatar: process.env.AVATAR_SMALL,
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
    }),

    openComposer() {
      this.quotedPost = null
      this.toggleComposer(true)
    },

    reloadPage() {
      this.page = 0
      this.infiniteHandler()
    },

    infiniteHandler($state) {
      const self = this
      this.page += 1
      this.loadMorePosts().then(function (res) {
        if (res.data.length < 10) {
          $state.complete()
        } else {
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
