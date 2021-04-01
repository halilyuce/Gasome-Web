<template>
  <div class="flex flex-col items-center w-full my-5">
    <div class="flex flex-col mx-7 h-full">
      <div class="flex flex-row items-center">
        <vs-avatar size="52" badge badge-color="success">
          <img src="~assets/img/avatar.jpeg" alt="Avatar" />
        </vs-avatar>
        <div class="flex flex-col ml-3">
          <h3 class="mt-2">Halil Yüce</h3>
          <p class="text-gray-400 mb-2">@halil</p>
        </div>
      </div>

      <div class="flex justify-between ml-1 mb-4">
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

      <vs-button block>
        <span @click="openNotificationCookie">Edit Profile</span>
      </vs-button>

      <h2 class="mt-10 text-center">Statistics</h2>
      <div class="grid grid-cols-6 gap-0">
        <vs-button shadow size="xl" animation-type="scale" class="col-span-3">
          <div class="flex flex-col items-center">
            <h2>39</h2>
            <span class="text-gray-400 text-xs">Swaps</span>
          </div>
          <template #animate>
            <i class="bx bxs-hand-up text-3xl"></i>
          </template>
        </vs-button>
        <vs-button shadow size="xl" animation-type="scale" class="col-span-3">
          <div class="flex flex-col items-center">
            <h2>91</h2>
            <span class="text-gray-400 text-xs">Wishes</span>
          </div>
          <template #animate>
            <i class="bx bx-library text-3xl"></i>
          </template>
        </vs-button>
        <vs-button shadow size="xl" animation-type="scale" class="col-span-6">
          <div class="flex flex-col items-center">
            <h2>124</h2>
            <span class="text-gray-400 text-xs">Played Games</span>
          </div>
          <template #animate>
            <i class="bx bx-time text-3xl"></i>
          </template>
        </vs-button>
      </div>

      <div class="bg-white dark:bg-black py-3 px-5 rounded-xl mt-auto">
        <h3>Last Notification</h3>
        <div class="flex justify-start mt-3">
          <like-notification />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import cookieNotification from '../Notifications/Cookie.vue'
import likeNotification from '../Notifications/Like.vue'
export default {
  components: {
    cookieNotification,
    likeNotification,
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
