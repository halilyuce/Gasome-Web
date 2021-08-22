<template>
  <div
    class="flex flex-col border rounded-xl px-3 py-2 border-gray-200 dark:border-gray-700 mt-1"
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

    <div
      class="grid grid-cols-1 gap-2 auto-cols-max mt-2"
      :class="{ 'grid-cols-2': post.image.length > 1 }"
      v-if="post.image && post.image.length > 0"
    >
      <div
        class="aspect-w-16 aspect-h-9 cursor-pointer"
        v-for="(image, index) in post.image"
        :key="image.id"
        @click="
          showViewer({
            post: post,
            index: index,
          })
        "
      >
        <img
          :src="`${mediumImagePath + image.image}.jpg`"
          class="rounded-xl object-cover"
          alt=""
        />
      </div>
    </div>

    <div class="relative mt-2 aspect-w-16 aspect-h-9" v-if="post.video">
      <div class="absolute w-full h-full flex justify-center items-center">
        <vs-button color="#ff3e4e" size="xl" circle floating @click.stop="">
          <i class="bx bx-play text-xl"></i>
        </vs-button>
      </div>
      <img
        class="rounded-xl object-cover"
        :src="'https://img.youtube.com/vi/' + post.video + '/0.jpg'"
        :alt="post.video"
      />
    </div>

    <quoted-post
      v-if="post.quoted_post && post.quoted_post.length > 0"
      :post="post.quoted_post[0]"
      @show-viewer="showViewer"
    />
  </div>
</template>
<script>
export default {
  name: 'quoted-post',
  props: {
    post: null,
  },
  data() {
    return {
      smallAvatar: process.env.AVATAR_SMALL,
      mediumImagePath: process.env.POSTIMAGE_MEDIUM,
    }
  },
  methods: {
    async showViewer(payload) {
      this.$emit('show-viewer', payload)
    },
  },
}
</script>
