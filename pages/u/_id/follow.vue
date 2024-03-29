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
    <!-- Followers Header Bar -->
    <FollowersHeader
      v-if="user"
      :followers="selected === 'followers'"
      v-bind:user="user"
    />

    <!-- Tabs -->

    <ul
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
        :class="{ 'border-b-4 border-purple-500': selected === tab.value }"
        v-for="tab in tabs"
        :key="tab.value"
        @click="changeTab(tab.value)"
      >
        <b>{{ tab.title }}</b>
      </li>
    </ul>

    <!-- Users -->

    <div>
      <UserListItem
        @load="loadData"
        :type="selected"
        v-bind:followers="selected === 'followers' ? followers : following"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import FollowersHeader from '~/components/UserProfile/FollowersHeader.vue'
import UserListItem from '~/components/UserProfile/UserListItem.vue'
export default {
  components: { FollowersHeader, UserListItem },
  layout: 'sidebars',
  head() {
    return {
      title:
        this.selected === 'followers'
          ? this.$t('pageHead.followersListTitle')
          : this.$t('pageHead.followsListTitle'),
    }
  },
  computed: {
    ...mapState({
      user: (state) => state.profile.user,
      followers: (state) => state.profile.followers,
      following: (state) => state.profile.following,
      followersEnoughState: (state) => state.profile.followersEnough,
      followingEnoughState: (state) => state.profile.followingEnough,
      followersCurrentPageState: (state) => state.profile.followersCurrentPage,
      followingCurrentPageState: (state) => state.profile.followingCurrentPage,
    }),
    followingEnough: {
      get() {
        return this.followingEnoughState
      },
      set(val) {
        this.toggleFollowingEnough(val)
      },
    },
    followersEnough: {
      get() {
        return this.followersEnoughState
      },
      set(val) {
        this.toggleFollowersEnough(val)
      },
    },
    followersCurrentPage: {
      get() {
        return this.followersCurrentPageState
      },
      set(val) {
        this.toggleFollowersPage(val)
      },
    },
    followingCurrentPage: {
      get() {
        return this.followingCurrentPageState
      },
      set(val) {
        this.toggleFollowingPage(val)
      },
    },
  },
  data() {
    return {
      tabs: [
        {
          title: this.$t('followerHeader.follow'),
          value: 'following',
        },
        {
          title: this.$t('followerHeader.follower'),
          value: 'followers',
        },
      ],
    }
  },
  asyncData({ route, params }) {
    return {
      slug: params.id,
      selected: route.query.tab,
    }
  },
  mounted() {
    if (!this.user) {
      this.getUserProfile(this.slug)
      this.followersCurrentPage = 0
      this.followingCurrentPage = 0
      this.followingEnough = false
      this.followersEnough = false
    }
  },
  beforeDestroy() {
    this.clearState()
  },
  watch: {
    '$route.query.tab'(val) {
      this.selected = val
    },
  },
  methods: {
    ...mapActions({
      clearState: 'profile/clearState',
      getUserProfile: 'profile/getUserProfile',
      getUserFollowers: 'profile/getUserFollowers',
      getUserFollowing: 'profile/getUserFollowing',
      toggleFollowingEnough: 'profile/toggleFollowingEnough',
      toggleFollowersEnough: 'profile/toggleFollowersEnough',
      toggleFollowersPage: 'profile/toggleFollowersPage',
      toggleFollowingPage: 'profile/toggleFollowingPage',
    }),
    changeTab(tab) {
      if (this.selected !== tab) {
        this.$router.replace(`${this.$route.path}?tab=${tab}`)
      }
    },
    async loadData($state) {
      if (this.selected === 'followers') {
        this.loadMoreFollowers($state)
      } else {
        this.loadMoreFollowing($state)
      }
    },
    async loadMoreFollowers($state) {
      const self = this
      if (!this.followersEnough) {
        this.followersCurrentPage += 1
        this.getUserFollowers({
          page: this.followersCurrentPage,
          userName: this.slug,
        }).then(function (res) {
          if (res.data.length < 10) {
            self.followersEnough = true
            $state.complete()
          } else {
            $state.loaded()
          }
        })
      }
    },
    async loadMoreFollowing($state) {
      const self = this
      if (!this.followingEnough) {
        this.followingCurrentPage += 1
        this.getUserFollowing({
          page: this.followingCurrentPage,
          userName: this.slug,
        }).then(function (res) {
          if (res.data.length < 10) {
            self.followingEnough = true
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
