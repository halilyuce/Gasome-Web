<template>
  <div
    class="
      flex flex-col
      xl:w-5/6
      2xl:w-2/3
      xl:mr-auto
      w-full
      pt-1
      pb-5
      px-8
      h-full
    "
  >
    <div
      ref="trends"
      class="relative bg-white dark:bg-black py-3 px-5 rounded-xl mt-4"
      :class="{ 'h-48': trendsLoading }"
    >
      <h3 v-if="!trendsLoading">{{ $t('rightSideBar.mostSpoken') }}</h3>
      <ul
        v-if="trends && trends.length > 0"
        class="
          divide-y divide-gray-100
          dark:divide-gray-500 dark:divide-opacity-10
        "
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
      <NoData
        v-else-if="!trendsLoading && trends.length === 0"
        class="mt-3 mb-2"
      />
    </div>

    <div
      ref="recommends"
      class="relative bg-white dark:bg-black rounded-xl mt-8"
      :class="{ 'h-48': recommendsLoading }"
    >
      <h3 v-if="recommendedUsers.length > 0" class="pt-3 pl-5">
        {{ $t('rightSideBar.suggestion') }}
      </h3>
      <ul
        class="
          px-5
          pb-3
          mt-1
          divide-y divide-gray-100
          dark:divide-gray-500 dark:divide-opacity-10
        "
      >
        <li
          v-for="user in recommendedUsers.slice(0, 3)"
          :key="user.id"
          class="flex flex-col xl:flex-row justify-between py-2"
        >
          <n-link
            :to="'/u/' + user.username"
            class="flex flex-row items-center"
          >
            <img
              class="
                h-10
                w-10
                object-cover
                rounded rounded-xl
                border border-gray-200
                dark:border-gray-700
              "
              :src="`${smallAvatar + user.avatar}.jpg`"
              alt="Avatar"
            />

            <div class="flex flex-col ml-2">
              <h5
                class="
                  truncate
                  w-full
                  lg:w-28
                  xl:w-24
                  2xl:w-32
                  overflow-ellipsis
                "
              >
                {{ user.name }}
              </h5>
              <span class="text-gray-400 text-xs">{{
                '@' + user.username
              }}</span>
            </div>
          </n-link>
          <vs-button
            shadow
            border
            size="small"
            :active="followedList.includes(user.username)"
            :loading="
              followLoading &&
              followList[followList.length - 1] === user.username
            "
            @click="followUser(user.username)"
          >
            <span class="px-1">{{
              followedList.includes(user.username)
                ? $t('rightSideBar.unfollow')
                : $t('rightSideBar.follow')
            }}</span>
          </vs-button>
        </li>
      </ul>
    </div>

    <div class="flex flex-row justify-between mt-auto">
      <n-link :to="'/privacy'" class="text-gray-500 text-sm">{{
        $t('rightSideBar.privacy')
      }}</n-link>
      <a
        href="mailto:support@gasome.com"
        target="_blank"
        class="text-gray-500 text-sm"
        >{{ $t('rightSideBar.support') }}</a
      >
      <span class="text-gray-500 text-sm">© 2021 Gasome</span>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import NoData from '../UI/NoData.vue'
export default {
  components: { NoData },
  computed: {
    ...mapState({
      alert: (state) => state.alert,
      recommendedUsers: (state) => state.sidebar.recommendedUsers,
      trends: (state) => state.sidebar.trends,
      trendsLoading: (state) => state.sidebar.trendsLoading,
      recommendsLoading: (state) => state.sidebar.recommendsLoading,
      followLoading: (state) => state.sidebar.followLoading,
    }),
  },
  data() {
    return {
      active: false,
      smallAvatar: process.env.AVATAR_SMALL,
      followList: [],
      followedList: [],
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
    if (this.trends.length === 0) {
      this.getTrends()
    }
    if (this.recommendedUsers.length === 0) {
      this.getRecommendedUsers()
    }
  },

  methods: {
    ...mapActions({
      getRecommendedUsers: 'sidebar/getRecommendedUsers',
      getTrends: 'sidebar/getTrends',
      clearAlert: 'alert/clear',
      follow: 'sidebar/follow',
    }),
    async followUser(username) {
      const self = this
      self.followList.push(username)
      this.follow(username).then((res) => {
        if (res.state) {
          self.followedList.push(username)
        } else {
          const index = self.followedList.findIndex((user) => user === username)
          self.followedList.splice(index, 1)
        }
      })
    },
  },
}
</script>
