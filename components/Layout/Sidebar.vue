<template>
  <div>
    <vs-sidebar
      relative
      reduce
      v-model="active"
      :textWhite="false"
      open
      class="min-h-screen"
    >
      <template #logo>
        <Logo />
      </template>

      <div
        class="border-t dark:border-gray-500 dark:border-opacity-10 border-gray-200 w-full mt-2 mb-3"
      ></div>

      <vs-sidebar-item to="/" id="home">
        <template #icon>
          <i class="bx bx-home-circle"></i>
        </template>
        Home
      </vs-sidebar-item>
      <vs-sidebar-item id="swaps" disabled>
        <template #icon>
          <i class="bx bx-shuffle"></i>
        </template>
        Swaps
      </vs-sidebar-item>
      <vs-sidebar-item id="discover" disabled>
        <template #icon>
          <i class="bx bx-game"></i>
        </template>
        Discover
      </vs-sidebar-item>
      <vs-sidebar-item id="chat" disabled>
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
        Messages
      </vs-sidebar-item>

      <div
        class="border-t dark:border-gray-500 dark:border-opacity-10 border-gray-200 w-full mt-3"
      ></div>

      <vs-sidebar-item to="/settings" id="settings">
        <template #icon>
          <i class="bx bx-cog"></i>
        </template>
        Settings
      </vs-sidebar-item>

      <vs-sidebar-item to="/notifications" id="notifications">
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
        Notifications
      </vs-sidebar-item>

      <template #footer>
        <div class="flex flex-col">
          <div
            class="flex flex-col items-center justify-center bg-gray-100 dark:bg-content-bg rounded-2xl mb-3"
            :class="{ 'pt-1': !isLight }"
          >
            <vs-button
              :transparent="isLight"
              :shadow="!isLight"
              :active="!isLight"
              @click="isLight = false"
              dark
              icon
            >
              <i class="bx" :class="!isLight ? 'bxs-moon' : 'bx-moon'"></i>
            </vs-button>
            <vs-button
              :transparent="!isLight"
              :shadow="isLight"
              :active="isLight"
              @click="isLight = true"
              color="#666"
              icon
            >
              <i class="bx" :class="isLight ? 'bxs-sun' : 'bx-sun'"></i>
            </vs-button>
          </div>

          <vs-button @click="logOut" danger flat icon>
            <i class="bx bx-power-off"></i>
          </vs-button>
        </div>
      </template>
    </vs-sidebar>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import Logo from '../Logo.vue'
export default {
  components: { Logo },
  computed: {
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
  mounted() {
    this.isLight = localStorage.getItem('mode') === 'light' ? true : false
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
  methods: {
    ...mapActions({
      setTab: 'setTab',
    }),
    async logOut() {
      await this.$auth.logout()
    },
  },
}
</script>
