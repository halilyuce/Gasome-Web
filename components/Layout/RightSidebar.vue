<template>
  <div class="flex flex-col pt-1 pb-5 px-8 h-full">
    <div class="bg-white dark:bg-black py-3 px-5 rounded-xl mt-4">
      <h3>Most Spoken</h3>
      <ul
        class="divide-y divide-gray-100 dark:divide-gray-500 dark:divide-opacity-10"
      >
        <li class="flex justify-between items-center text-sm text-purple-500">
          #CyberMonday
          <vs-button transparent size="small"
            ><span class="text-gray-500">1.2K</span>
          </vs-button>
        </li>
        <li class="flex justify-between items-center text-sm text-purple-500">
          #SteamBlackFriday
          <vs-button transparent size="small"
            ><span class="text-gray-500">691</span>
          </vs-button>
        </li>
        <li class="flex justify-between items-center text-sm text-purple-500">
          #Hitman3
          <vs-button transparent size="small"
            ><span class="text-gray-500">559</span>
          </vs-button>
        </li>
        <li class="flex justify-between items-center text-sm text-purple-500">
          #DiscordDown
          <vs-button transparent size="small"
            ><span class="text-gray-500">404</span>
          </vs-button>
        </li>
        <li class="flex justify-between items-center text-sm text-purple-500">
          #GasomeEvent2021
          <vs-button transparent size="small"
            ><span class="text-gray-500">301</span>
          </vs-button>
        </li>
      </ul>
    </div>

    <div
      v-if="recommendedUsers && recommendedUsers.length > 0"
      class="bg-white dark:bg-black rounded-xl mt-8"
    >
      <h3 class="pt-3 pl-5">User Suggestions</h3>
      <ul
        class="px-5 pb-3 mt-1 divide-y divide-gray-100 dark:divide-gray-500 dark:divide-opacity-10"
      >
        <li
          v-for="user in recommendedUsers.slice(0, 3)"
          :key="user.id"
          class="flex flex-row justify-between items-center py-2"
        >
          <div class="flex flex-row items-center">
            <img
              class="h-10 w-10 object-cover rounded rounded-xl border border-gray-200 dark:border-gray-700"
              :src="`${smallAvatar + user.avatar}.jpg`"
              alt="Avatar"
            />

            <div class="flex flex-col ml-2">
              <h5 class="truncate w-28 overflow-ellipsis">{{ user.name }}</h5>
              <span class="text-gray-400 text-xs">{{
                '@' + user.username
              }}</span>
            </div>
          </div>
          <vs-button
            shadow
            border
            size="small"
            :active="active"
            @click="active = !active"
          >
            <span class="px-1">{{ active ? 'Following' : 'Follow' }}</span>
          </vs-button>
        </li>
      </ul>
    </div>

    <div class="flex flex-row justify-between mt-auto">
      <a href="#" class="text-gray-500 text-sm">Privacy Policy</a>
      <a href="#" class="text-gray-500 text-sm">Support</a>
      <a href="#" class="text-gray-500 text-sm">© 2021 Gasome</a>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import likeNotification from '../Notifications/Like.vue'
export default {
  components: {
    likeNotification,
  },
  computed: {
    ...mapState({
      alert: (state) => state.alert,
      recommendedUsers: (state) => state.sidebar.recommendedUsers,
      loading: (state) => state.sidebar.loading,
    }),
  },
  data() {
    return {
      active: false,
      smallAvatar: process.env.AVATAR_SMALL,
    }
  },

  mounted() {
    this.getBadges()
    if (!this.recommendedUsers) {
      this.getRecommendedUsers()
    }
  },

  methods: {
    ...mapActions({
      getRecommendedUsers: 'sidebar/getRecommendedUsers',
      getBadges: 'getBadges',
      clearAlert: 'alert/clear',
    }),
  },
}
</script>
