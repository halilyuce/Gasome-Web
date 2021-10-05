<template>
  <div
    class="flex flex-col rounded-xl border-gray-200 dark:border-gray-700 mt-1"
  >
    <ul
      v-if="followers && user"
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
            :loading="followLoading === follower.user.username"
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
      <client-only>
        <infinite-loading
          spinner="spiral"
          :identifier="user.id"
          :distance="300"
          @infinite="infiniteHandler"
          ><span slot="no-results"></span><span slot="no-more"></span
        ></infinite-loading>
      </client-only>
    </ul>
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  name: 'user-list-item',
  props: {
    followers: null,
  },
  data() {
    return {
      smallAvatar: process.env.AVATAR_SMALL,
      mediumImagePath: process.env.POSTIMAGE_MEDIUM,
    }
  },
  computed: {
    ...mapGetters(['loggedInUser']),
    ...mapState({
      user: (state) => state.profile.user,
      followLoading: (state) => state.profile.followersLoading,
    }),
  },
  methods: {
    ...mapActions({
      follow: 'profile/followFromFollower',
    }),
    followAction(username) {
      this.follow(username)
    },
    async infiniteHandler($state) {
      this.$emit('load', $state)
    },
  },
}
</script>
