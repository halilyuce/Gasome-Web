<template>
  <div class="flex flex-col pt-1 pb-5 px-8 h-full">
    <div
      ref="trends"
      class="relative bg-white dark:bg-black py-3 px-5 rounded-xl mt-4"
      :class="{ 'h-48': trendsLoading }"
    >
      <h3 v-if="!trendsLoading">Most Spoken</h3>
      <ul
        class="divide-y divide-gray-100 dark:divide-gray-500 dark:divide-opacity-10"
      >
        <li v-for="trend in trends" :key="trend.id">
          <n-link
            class="flex justify-between items-center text-sm text-purple-500"
            :to="'/h/' + trend.tag"
          >
            {{ '#' + trend.tag }}
            <vs-button transparent size="small"
              ><span class="text-gray-500">{{ trend.topic_weekly_count }}</span>
            </vs-button>
          </n-link>
        </li>
      </ul>
    </div>

    <div
      ref="recommends"
      class="relative bg-white dark:bg-black rounded-xl mt-8"
      :class="{ 'h-48': recommendsLoading }"
    >
      <h3 v-if="recommendedUsers.length > 0" class="pt-3 pl-5">
        User Suggestions
      </h3>
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
      trends: (state) => state.sidebar.trends,
      trendsLoading: (state) => state.sidebar.trendsLoading,
      recommendsLoading: (state) => state.sidebar.recommendsLoading,
    }),
  },
  data() {
    return {
      active: false,
      smallAvatar: process.env.AVATAR_SMALL,
    }
  },

  watch: {
    trendsLoading(newVal, oldVal) {
      if (newVal !== oldVal) {
        if (!newVal) {
          this.trendsLoad.close()
        } else {
          this.trendsLoad = this.$vs.loading({
            target: this.$refs.trends,
          })
        }
      }
    },
    recommendsLoading(newVal, oldVal) {
      if (newVal !== oldVal) {
        if (!newVal) {
          this.recommendsLoad.close()
        } else {
          this.recommendsLoad = this.$vs.loading({
            target: this.$refs.recommends,
          })
        }
      }
    },
  },

  mounted() {
    this.getTrends()
    if (this.recommendedUsers.length === 0) {
      this.getRecommendedUsers()
    }
  },

  methods: {
    ...mapActions({
      getRecommendedUsers: 'sidebar/getRecommendedUsers',
      getTrends: 'sidebar/getTrends',
      clearAlert: 'alert/clear',
    }),
  },
}
</script>
