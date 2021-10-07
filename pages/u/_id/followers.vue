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
    <FollowersHeader v-if="user" v-bind:user="user" />

    <div>
      <UserListItem
        @load="loadMore"
        v-if="followers"
        v-bind:followers="followers"
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
  computed: {
    ...mapState({
      user: (state) => state.profile.user,
      followers: (state) => state.profile.followers,
    }),
  },
  data() {
    return {
      enough: false,
      currentPage: 0,
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
      getUserFollowers: 'profile/getUserFollowers',
    }),
    async loadMore($state) {
      const self = this
      if (!this.enough) {
        this.currentPage += 1
        this.getUserFollowers({
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
