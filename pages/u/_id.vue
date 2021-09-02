<template>
  <div
    ref="user"
    class="relative bg-white dark:bg-black container overflow-y-auto disable-scrollbars"
    :class="posts.length > 0 ? 'max-h-screen' : 'min-h-screen'"
  >
    <!-- Profile Header -->
    <UserHeader v-if="user" :user="user.data" />

    <!-- Profile Tabs -->
    <ul
      class="grid grid-cols-4 border-b border-gray-200 dark:border-gray-700 text-sm"
    >
      <li
        class="py-3 flex transition duration-300 ease-in-out justify-center cursor-pointer hover-bg"
        :class="{ 'border-b-4 border-purple-500': activeTab === tab.value }"
        v-for="tab in tabs"
        :key="tab.value"
        @click="activeTab = tab.value"
      >
        <b>{{ tab.title }}</b>
      </li>
    </ul>

    <!-- Profile Tabs Content -->

    <div
      v-if="activeTab === 'posts'"
      v-infinite-scroll="loadMore"
      infinite-scroll-distance="1000"
      infinite-scroll-throttle-delay="1000"
    >
      <PostsBody
        v-bind:posts="posts"
        @favorite-post="favorite"
        @boost-post="boost"
        @quote-post="quote"
      />
    </div>

    <div
      v-if="activeTab === 'medias'"
      v-infinite-scroll="loadMore"
      infinite-scroll-distance="1000"
      infinite-scroll-throttle-delay="1000"
    >
      <PostsBody
        v-bind:posts="
          posts.filter((post) => post.image.length > 0 || post.video)
        "
        @favorite-post="favorite"
        @boost-post="boost"
        @quote-post="quote"
      />
    </div>

    <div v-if="activeTab === 'swaps'">
      <swaps-list :id="user.data.id" />
    </div>

    <div class="p-5" v-if="activeTab === 'wishes'">Wishes List Tab</div>

    <post-composer :quote="quotedPost" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import UserHeader from '~/components/UserProfile/UserProfileHeader.vue'
import PostsBody from '~/components/Posts/PostsBody.vue'
import PostComposer from '~/components/Posts/PostComposer.vue'
import infiniteScroll from 'vue-infinite-scroll'
import SwapsList from '~/components/UserProfile/SwapsList.vue'
export default {
  components: { UserHeader, PostsBody, PostComposer, SwapsList },
  layout: 'sidebars',
  computed: {
    ...mapState({
      user: (state) => state.profile.user,
      posts: (state) => state.profile.posts,
      loading: (state) => state.profile.loading,
    }),
  },
  data() {
    return {
      quotedPost: null,
      currentPage: 0,
      enough: false,
      activeTab: 'posts',
      tabs: [
        {
          title: 'Posts',
          value: 'posts',
        },
        {
          title: 'Medias',
          value: 'medias',
        },
        {
          title: 'Swaps List',
          value: 'swaps',
        },
        {
          title: 'Wishes List',
          value: 'wishes',
        },
      ],
    }
  },
  asyncData({ params }) {
    return {
      slug: params.id,
    }
  },
  watch: {
    loading(newVal, oldVal) {
      if (newVal != oldVal) {
        if (!newVal) {
          this.userLoading.close()
        } else {
          this.userLoading = this.$vs.loading({
            target: this.$refs.user,
          })
        }
      }
    },
  },
  mounted() {
    this.getUserProfile(this.slug)
  },
  beforeDestroy() {
    this.clearState()
  },
  methods: {
    ...mapActions({
      getPosts: 'profile/getPosts',
      clearState: 'profile/clearState',
      getUserProfile: 'profile/getUserProfile',
      favoritePost: 'profile/favoritePost',
      boostPost: 'profile/boostPost',
      toggleComposer: 'posts/toggleComposer',
      togglePostLoading: 'profile/togglePostLoading',
    }),
    async loadMore() {
      const self = this
      if (this.currentPage === 0) {
        this.togglePostLoading(true)
      }
      if (!this.enough) {
        this.currentPage += 1
        this.getPosts({
          page: this.currentPage,
          username: this.slug,
        }).then(function (res) {
          if (res.data.length < 10) {
            self.enough = true
          }
        })
      }
    },
    async openComposer() {
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
  },
  directives: {
    infiniteScroll,
  },
}
</script>
