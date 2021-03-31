<template>
  <div class="flex flex-col items-center w-full mt-6">
    <vs-avatar size="60" history badge badge-color="success">
      <img src="~assets/img/avatar.jpeg" alt="Avatar" />
    </vs-avatar>
    <h3 class="mt-2">Halil Yüce</h3>
    <p class="text-gray-400 mb-2">@halil</p>
    <vs-button gradient size="small" :active="true">
      <span class="px-5" @click="openNotificationCookie">Edit Profile</span>
    </vs-button>
    <div class="grid grid-cols-3 gap-5 mt-2">
      <div class="flex flex-col items-center">
        <h3>19</h3>
        <span class="text-gray-400 text-xs">Posts</span>
      </div>
      <div class="flex flex-col items-center">
        <h3>76</h3>
        <span class="text-gray-400 text-xs">Follows</span>
      </div>
      <div class="flex flex-col items-center">
        <h3>1.2k</h3>
        <span class="text-gray-400 text-xs">Followers</span>
      </div>
    </div>
  </div>
</template>
<script>
import cookieNotification from '../Notifications/Cookie.vue'
export default {
  components: {
    cookieNotification,
  },
  methods: {
    openNotificationCookie() {
      const noti = this.$vs.notification({
        duration: 'none',
        content: cookieNotification,
      })
    },
  },
}
</script>
