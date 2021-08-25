<template>
  <div
    ref="target"
    v-infinite-scroll="loadMore"
    infinite-scroll-distance="5"
    infinite-scroll-throttle-delay="1000"
    class="bg-white dark:bg-black max-h-screen overflow-y-auto"
  >
    <div class="my-3">
      <div
        class="flex justify-between items-center px-5 pb-3 border-b border-gray-100 dark:border-gray-600 dark:border-opacity-20"
      >
        <vs-input
          color="#7d33ff"
          type="search"
          v-model="search"
          icon-after
          placeholder="Search A Game or User"
          class="w-72"
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
      <post-composer :quote="quotedPost" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import PostsBody from '../components/Posts/PostsBody.vue'
import infiniteScroll from 'vue-infinite-scroll'
import PostComposer from '../components/Posts/PostComposer.vue'
export default {
  layout: 'sidebars',
  components: {
    PostsBody,
    PostComposer,
  },
  computed: {
    ...mapState({
      alert: (state) => state.alert,
      posts: (state) => state.posts.posts,
      loading: (state) => state.posts.loading,
    }),
  },
  watch: {
    loading(newVal, oldVal) {
      if (newVal != oldVal) {
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
      currentPage: 1,
      search: '',
      quotedPost: null,
    }
  },
  mounted() {
    if (this.posts.length < 1) {
      this.getPosts()
    }
  },
  methods: {
    ...mapActions({
      getPosts: 'posts/getPosts',
      loadMorePosts: 'posts/loadMorePosts',
      toggleComposer: 'posts/toggleComposer',
      clearAlert: 'alert/clear',
      favoritePost: 'posts/favoritePost',
      boostPost: 'posts/boostPost',
    }),
    openComposer() {
      this.quotedPost = null
      this.toggleComposer(true)
    },
    async loadMore() {
      this.currentPage += 1
      this.loadMorePosts(this.currentPage)
    },
    async favorite(id) {
      this.favoritePost(id)
    },
    async boost(post) {
      this.boostPost(post)
    },
    async quote(post) {
      this.quotedPost = post
      this.toggleComposer(true)
    },
  },
  directives: {
    infiniteScroll,
  },
}
</script>
