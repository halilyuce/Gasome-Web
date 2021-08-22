<template>
  <div
    ref="user"
    class="relative bg-white dark:bg-black container overflow-y-auto"
    :class="posts.length > 0 ? 'max-h-screen' : 'min-h-screen'"
  >
    <div v-if="user">
      <!-- Profile Header -->
      <UserHeader :user="user.data" />

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

      <div v-if="activeTab === 'posts'">
        <PostsBody
          v-bind:posts="posts"
          @favorite-post="favorite"
          @boost-post="boost"
          @quote-post="quote"
        />
      </div>
      <div class="p-5" v-if="activeTab === 'swaps'">Swap List Tab</div>
      <div class="p-5" v-if="activeTab === 'wishes'">Wishes List Tab</div>
      <div class="p-5" v-if="activeTab === 'medias'">Medias Tab</div>
    </div>

    <post-composer :quote="quotedPost" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import UserHeader from '~/components/UserProfile/UserProfileHeader.vue'
import PostsBody from '~/components/Posts/PostsBody.vue'
import PostComposer from '~/components/Posts/PostComposer.vue'
export default {
  components: { UserHeader, PostsBody, PostComposer },
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
      activeTab: 'posts',
      tabs: [
        {
          title: 'Posts',
          value: 'posts',
        },
        {
          title: 'Swaps List',
          value: 'swaps',
        },
        {
          title: 'Wishes List',
          value: 'wishes',
        },
        {
          title: 'Medias',
          value: 'medias',
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
  methods: {
    ...mapActions({
      getUserProfile: 'profile/getUserProfile',
      favoritePost: 'profile/favoritePost',
      boostPost: 'profile/boostPost',
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
  },
}
</script>
