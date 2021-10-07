<template>
  <div
    class="
      bg-white
      dark:bg-black
      container
      overflow-y-auto
      disable-scrollbars
      h-screen
    "
  >
    <!-- Profile Header -->
    <UserHeader :user="user" />

    <!-- Profile Tabs -->
    <ul
      v-if="user"
      class="
        grid grid-cols-4
        border-b border-gray-200
        dark:border-gray-700
        text-sm
      "
    >
      <li
        v-for="tab in tabs"
        :key="tab.value"
        class="
          py-3
          flex
          transition
          duration-300
          ease-in-out
          justify-center
          cursor-pointer
          hover-bg
        "
        :class="{ 'border-b-4 border-purple-500': activeTab === tab.value }"
        @click="activeTab = tab.value"
      >
        <b>{{ tab.title }}</b>
      </li>
    </ul>

    <!-- Profile Tabs Content -->

    <div v-if="activeTab === 'posts'">
      <PostsBody
        :posts="posts"
        @favorite-post="favorite"
        @boost-post="boost"
        @quote-post="quote"
      />

      <client-only>
        <infinite-loading
          v-if="!enough"
          spinner="spiral"
          :distance="300"
          @infinite="infiniteHandler"
          ><span slot="no-results"></span><span slot="no-more"></span
        ></infinite-loading>
      </client-only>

      <NoData v-if="!postsLoading && posts.length === 0" class="m-6" />
    </div>

    <div v-if="activeTab === 'medias'">
      <PostsBody
        :posts="posts.filter((post) => post.image.length > 0 || post.video)"
        @favorite-post="favorite"
        @boost-post="boost"
        @quote-post="quote"
      />

      <client-only>
        <infinite-loading
          v-if="!enough"
          spinner="spiral"
          :distance="300"
          @infinite="infiniteHandler"
          ><span slot="no-results"></span><span slot="no-more"></span
        ></infinite-loading>
      </client-only>

      <NoData
        v-if="
          !postsLoading &&
          posts.filter((post) => post.image.length > 0 || post.video).length ===
            0
        "
        class="m-6"
      />
    </div>

    <div v-if="activeTab === 'swaps'">
      <SwapsList :id="user.id" :same="user.id != loggedInUser.id" />
    </div>

    <div v-if="activeTab === 'wishes'">
      <WishList :id="user.id" :same="user.id != loggedInUser.id" />
    </div>

    <PostComposer :quote="quotedPost" />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import UserHeader from '~/components/UserProfile/UserProfileHeader.vue'
import PostsBody from '~/components/Posts/PostsBody.vue'
import PostComposer from '~/components/Posts/PostComposer.vue'
import SwapsList from '~/components/UserProfile/SwapsList.vue'
import WishList from '~/components/UserProfile/WishList.vue'
import NoData from '~/components/UI/NoData.vue'
export default {
  components: {
    UserHeader,
    PostsBody,
    PostComposer,
    SwapsList,
    WishList,
    NoData,
  },
  layout: 'sidebars',
  computed: {
    ...mapGetters(['loggedInUser']),
    ...mapState({
      user: (state) => state.profile.user,
      posts: (state) => state.profile.posts,
      postsLoading: (state) => state.profile.postLoading,
    }),
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
          title: 'Swaps',
          value: 'swaps',
        },
        {
          title: 'Wishes',
          value: 'wishes',
        },
      ],
    }
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
    infiniteHandler($state) {
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
            $state.complete()
          } else {
            $state.loaded()
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
}
</script>
