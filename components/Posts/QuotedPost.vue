<template>
  <div
    class="flex flex-col border rounded-xl px-3 py-2 border-gray-300 dark:border-gray-700 mt-1"
  >
    <div class="flex justify-between">
      <div class="flex flex-row items-center">
        <vs-avatar size="20">
          <img :src="`${smallAvatar + post.user.avatar}.jpg`" alt="Avatar" />
        </vs-avatar>
        <h4 class="ml-2">{{ post.user.name }}</h4>
        <span class="text-gray-400 ml-1">{{ '@' + post.user.username }}</span>
      </div>
      <span class="text-gray-500 text-sm">{{
        $moment(post.created_at).fromNow(true)
      }}</span>
    </div>

    <p v-html="post.text" />
    <img
      v-if="post.image && post.image.length > 0"
      :src="`${mediumImagePath + post.image[0].image}.jpg`"
      class="mt-3 rounded-xl"
      alt=""
    />
  </div>
</template>
<script>
export default {
  props: {
    post: null,
  },
  data() {
    return {
      smallAvatar: process.env.AVATAR_SMALL,
      mediumImagePath: process.env.POSTIMAGE_MEDIUM,
    }
  },
}
</script>
