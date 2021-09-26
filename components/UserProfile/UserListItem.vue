<template>
  <div
    class="
      flex flex-col
      rounded-xl
      border-gray-200
      dark:border-gray-700
      mt-1
    "
  >
    <li
      v-for="follower in followers"
      v-bind:key="follower.id"
      class="pt-4 px-5 pb-3 hover-bg"
    >
      <div class="flex justify-between">
        <div class="flex flex-row items-center">
          <vs-avatar size="40">
            <img :src="`${smallAvatar + follower.user.avatar}.jpg`" alt="Avatar" />
          </vs-avatar>
          <h4 class="ml-2">{{ follower.user.name }}</h4>
          <span class="text-gray-400 ml-1">{{ '@' + follower.user.username }}</span>
        </div>
      </div>
    </li>
  </div>
</template>
<script>
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
}
</script>
