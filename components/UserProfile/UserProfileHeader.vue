<template>
  <div class="User container">
    <div class="flex flex-row items-center">
      <vs-avatar circle size="100">
        <img :src="`${largeAvatar + user.avatar}.jpg`" alt="Avatar" />
      </vs-avatar>
    </div>
    <div>
      <h4 class="ml-2">{{ user.name }}</h4>
      <span class="text-gray-400 ml-1">{{ '@' + user.username }}</span>
    </div>
    <span class="text-gray-400 ml-1">{{ user.bio }}</span>
  </div>
</template>

<script>
export default {
  props: {
    user: null,
  },
  data() {
    return {
      largeAvatar: process.env.AVATAR_LARGE,
    }
  },
}
</script>

<style>
</style>