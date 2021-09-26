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
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import FollowersHeader from '~/components/UserProfile/FollowersHeader.vue'
import infiniteScroll from 'vue-infinite-scroll'
export default {
  components: { FollowersHeader },
  layout: 'sidebars',
  computed: {
    ...mapGetters(['loggedInUser']),
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
    this.getUserFollowers(1)
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
    async loadMore() {
      const self = this
      if (this.currentPage === 0) {
        this.toggleFollowersLoading(true)
      }
      if (!this.enough) {
        this.currentPage += 1
        this.getUserFollowers({
          page: this.currentPage,
          userId: this.user.id,
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
