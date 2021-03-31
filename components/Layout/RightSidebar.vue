<template>
  <div class="m-5">
    <div class="flex justify-between items-center">
      <vs-switch v-model="isDark">
        <template #circle>
          <i v-if="!isDark" class="bx bxs-moon"></i>
          <i v-else class="bx bxs-sun"></i>
        </template>
      </vs-switch>

      <div class="flex flex-row items-center">
        <vs-button>
          <i class="bx bx-cog text-xl"></i>
        </vs-button>
        <vs-avatar
          size="36"
          primary
          badge-color="danger"
          badge-position="top-right"
          class="ml-2"
          @click="openNotificationUser"
        >
          <i class="bx bx-bell dark:text-white"></i>

          <template #badge>
            <span class="dark:text-white">28</span>
          </template>
        </vs-avatar>
      </div>
    </div>

    <div class="bg-white dark:bg-black py-3 px-5 rounded-xl mt-4">
      <h3>Most Spoken</h3>
      <ul
        class="divide-y divide-gray-100 dark:divide-black dark:divide-opacity-30"
      >
        <li class="flex justify-between items-center text-sm text-purple-500">
          #CyberMonday
          <vs-button transparent shadow size="small"
            ><span class="text-gray-500">1.2K</span>
          </vs-button>
        </li>
        <li class="flex justify-between items-center text-sm text-purple-500">
          #SteamBlackFriday
          <vs-button transparent shadow size="small"
            ><span class="text-gray-500">691</span>
          </vs-button>
        </li>
        <li class="flex justify-between items-center text-sm text-purple-500">
          #GasomeEvent2021
          <vs-button transparent shadow size="small"
            ><span class="text-gray-500">301</span>
          </vs-button>
        </li>
      </ul>
    </div>

    <div class="bg-white dark:bg-black py-3 px-5 rounded-xl mt-8">
      <h3>User Suggestions</h3>
      <div class="flex justify-start mt-3"></div>
    </div>
  </div>
</template>
<script>
import likeNotification from '../Notifications/Like.vue'
export default {
  components: {
    likeNotification,
  },
  data() {
    return {
      isDark: true,
    }
  },
  watch: {
    isDark(val) {
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
    this.isDark = localStorage.getItem('mode') === 'light' ? true : false
  },

  methods: {
    openNotificationUser() {
      const noti = this.$vs.notification({
        duration: 'none',
        width: 'auto',
        content: likeNotification,
      })
    },
  },
}
</script>
