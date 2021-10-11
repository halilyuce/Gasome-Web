<template>
  <div
    class="
      fixed
      bottom-0
      bg-white
      dark:bg-black
      border-t border-gray-300
      dark:border-gray-700
      z-10
      w-full
    "
  >
    <div class="grid grid-cols-5 w-full">
      <div
        class="flex flex-col items-center justify-between p-2 cursor-pointer"
        :class="active === 'home' ? 'text-purple-600' : 'text-gray-400'"
        @click="changeTab('home')"
      >
        <i class="bx bx-home text-2xl"></i>
        <span class="menu-text-xxs md:text-sm">{{ $t('menuBar.home') }}</span>
      </div>
      <div
        class="flex flex-col items-center justify-between p-2 cursor-pointer"
        :class="active === 'swaps' ? 'text-purple-600' : 'text-gray-400'"
        @click="changeTab('swaps')"
      >
        <i class="bx bx-shuffle text-2xl"></i>
        <span class="menu-text-xxs md:text-sm">{{ $t('menuBar.swaps') }}</span>
      </div>
      <div
        class="flex flex-col items-center justify-between p-2 cursor-pointer"
        :class="active === 'discover' ? 'text-purple-600' : 'text-gray-400'"
        @click="changeTab('discover')"
      >
        <i class="bx bx-joystick text-2xl"></i>
        <span class="menu-text-xxs md:text-sm">{{
          $t('menuBar.discover')
        }}</span>
      </div>
      <div
        class="flex flex-col items-center justify-between p-2 cursor-pointer"
        :class="
          active === 'notifications' ? 'text-purple-600' : 'text-gray-400'
        "
        @click="changeTab('notifications')"
      >
        <span class="relative inline-block">
          <i class="bx bx-bell text-2xl"></i>
          <span
            v-if="notificationBadge > 0"
            class="
              absolute
              top-0.5
              right-0
              inline-flex
              items-center
              justify-center
              px-1
              py-0.5
              text-xs
              font-bold
              leading-none
              text-red-100
              transform
              translate-x-1/2
              -translate-y-1/2
              bg-red-600
              rounded-full
            "
            >{{ notificationBadge }}</span
          >
        </span>
        <span class="menu-text-xxs md:text-sm">{{
          $t('menuBar.notifications')
        }}</span>
      </div>
      <div
        class="flex flex-col items-center justify-between p-2 cursor-pointer"
        :class="active === 'messages' ? 'text-purple-600' : 'text-gray-400'"
        @click="changeTab('messages')"
      >
        <span class="relative inline-block">
          <i class="bx bx-chat text-2xl"></i>
          <span
            v-if="messagesBadge > 0"
            class="
              absolute
              top-0.5
              right-0
              inline-flex
              items-center
              justify-center
              px-1
              py-0.5
              text-xs
              font-bold
              leading-none
              text-red-100
              transform
              translate-x-1/2
              -translate-y-1/2
              bg-red-600
              rounded-full
            "
            >{{ messagesBadge }}</span
          >
        </span>
        <span class="menu-text-xxs md:text-sm">{{
          $t('menuBar.messages')
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Menubar',
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
  methods: {
    ...mapActions({
      setTab: 'setTab',
    }),
    changeTab(tab) {
      this.active = tab
      if (tab === 'home') {
        this.$router && this.$router.push('/')
      }
      if (tab === 'notifications') {
        this.$router && this.$router.push('/notifications')
      }
      if (tab === 'messages') {
        this.$router && this.$router.push('/messages')
      }
    },
  },
}
</script>
<style scoped>
.menu-text-xxs {
  font-size: 0.6rem;
}
</style>
