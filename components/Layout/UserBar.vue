<template>
  <div class="flex flex-col items-center 2xl:items-end w-full my-5">
    <div class="flex flex-col mx-7 h-full">
      <div class="bg-white dark:bg-black py-5 pl-5 pr-7 rounded-xl">
        <div class="flex flex-row items-center">
          <n-link :to="`/u/${loggedInUser.username}`">
            <vs-avatar size="52" badge badge-color="success">
              <img
                v-if="loggedInUser"
                :src="`${smallAvatar + loggedInUser.avatar}.jpg`"
                alt="Avatar"
              />
            </vs-avatar>
          </n-link>
          <div class="flex flex-col ml-3">
            <h3>{{ loggedInUser ? loggedInUser.name : '' }}</h3>
            <p class="text-gray-400">
              {{ loggedInUser ? '@' + loggedInUser.username : '' }}
            </p>
          </div>
        </div>

        <div class="flex justify-between my-3">
          <div class="flex flex-col items-center">
            <h3>{{ loggedInUser ? loggedInUser.swapsCount : '' }}</h3>
            <span class="text-gray-400 text-xs">Swaps</span>
          </div>
          <div class="flex flex-col items-center">
            <h3>{{ loggedInUser ? loggedInUser.follows : '' }}</h3>
            <span class="text-gray-400 text-xs">Follows</span>
          </div>
          <div class="flex flex-col items-center">
            <h3>{{ loggedInUser ? loggedInUser.followers : '' }}</h3>
            <span class="text-gray-400 text-xs">Followers</span>
          </div>
        </div>

        <vs-button @click="openNotificationCookie" block>
          Edit Profile
        </vs-button>
      </div>

      <h2 class="mt-10 text-center">Statistics</h2>
      <div class="grid grid-cols-6 gap-0">
        <vs-button shadow size="xl" animation-type="scale" class="col-span-3">
          <div class="flex flex-col items-center">
            <h2>{{ loggedInUser ? loggedInUser.swapsCount : '' }}</h2>
            <span class="text-gray-400 text-xs">Swaps</span>
          </div>
          <template #animate>
            <i class="bx bxs-hand-up text-3xl"></i>
          </template>
        </vs-button>
        <vs-button shadow size="xl" animation-type="scale" class="col-span-3">
          <div class="flex flex-col items-center">
            <h2>0</h2>
            <span class="text-gray-400 text-xs">Wishes</span>
          </div>
          <template #animate>
            <i class="bx bx-library text-3xl"></i>
          </template>
        </vs-button>
        <vs-button shadow size="xl" animation-type="scale" class="col-span-6">
          <div class="flex flex-col items-center">
            <h2>0</h2>
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
import { mapGetters } from 'vuex'
import cookieNotification from '../Notifications/Cookie.vue'
import likeNotification from '../Notifications/Like.vue'
export default {
  components: {
    cookieNotification,
    likeNotification,
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
  },
  data() {
    return {
      smallAvatar: process.env.AVATAR_SMALL,
    }
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
