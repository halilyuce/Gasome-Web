<template>
  <div>
    <vs-sidebar
      v-model="active"
      relative
      reduce
      :text-white="false"
      open
      class="h-screen"
    >
      <template #logo>
        <div @click.prevent="active = 'home'"><Logo /></div>
      </template>

      <div
        class="
          border-t
          dark:border-gray-500 dark:border-opacity-10
          border-gray-200
          w-full
          mt-2
          mb-3
        "
      ></div>

      <vs-sidebar-item id="home" to="/">
        <template #icon>
          <i class="bx bx-home-circle"></i>
        </template>
        {{ $t('sideBar.home') }}
      </vs-sidebar-item>
      <vs-sidebar-item id="discover" to="/discover">
        <template #icon>
          <i class="bx bx-game"></i>
        </template>
        {{ $t('sideBar.discover') }}
      </vs-sidebar-item>
      <vs-sidebar-item id="messages" to="/messages">
        <template #icon>
          <vs-avatar
            v-if="messagesBadge && messagesBadge > 0"
            size="36"
            badge-color="danger"
            badge-position="top-right"
          >
            <i class="bx bx-chat dark:text-white"></i>

            <template #badge>
              <span class="dark:text-white">{{ messagesBadge }}</span>
            </template>
          </vs-avatar>
          <i v-else class="bx bx-chat"></i>
        </template>
        {{ $t('sideBar.messages') }}
      </vs-sidebar-item>

      <div
        class="
          border-t
          dark:border-gray-500 dark:border-opacity-10
          border-gray-200
          w-full
          mt-3
        "
      ></div>

      <vs-sidebar-item id="settings" to="/settings">
        <template #icon>
          <i class="bx bx-cog"></i>
        </template>
        {{ $t('sideBar.settings') }}
      </vs-sidebar-item>

      <vs-sidebar-item id="notifications" to="/notifications">
        <template #icon>
          <vs-avatar
            v-if="notificationBadge && notificationBadge > 0"
            size="36"
            badge-color="danger"
            badge-position="top-right"
          >
            <i class="bx bx-bell dark:text-white"></i>

            <template #badge>
              <span class="dark:text-white">{{ notificationBadge }}</span>
            </template>
          </vs-avatar>
          <i v-else class="bx bx-bell"></i>
        </template>
        {{ $t('sideBar.notifications') }}
      </vs-sidebar-item>

      <template #footer>
        <div class="flex flex-col">
          <div
            class="
              flex flex-col
              items-center
              justify-center
              bg-gray-100
              dark:bg-content-bg
              rounded-2xl
              mb-3
            "
            :class="{ 'pt-1': !isLight }"
          >
            <vs-button
              :transparent="isLight"
              :shadow="!isLight"
              :active="!isLight"
              dark
              icon
              @click="isLight = false"
            >
              <i class="bx" :class="!isLight ? 'bxs-moon' : 'bx-moon'"></i>
            </vs-button>
            <vs-button
              :transparent="!isLight"
              :shadow="isLight"
              :active="isLight"
              color="#666"
              icon
              @click="isLight = true"
            >
              <i class="bx" :class="isLight ? 'bxs-sun' : 'bx-sun'"></i>
            </vs-button>
          </div>

          <vs-button v-if="loggedInUser" danger flat icon @click="logOut">
            <i class="bx bx-power-off"></i>
          </vs-button>
        </div>
      </template>
    </vs-sidebar>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import Logo from '../Logo.vue'
export default {
  components: { Logo },
  computed: {
    ...mapGetters(['loggedInUser']),
    ...mapState({
      tab: (state) => state.tab,
      notificationBadge: (state) => state.notificationBadge,
      messagesBadge: (state) => state.messagesBadge,
    }),
    active: {
      get() {
        return this.tab
      },
      set(value) {
        this.setTab(value)
      },
    },
  },
  data() {
    return {
      isLight: true,
    }
  },
  watch: {
    isLight(val) {
      if (val === true) {
        localStorage.setItem('mode', 'light')
        this.$vs.setTheme('light')
        this.$colorMode.preference = 'light'
      } else {
        localStorage.setItem('mode', 'dark')
        this.$vs.setTheme('dark')
        this.$colorMode.preference = 'dark'
      }
    },
  },
  mounted() {
    this.isLight = localStorage.getItem('mode') === 'light' ? true : false
  },
  methods: {
    ...mapActions({
      setTab: 'setTab',
      resetAlertState: 'alert/resetState',
      resetGameState: 'game/resetState',
      resetState: 'resetState',
      resetMessagesState: 'messages/resetState',
      resetNofiticationsState: 'notifications/resetState',
      resetPostsState: 'posts/resetState',
      resetProfileState: 'profile/resetState',
      resetRecommendedUsersState: 'recommendedUsers/resetState',
      resetSearchState: 'search/resetState',
      resetSettingsState: 'settings/resetState',
      resetSidebarState: 'sidebar/resetState',
    }),
    async logOut() {
      await this.$auth.logout()
      this.resetAlertState()
      this.resetGameState()
      this.resetState()
      this.resetMessagesState()
      this.resetNofiticationsState()
      this.resetPostsState()
      this.resetProfileState()
      this.resetRecommendedUsersState()
      this.resetSearchState()
      this.resetSettingsState()
      this.resetSidebarState()
    },
  },
}
</script>
