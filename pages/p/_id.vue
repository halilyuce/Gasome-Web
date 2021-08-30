<template>
  <div
    class="relative bg-white dark:bg-black container overflow-y-auto"
    :class="post ? 'max-h-screen' : 'min-h-screen'"
  >
    <!-- User Breadcrumb -->

    <div
      class="flex items-center py-3 px-5 border-b border-gray-200 dark:border-gray-700"
    >
      <vs-button active @click="$router.back()" size="small" transparent>
        <i class="bx bxs-chevron-left text-xl"></i>
      </vs-button>
      <div class="flex flex-col ml-9">
        <h3>Post</h3>
      </div>
    </div>

    <div ref="post" class="relative" :class="{ 'h-72': !post }">
      <single-post
        v-if="post"
        v-bind:post="post"
        @favorite-post="favorite"
        @boost-post="boost"
        @quote-post="quote"
        @null="makeNull"
      />
    </div>

    <comment-composer v-bind:post="post" />

    <PostsBody
      class="relative"
      :class="{ 'h-32': !!comments }"
      ref="comments"
      v-bind:posts="comments"
      @favorite-post="favorite"
      @boost-post="boost"
      @quote-post="quote"
    />

    <post-composer :quote="quotedPost" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import PostComposer from '~/components/Posts/PostComposer.vue'
import PostsBody from '~/components/Posts/PostsBody.vue'
import SinglePost from '~/components/Posts/SinglePost.vue'
import CommentComposer from '~/components/Posts/CommentComposer.vue'
export default {
  layout: 'sidebars',
  components: { PostComposer, PostsBody, SinglePost, CommentComposer },
  computed: {
    ...mapState({
      post: (state) => state.posts.post,
      comments: (state) => state.posts.comments,
      detailLoading: (state) => state.posts.detailLoading,
      commentsLoading: (state) => state.posts.commentsLoading,
    }),
  },
  mounted() {
    this.getPostDetail(this.slug)
  },
  data() {
    return {
      quotedPost: null,
    }
  },
  asyncData({ params }) {
    return {
      slug: params.id,
    }
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
    commentsLoading(newVal, oldVal) {
      if (newVal != oldVal) {
        if (!newVal) {
          this.commentLoading.close()
        } else {
          this.commentLoading = this.$vs.loading({
            target: this.$refs.comments,
          })
        }
      }
    },
  },
  methods: {
    ...mapActions({
      setPostNull: 'posts/setPostNull',
      favoritePost: 'posts/favoritePost',
      boostPost: 'posts/boostPost',
      getPostDetail: 'posts/getPostDetail',
      toggleComposer: 'posts/toggleComposer',
    }),
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
