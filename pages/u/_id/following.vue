<template>
  <div
    class="
      relative
      bg-white
      dark:bg-black
      container
      overflow-y-auto
      disable-scrollbars
      h-screen
    "
  >
    <!-- Following Header Bar -->
    <FollowingHeader v-if="user" v-bind:user="user" />

    <!-- Tabs -->

    <ul
      v-if="user"
      class="
        grid grid-cols-2
        border-b border-gray-200
        dark:border-gray-700
        text-sm
      "
    >
      <li
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
        :class="{ 'border-b-4 border-purple-500': 'following' === tab.value }"
        v-for="tab in tabs"
        :key="tab.value"
        @click="'followers' == tab.value ? $router.push(`/u/${user.username}/followers`) : ''"
      >
        <b>{{ tab.title }}</b>
      </li>
    </ul>

    <!-- Users -->

    <div>
      <UserListItem
        @load="loadMore"
        v-if="following"
        v-bind:followers="following"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import FollowingHeader from '~/components/UserProfile/FollowingHeader.vue'
import UserListItem from '~/components/UserProfile/UserListItem.vue'
export default {
  components: { FollowingHeader, UserListItem },
  layout: 'sidebars',
  computed: {
    ...mapState({
      user: (state) => state.profile.user,
      following: (state) => state.profile.following,
    }),
  },
  data() {
    return {
      enough: false,
      currentPage: 0,
      tabs: [
        {
          title: 'Following',
          value: 'following',
        },
        {
          title: 'Followers',
          value: 'followers',
        },
      ],
    }
  },
  asyncData({ params }) {
    return {
      slug: params.id,
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
      clearState: 'profile/clearState',
      getUserProfile: 'profile/getUserProfile',
      getUserFollowing: 'profile/getUserFollowing',
    }),
    async loadMore($state) {
      const self = this
      if (!this.enough) {
        this.currentPage += 1
        this.getUserFollowing({
          page: this.currentPage,
          userName: this.slug,
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
  },
}
</script>
