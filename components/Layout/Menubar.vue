<template>
  <div class="fixed bottom-0 bg-black border-t border-gray-700 z-10 w-full">
   <div class="grid grid-cols-5 w-full">
    <div
      class="flex flex-col items-center justify-between p-2 cursor-pointer"
      :class="active === 'home' ? 'text-purple-600' : 'text-gray-400'"
      @click="changeTab('home')"
    >
      <i class="bx bxs-home text-2xl"></i>
      <span class="menu-text-xxs md:text-sm">Home</span>
    </div>
    <div
      class="flex flex-col items-center justify-between p-2 cursor-pointer"
      :class="active === 'swaps' ? 'text-purple-600' : 'text-gray-400'"
      @click="changeTab('swaps')"
    >
      <i class="bx bxs-hand-up text-2xl"></i>
      <span class="menu-text-xxs md:text-sm">Swaps</span>
    </div>
    <div
      class="flex flex-col items-center justify-between p-2 cursor-pointer"
      :class="active === 'discover' ? 'text-purple-600' : 'text-gray-400'"
      @click="changeTab('discover')"
    >
      <i class="bx bxs-joystick text-2xl"></i>
      <span class="menu-text-xxs md:text-sm">Discover</span>
    </div>
    <div
      class="flex flex-col items-center justify-between p-2 cursor-pointer"
      :class="active === 'notifications' ? 'text-purple-600' : 'text-gray-400'"
      @click="changeTab('notifications')"
    >
      <span class="relative inline-block">
        <i class="bx bxs-bell text-2xl"></i>
        <span class="absolute top-0.5 right-0 inline-flex items-center justify-center px-1 py-0.5 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">76</span>
      </span>
      <span class="menu-text-xxs md:text-sm">Notifications</span>
    </div>
    <div
      class="flex flex-col items-center justify-between p-2 cursor-pointer"
      :class="active === 'messages' ? 'text-purple-600' : 'text-gray-400'"
      @click="changeTab('messages')"
    >
      <span class="relative inline-block">
        <i class="bx bxs-message-square-detail text-2xl"></i>
        <span class="absolute top-0.5 right-0 inline-flex items-center justify-center px-1 py-0.5 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">76</span>
      </span>
      <span class="menu-text-xxs md:text-sm">Messages</span>
    </div>
   </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Menubar",
  data() {
    return {
      active: "home"
    }
  },
  methods: {
    changeTab(tab) {
      this.active = tab
    }
  }
}
</script>
<style scoped>
  .menu-text-xxs {
    font-size: 0.6rem;
  }
</style>
