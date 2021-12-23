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
      <li v-for="follower in followers" :key="follower.id" class="hover-bg">
        <div
          class="pt-4 px-5 pb-3 flex items-center w-full justify-between"
          :class="{ 'border-l-4 border-purple-500': follower.isUserFollow }"
        >
          <div class="flex justify-between">
            <div class="flex flex-row items-center">
              <n-link
                class="flex justify-between items-center"
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
                class="ml-2 flex flex-col"
              >
                <h4 class="leading-4">{{ follower.user.name }}</h4>
                <span class="text-gray-400 text-sm">{{
                  '@' + follower.user.username
                }}</span>
              </n-link>
            </div>
          </div>
          <vs-button
            v-if="follower.user.id !== loggedInUser.id"
            size="small"
            :shadow="follower.isAuthFollow"
            :border="follower.isAuthFollow"
            :loading="followLoading === follower.user.username"
            :danger="follower.isAuthFollow"
            @click="followAction(follower.user.username)"
          >
            <i
              class="bx text-base"
              :class="
                follower.isAuthFollow ? 'bxs-user-minus' : 'bxs-user-plus'
              "
            ></i>
            <span class="ml-2 mr-1">{{
              follower.isAuthFollow
                ? $t('userListItem.unfollow')
                : $t('userListItem.follow')
            }}</span>
          </vs-button>
        </div>
      </li>
      <client-only>
        <infinite-loading
          v-if="
            type === 'followers' ? !followersEnoughState : !followingEnoughState
          "
          spinner="spiral"
          :identifier="user.id + '-' + type"
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
  name: 'UserListItem',
  props: {
    followers: null,
    type: '',
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
      followersEnoughState: (state) => state.profile.followersEnough,
      followingEnoughState: (state) => state.profile.followingEnough,
    }),
  },
  methods: {
    ...mapActions({
      followersFollow: 'profile/followFromFollower',
      FollowingFollow: 'profile/followFromFollowing',
    }),
    followAction(username) {
      if (this.type === 'followers') {
        this.followersFollow(username)
      } else {
        this.FollowingFollow(username)
      }
    },
    async infiniteHandler($state) {
      this.$emit('load', $state)
    },
  },
}
</script>
