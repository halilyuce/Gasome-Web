<template>
  <div
    ref="notifications"
    v-infinite-scroll="loadMore"
    infinite-scroll-distance="1000"
    infinite-scroll-throttle-delay="1000"
    class="bg-white relative dark:bg-black overflow-y-auto disable-scrollbars"
    :class="!loading ? 'max-h-screen' : 'min-h-screen'"
  >
    <h1 class="p-5">Notifications</h1>
    <ul
      class="divide-y divide-gray-100 dark:divide-gray-600 dark:divide-opacity-20 divide-solid"
      v-if="notifications"
    >
      <li
        class="px-5 py-3"
        v-for="notification in notifications"
        :key="notification.id"
      >
        <!-- AVATAR  -->
        <NotificationList :notification='notification' />
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import infiniteScroll from 'vue-infinite-scroll'
import NotificationList from '~/components/Notifications/NotificationList'
export default {
  layout: 'sidebars',
  components: { NotificationList },
  computed: {
    ...mapState({
      alert: (state) => state.alert,
      pageState: (state) => state.notifications.page,
      notifications: (state) => state.notifications.notifications,
      loading: (state) => state.notifications.loading,
    }),
    page: {
      get() {
        return this.pageState
      },
      set(value) {
        this.setCurrentPage(value)
      },
    },
  },
  watch: {
    loading(newVal, oldVal) {
      if (newVal != oldVal) {
        if (!newVal) {
          this.notificationLoading.close()
        } else {
          this.notificationLoading = this.$vs.loading({
            target: this.$refs.notifications,
          })
        }
      }
    },
  },
  data() {
    return {
      smallAvatar: process.env.AVATAR_SMALL,
      enough: false,
    }
  },

  async asyncData({ route, store }) {
    if (route.name === 'notifications') {
      await store.dispatch('setTab', 'notifications')
    }
  },
  methods: {
    ...mapActions({
      toggleLoading: 'notifications/toggleLoading',
      loadMoreNotifications: 'notifications/loadMoreNotifications',
      setCurrentPage: 'notifications/setCurrentPage',
      clearAlert: 'alert/clear',
    }),
    async loadMore() {
      const self = this
      if (this.page === 0) {
        this.toggleLoading(true)
      }
      if (!this.enough) {
        this.page += 1
        this.loadMoreNotifications().then(function (res) {
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

<style></style>
