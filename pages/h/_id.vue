<template>
  <div
    ref="hashtags"
    v-infinite-scroll="loadMorePosts"
    infinite-scroll-distance="1000"
    infinite-scroll-throttle-delay="1000"
    class="bg-white dark:bg-black max-h-screen overflow-y-auto disable-scrollbars"
  >
    <div class="lg:my-3">
      <div
        class="hidden lg:flex justify-between items-center px-5 pb-3 border-b border-gray-100 dark:border-gray-600 dark:border-opacity-20"
      >
        <div class="flex flex-row">
          <vs-button active @click="$router.back()" size="small" transparent>
            <i class="bx bxs-chevron-left text-xl"></i>
          </vs-button>

          <vs-input
            color="#7d33ff"
            type="search"
            v-model="search"
            icon-after
            placeholder="Search A Game or User"
            class="w-52 lg:w-64 xl:w-72 ml-3"
            disabled
          >
            <template #icon>
              <i class="bx bx-search"></i>
            </template>
          </vs-input>
        </div>

        <div
          class="flex flex-row items-center justify-center bg-gray-100 dark:bg-content-bg rounded-2xl"
        >
          <vs-button
            :transparent="!isTop"
            :shadow="isTop"
            :active="isTop"
            @click="changeFilter(true)"
            color="#666"
            size="small"
          >
            <i class="bx mr-2 text-base bxs-to-top"></i>
            Top
          </vs-button>
          <vs-button
            :transparent="isTop"
            :shadow="!isTop"
            :active="!isTop"
            @click="changeFilter(false)"
            color="#666"
            size="small"
          >
            <i class="bx mr-2 text-base bx-time"></i>
            Recent
          </vs-button>
        </div>
      </div>

      <PostsBody
        class="relative"
        :class="{ 'h-screen': loading }"
        ref="tags"
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
import PostsBody from '~/components/Posts/PostsBody.vue'
import infiniteScroll from 'vue-infinite-scroll'
export default {
  layout: 'sidebars',
  name: 'TagPosts',
  components: {
    PostsBody,
  },
  computed: {
    ...mapState({
      alert: (state) => state.alert,
      posts: (state) => state.search.posts,
      loading: (state) => state.search.tagLoading,
      pageState: (state) => state.search.tagPage,
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
          this.tagPostLoading.close()
        } else {
          this.tagPostLoading = this.$vs.loading({
            target: this.$refs.tags,
          })
        }
      }
    },
  },
  mounted() {
    this.search = '#' + this.$route.params.id
  },
  data() {
    return {
      isTop: true,
      enough: false,
      search: '',
      smallAvatar: process.env.AVATAR_SMALL,
    }
  },
  methods: {
    ...mapActions({
      getTagPosts: 'search/getTagPosts',
      toggleComposer: 'posts/toggleComposer',
      clearAlert: 'alert/clear',
      favoritePost: 'search/favoritePost',
      boostPost: 'search/boostPost',
      toggleLoading: 'search/toggleTagLoading',
      setCurrentPage: 'search/setTagCurrentPage',
      setQuotedPost: 'posts/setQuotedPost',
    }),

    async changeFilter(val) {
      this.isTop = val
      this.enough = false
      this.loadMorePosts()
    },

    async loadMorePosts() {
      const self = this
      if (this.page === 0) {
        await this.toggleLoading(true)
      }
      if (!this.enough) {
        this.page += 1
        this.getTagPosts({ tag: this.$route.params.id, top: this.isTop }).then(
          function (res) {
            if (res.data.length < 10) {
              self.enough = true
            }
          }
        )
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
