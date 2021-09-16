<template>
  <div
    ref="target"
    v-infinite-scroll="loadMore"
    infinite-scroll-distance="1000"
    infinite-scroll-throttle-delay="1000"
    @scroll="handleScroll"
    class="bg-white dark:bg-black max-h-screen overflow-y-auto disable-scrollbars"
  >
    <div class="my-3">
      <div
        class="hidden lg:flex justify-between items-center px-5 pb-3 border-b border-gray-100 dark:border-gray-600 dark:border-opacity-20"
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
      <transition name="fade">
        <div
          v-show="showHeader"
          class="sticky top-0 z-20 flex bg-white dark:bg-black lg:hidden justify-between items-center px-5 pb-3 border-b border-gray-100 dark:border-gray-600 dark:border-opacity-20"
        >
          <n-link :to="`/u/${loggedInUser.username}`">
            <vs-avatar size="40">
              <img
                v-if="loggedInUser"
                :src="`${smallAvatar + loggedInUser.avatar}.jpg`"
                alt="Avatar"
              />
            </vs-avatar>
          </n-link>
          <img class="h-8" :src="require('~/assets/img/gasome.svg')" alt="gasome">
          <vs-button @click="openComposer()">
            <i class="bx bx-edit text-2xl"></i>
          </vs-button>
        </div>
      </transition>
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
import {mapState, mapActions, mapGetters} from 'vuex'
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
    ...mapGetters(['loggedInUser']),
    ...mapState({
      alert: (state) => state.alert,
      posts: (state) => state.posts.posts,
      loading: (state) => state.posts.loading,
      pageState: (state) => state.posts.page,
    }),
    page: {
      get() {
        return this.pageState
      },
      set(value) {
        this.setCurrentPage(value)
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
      quotedPost: null,
      smallAvatar: process.env.AVATAR_SMALL,
      scrollValue: 0,
      showHeader: true,
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
    }),
    handleScroll (event) {
      if (event.target.scrollTop === 0) {
        this.showHeader = true
      } else {
        this.showHeader = (this.scrollValue - event.target.scrollTop) > 50;
      }
      this.scrollValue = event.target.scrollTop
    },
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
<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
