<template>
  <div
    class="
      relative
      bg-white
      dark:bg-black
      container
      overflow-y-auto
      disable-scrollbars
      lg:h-screen
    "
    :class="post ? 'max-h-screen' : 'min-h-screen'"
  >
    <!-- User Breadcrumb -->

    <div
      class="
        flex
        items-center
        py-3
        px-5
        border-b border-gray-200
        dark:border-gray-700
      "
    >
      <vs-button active size="small" transparent @click="$router.back()">
        <i class="bx bxs-chevron-left text-xl"></i>
      </vs-button>
      <div class="flex flex-col ml-9">
        <h3>{{ $t('p.post') }}</h3>
      </div>
    </div>

    <div ref="post" class="relative" :class="{ 'h-72': !post }">
      <SinglePost
        v-if="post"
        :post="post"
        @favorite-post="favorite"
        @boost-post="boost"
        @quote-post="quote"
        @null="makeNull"
      />
    </div>

    <CommentComposer :post="post" />

    <PostsBody
      :posts="comments"
      @favorite-post="favorite"
      @boost-post="boost"
      @quote-post="quote"
    />

    <infinite-loading
      v-if="!enough"
      spinner="spiral"
      :distance="300"
      @infinite="infiniteHandler"
      ><span slot="no-results"></span><span slot="no-more"></span
    ></infinite-loading>

    <PostComposer :quote="quotedPost" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import PostComposer from '~/components/Posts/PostComposer.vue'
import PostsBody from '~/components/Posts/PostsBody.vue'
import SinglePost from '~/components/Posts/SinglePost.vue'
import CommentComposer from '~/components/Posts/CommentComposer.vue'
export default {
  name: 'PostDetail',
  components: { PostComposer, PostsBody, SinglePost, CommentComposer },
  layout: 'sidebars',
  computed: {
    ...mapState({
      post: (state) => state.posts.post,
      comments: (state) => state.posts.comments,
      detailLoading: (state) => state.posts.detailLoading,
      commentsLoading: (state) => state.posts.commentsLoading,
    }),
  },
  watch: {
    detailLoading(newVal, oldVal) {
      if (newVal != oldVal) {
        if (!newVal) {
          this.postLoading.close()
        } else {
          this.postLoading = this.$vs.loading({
            target: this.$refs.post,
          })
        }
      }
    },
  },
  mounted() {
    this.getPostDetail(this.slug)
  },
  asyncData({ params }) {
    return {
      slug: params.id,
    }
  },
  data() {
    return {
      quotedPost: null,
      currentPage: 0,
      enough: false,
    }
  },
  methods: {
    ...mapActions({
      setPostNull: 'posts/setPostNull',
      favoritePost: 'posts/favoritePost',
      boostPost: 'posts/boostPost',
      getPostDetail: 'posts/getPostDetail',
      getCommentsById: 'posts/getCommentsById',
      toggleComposer: 'posts/toggleComposer',
      toggleCommentsLoading: 'posts/toggleCommentsLoading',
    }),
    infiniteHandler($state) {
      const self = this
      if (this.currentPage === 0) {
        this.toggleCommentsLoading(true)
      }
      if (!this.enough) {
        this.currentPage += 1
        this.getCommentsById({
          page: this.currentPage,
          id: this.slug,
        }).then(function (res) {
          if (res.data.length < 10) {
            self.enough = true
            $state.complete()
          } else {
            $state.loaded()
          }
        })
      }
    },
    openComposer() {
      this.quotedPost = null
      this.toggleComposer(true)
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
    async makeNull() {
      this.setPostNull()
    },
  },
}
</script>

<style></style>
