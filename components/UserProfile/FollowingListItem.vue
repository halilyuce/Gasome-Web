<template>
  <div
    class="flex flex-col rounded-xl border-gray-200 dark:border-gray-700 mt-1"
  >
    <ul
      v-if="following && user"
      class="
        divide-y divide-gray-100
        dark:divide-gray-500 dark:divide-opacity-10
      "
    >
      <li
        v-for="follower in following"
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
              <n-link
                :to="'/u/' + follower.user.username"
                class="ml-2 flex-col items-center"
              >
                <h4>{{ follower.user.name }}</h4>
                <span class="text-gray-400">{{
                  '@' + follower.user.username
                }}</span>
              </n-link>
            </div>
          </div>
          <vs-button
            size="small"
            :shadow="follower.isAuthFollow"
            :border="follower.isAuthFollow"
            :loading="followLoading === follower.user.username"
            @click="followAction(follower.user.username)"
            :danger="follower.isAuthFollow"
          >
            <i
              class="bx text-base"
              :class="
                follower.isAuthFollow ? 'bxs-user-minus' : 'bxs-user-plus'
              "
            ></i>
            <span class="ml-2 mr-1">{{
              follower.isAuthFollow ? 'Unfollow' : 'Follow'
            }}</span>
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
    following: null,
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
      followLoading: (state) => state.profile.followingLoading,
    }),
  },
  methods: {
    ...mapActions({
      follow: 'profile/followFromFollowing',
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
