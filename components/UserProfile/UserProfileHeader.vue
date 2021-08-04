<template>
  <div class="User container">
    <div class="flex-items-center">
      <div class="flex flex-row items-center mt-3">
        <vs-avatar circle size="100">
          <img :src="`${largeAvatar + user.avatar}.jpg`" alt="Avatar" />
        </vs-avatar>
        <div>
          <h4 class="ml-3">{{ user.name }}</h4>
          <span class="text-gray-400 m-3">{{ '@' + user.username }}</span>
        </div>
      </div>
    </div>
    <div class="mt-1">
      <span class="mt-3">{{ user.bio }}</span>
    </div>
    <div>
      <div style="float: left; width: 50%">
        <i class='bx bx-link'></i>
        <n-link :to="`${user.weblink}`">
          <span class="text-purple-500 mt-3">{{ user.weblink }}</span>
        </n-link>
      </div>
      <div style="float: right; width: 50%">
        <i class='bx bxs-cake'></i>
        <span class="text-gray-400 mt-3">{{
          $moment(user.birthday).format('LL')
        }}</span>
      </div>
    </div>
    <div>
      <div style="float: left; width: 100%">
        <i class='bx bx-log-in-circle'></i>
        <span class="text-gray-400 mt-3">{{
          $moment(user.created_at).format('LL')
        }}</span>
      </div>
    </div>
    <div>
      <div style="float: left; width: 25%">
        <div>
          <b
            ><span class="text-white-400 mt-3">{{ user.follows }}</span></b
          >
          <span class="text-gray-400 mt-3">{{ ' Following' }}</span>
        </div>
      </div>
      <div>
        <b
          ><span class="text-white-400 mt-3">{{ user.followers }}</span></b
        >
        <span class="text-gray-400 mt-3">{{ ' Followers' }}</span>
      </div>
    </div>
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