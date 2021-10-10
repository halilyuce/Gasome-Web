<template>
  <div>
    <div
      class="
        flex
        items-center
        py-3
        px-5
        border-b border-gray-200
        dark:border-gray-700
      "
    >
      <vs-button
        active
        size="small"
        transparent
        @click="$router.push('/u/' + user.username)"
      >
        <i class="bx bxs-chevron-left text-xl"></i>
      </vs-button>
      <div class="flex flex-col ml-9">
        <h5>{{ user.name }}</h5>
        <span class="text-gray-400 text-sm mr-1">{{
          followers
            ? user.followers + ' ' + $t('followerHeader.follower')
            : user.follows + ' ' + $t('followerHeader.follow')
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: null,
    followers: true,
  },
}
</script>
