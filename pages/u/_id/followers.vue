<template>
  <div
    ref="user"
    class="
      relative
      bg-white
      dark:bg-black
      container
      overflow-y-auto
      disable-scrollbars
    "
    :class="followers.length > 0 ? 'max-h-screen' : 'min-h-screen'"
  >
    <!-- Followers Header Bar -->
    <FollowersHeader v-if="user" v-bind:user="user" />

    <div
      v-infinite-scroll="loadMore"
      infinite-scroll-distance="1000"
      infinite-scroll-throttle-delay="1000"
    >
      <UserListItem v-if="followers" v-bind:followers="followers" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import FollowersHeader from '~/components/UserProfile/FollowersHeader.vue'
import UserListItem from '~/components/UserProfile/UserListItem.vue'
import infiniteScroll from 'vue-infinite-scroll'
export default {
  components: { FollowersHeader, UserListItem },
  layout: 'sidebars',
  computed: {
    ...mapState({
      user: (state) => state.profile.user,
      followers: (state) => state.profile.followers,
      loading: (state) => state.profile.loading,
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
      clearState: 'profile/clearState',
      getUserProfile: 'profile/getUserProfile',
      getUserFollowers: 'profile/getUserFollowers',
      toggleFollowersLoading: 'profile/toggleFollowersLoading',
    }),
    async loadMore() {
      const self = this
      if (this.currentPage === 0) {
        this.toggleFollowersLoading(true)
      }
      if (!this.enough) {
        this.currentPage += 1
        this.getUserFollowers({
          page: this.currentPage,
          userName: this.slug,
        }).then(function (res) {
          if (res.data.length < 10) {
            self.enough = true
          }
        })
      }
    },
  },
  directives: {
    infiniteScroll,
  },
}
</script>
