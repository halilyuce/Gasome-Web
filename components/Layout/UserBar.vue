<template>
  <div class="flex flex-col items-center w-full mt-6">
    <div class="mx-10">
      <div class="flex flex-row">
        <vs-avatar size="60" history badge badge-color="success">
          <img src="~assets/img/avatar.jpeg" alt="Avatar" />
        </vs-avatar>
        <div class="flex flex-col ml-3">
          <h3 class="mt-2">Halil Yüce</h3>
          <p class="text-gray-400 mb-2">@halil</p>
        </div>
      </div>

      <div class="grid grid-cols-3 gap-5 mb-4">
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

      <vs-button gradient block size="small" :active="true">
        <span @click="openNotificationCookie">Edit Profile</span>
      </vs-button>

      <div class="grid grid-cols-6 gap-5 mt-10">
        <div
          class="bg-gray-50 dark:bg-black rounded-xl shadow-xl py-3 col-span-3"
        >
          <div class="flex flex-col items-center">
            <h2>39</h2>
            <span class="text-gray-400 text-xs">Swaps</span>
          </div>
        </div>
        <div
          class="bg-gray-50 dark:bg-black rounded-xl shadow-xl py-3 col-span-3"
        >
          <div class="flex flex-col items-center">
            <h2>52</h2>
            <span class="text-gray-400 text-xs">Wishes</span>
          </div>
        </div>
        <div
          class="bg-gray-50 dark:bg-black rounded-xl shadow-xl py-3 col-span-6"
        >
          <div class="flex flex-col items-center">
            <h2>120</h2>
            <span class="text-gray-400 text-xs">Played Games</span>
          </div>
        </div>
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
