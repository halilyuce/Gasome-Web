<template>
  <div
    class="flex flex-col rounded-xl border-gray-200 dark:border-gray-700 mt-1"
  >
    <ul
      class="
        divide-y divide-gray-100
        dark:divide-gray-500 dark:divide-opacity-10
      "
    >
      <li
        v-for="follower in followers"
        v-bind:key="follower.id"
        class="pt-4 px-5 pb-3 hover-bg"
      >
        <div class="flex items-center w-full justify-between">
          <div class="flex justify-between">
            <div class="flex flex-row items-center">
              <n-link
                class="
                  flex
                  justify-between
                  items-center
                  text-sm text-purple-500
                "
                :to="'/u/' + follower.user.username"
              >
                <vs-avatar size="40">
                  <img
                    :src="`${smallAvatar + follower.user.avatar}.jpg`"
                    alt="Avatar"
                  />
                </vs-avatar>
              </n-link>
              <div class="ml-2 flex-col items-center">
                <h4>{{ follower.user.name }}</h4>
                <span class="text-gray-400">{{
                  '@' + follower.user.username
                }}</span>
              </div>
            </div>
          </div>
          <vs-button
            :shadow="follower.isAuthFollow"
            :border="follower.isAuthFollow"
            :loading="followLoading && lastFollow === follower.user.username"
            @click="followAction(follower.user.username)"
            :danger="follower.isAuthFollow"
          >
            <i
              class="bx"
              :class="
                follower.isAuthFollow ? 'bxs-user-minus' : 'bxs-user-plus'
              "
            ></i>
            <b class="mx-5">{{
              follower.isAuthFollow ? 'Unfollow' : 'Follow'
            }}</b>
          </vs-button>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'user-list-item',
  props: {
    followers: null,
  },
  data() {
    return {
      smallAvatar: process.env.AVATAR_SMALL,
      mediumImagePath: process.env.POSTIMAGE_MEDIUM,
      lastFollow: null,
    }
  },
  computed: {
    ...mapState({
      followLoading: (state) => state.profile.loading,
    }),
  },
  methods: {
    ...mapActions({
      follow: 'profile/follow',
    }),
    followAction(username) {
      this.lastfollow = username
      this.follow(username)
    },
  },
}
</script>
