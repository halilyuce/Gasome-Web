<template>
  <div
    class="
      bg-white
      h-screen
      relative
      dark:bg-black
      overflow-y-auto overflow-x-hidden
      disable-scrollbars
    "
  >
    <h1 class="p-5">Notifications</h1>
    <ul
      v-if="notifications"
      class="
        divide-y divide-gray-100
        dark:divide-gray-600 dark:divide-opacity-20
        divide-solid
      "
    >
      <li
        v-for="notification in notifications"
        :key="notification.id"
        class="px-5 py-3"
        :class="{
          'bg-purple-100 dark:bg-purple-300 dark:bg-opacity-5 bg-opacity-30':
            !notification.isshowed,
        }"
      >
        <!-- AVATAR  -->
        <NotificationList :notification="notification" />
      </li>

      <client-only>
        <infinite-loading
          v-if="!enough"
          spinner="spiral"
          :distance="300"
          @infinite="infiniteHandler"
          ><span slot="no-results"></span><span slot="no-more"></span
        ></infinite-loading>
      </client-only>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import NotificationList from '~/components/Notifications/NotificationList'
export default {
  components: { NotificationList },
  layout: 'sidebars',
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

  async asyncData({ route, store }) {
    if (route.name === 'notifications') {
      await store.dispatch('setTab', 'notifications')
    }
  },
  data() {
    return {
      smallAvatar: process.env.AVATAR_SMALL,
      enough: false,
    }
  },
  methods: {
    ...mapActions({
      toggleLoading: 'notifications/toggleLoading',
      loadMoreNotifications: 'notifications/loadMoreNotifications',
      setCurrentPage: 'notifications/setCurrentPage',
      clearAlert: 'alert/clear',
    }),
    infiniteHandler($state) {
      const self = this
      if (this.page === 0) {
        this.toggleLoading(true)
      }
      if (!this.enough) {
        this.page += 1
        this.loadMoreNotifications().then(function (res) {
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

<style></style>
