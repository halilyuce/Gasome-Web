<template>
  <div class="flex flex-col pt-1 pb-5 w-full">
    <ul
      ref="recommends"
      class="
        relative
        divide-y divide-gray-100
        dark:divide-gray-500 dark:divide-opacity-10
      "
      :class="{ 'h-48 rounded-xl': recommendsLoading }"
    >
      <li
        v-for="user in users"
        :key="user.id"
        class="flex flex-col xl:flex-row justify-between py-2"
      >
        <div class="flex flex-row items-end w-full justify-between">
          <div class="flex flex-row items-center">
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
                class="truncate overflow-ellipsis"
                :class="{ 'w-28': !fullWidth }"
              >
                {{ user.name }}
              </h5>
              <span class="text-gray-400 text-xs">{{
                '@' + user.username
              }}</span>
            </div>
          </div>

          <div>
            <vs-button
              class="items-end"
              shadow
              border
              size="small"
              @click="followAction(user.username)"
            >
              <span class="px-1">{{
                followedList.includes(user.username)
                  ? $t('rightSideBar.unfollow')
                  : $t('rightSideBar.follow')
              }}</span>
            </vs-button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'UserSuggestions',
  props: {
    fullWidth: false,
  },
  computed: {
    ...mapState({
      users: (state) => state.recommendedUsers.users,
      recommendsLoading: (state) => state.recommendedUsers.loading,
    }),
  },
  data() {
    return {
      smallAvatar: process.env.AVATAR_SMALL,
      followList: [],
      followedList: [],
    }
  },
  mounted() {
    if (this.users.length === 0) {
      this.getRecommendedUsers()
    }
  },
  watch: {
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
  methods: {
    ...mapActions({
      getRecommendedUsers: 'recommendedUsers/getRecommendedUsers',
      followUser: 'recommendedUsers/follow',
    }),
    async followAction(username) {
      const self = this
      self.followList.push(username)
      await this.followUser(username).then((res) => {
        if (res.state) {
          self.followedList.push(username)
        } else {
          const index = self.followedList.findIndex((user) => user === username)
          self.followedList.splice(index, 1)
        }
        this.$emit('reloadPosts')
      })
    },
    async infiniteHandler($state) {
      this.$emit('load', $state)
    },
  },
}
</script>
