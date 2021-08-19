<template>
  <div
    ref="target"
    v-infinite-scroll="loadMore"
    infinite-scroll-distance="5"
    infinite-scroll-throttle-delay="1000"
    class="bg-white dark:bg-black max-h-screen overflow-y-auto"
  >
    <div class="my-5">
      <div class="flex justify-between items-center px-5">
        <vs-input
          color="#7d33ff"
          type="search"
          v-model="search"
          icon-after
          placeholder="Search A Game or User"
          class="mb-3 w-72"
        >
          <template #icon>
            <i class="bx bx-search"></i>
          </template>
        </vs-input>
        <vs-button :active="true" @click="toggleComposer(true)">
          <i class="bx bx-edit text-xl"></i>

          <template #animate>
            <span class="px-6">Post</span>
          </template>
        </vs-button>
      </div>
      <PostsBody
        class="relative"
        :class="{ 'h-screen': loading }"
        ref="posts"
        v-bind:posts="posts"
        @favorite-post="favorite"
      />
      <post-composer />
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
    }
  },
  mounted() {
    this.getPosts()
  },
  methods: {
    ...mapActions({
      getPosts: 'posts/getPosts',
      loadMorePosts: 'posts/loadMorePosts',
      toggleComposer: 'posts/toggleComposer',
      clearAlert: 'alert/clear',
      favoritePost: 'posts/favoritePost',
    }),
    async loadMore() {
      this.currentPage += 1
      this.loadMorePosts(this.currentPage)
    },
    async favorite(id) {
      this.favoritePost(id)
    },
  },
  directives: {
    infiniteScroll,
  },
}
</script>
