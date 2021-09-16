<template>
  <div
    ref="target"
    v-infinite-scroll="loadMore"
    infinite-scroll-distance="1000"
    infinite-scroll-throttle-delay="1000"
    class="bg-white dark:bg-black max-h-screen overflow-y-auto disable-scrollbars"
  >
    <div class="lg:my-3">
      <div
        class="hidden lg:flex justify-between items-center px-5 pb-3 border-b border-gray-100 dark:border-gray-600 dark:border-opacity-20"
      >
        <vs-input
          color="#7d33ff"
          type="search"
          v-model="search"
          icon-after
          placeholder="Search A Game or User"
          class="w-52 lg:w-64 xl:w-72"
          disabled
        >
          <template #icon>
            <i class="bx bx-search"></i>
          </template>
        </vs-input>
        <vs-button @click="openComposer()">
          <i class="bx bx-edit text-lg"></i>

          <span class="px-2">New Post</span>
        </vs-button>
      </div>

      <PostsBody
        class="relative"
        :class="{ 'h-screen': loading }"
        ref="posts"
        v-bind:posts="posts"
        @favorite-post="favorite"
        @boost-post="boost"
        @quote-post="quote"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import PostsBody from '../components/Posts/PostsBody.vue'
import infiniteScroll from 'vue-infinite-scroll'
export default {
  layout: 'sidebars',
  components: {
    PostsBody,
  },
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
  watch: {
    loading(newVal, oldVal) {
      if (newVal !== oldVal) {
        if (!newVal) {
          this.postLoading.close()
        } else {
          this.postLoading = this.$vs.loading({
            target: this.$refs.posts,
          })
        }
      }
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
    async loadMore() {
      const self = this
      if (this.page === 0) {
        await this.toggleLoading(true)
      }
      if (!this.enough) {
        this.page += 1
        this.loadMorePosts().then(function (res) {
          if (res.data.length < 10) {
            self.enough = true
          }
        })
      }
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
  directives: {
    infiniteScroll,
  },
}
</script>
