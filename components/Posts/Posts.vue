<template>
  <ul
    class="
      divide-y divide-gray-100
      dark:divide-gray-600 dark:divide-opacity-20
      divide-solid
      mt-2
      border-t border-gray-100
      dark:border-gray-600 dark:border-opacity-20
    "
  >
    <li v-for="post in posts" :key="post.id" class="pt-5 px-5 pb-2">
      <div
        v-if="post.only_boost"
        class="flex flex-row items-center text-gray-400 ml-10 mb-1"
      >
        <i class="bx bxs-zap mr-1"></i>
        <span>{{ post.user.name + ' ' + 'Boosted' }} </span>
      </div>
      <div v-if="post.only_boost" class="flex flex-row">
        <div class="user">
          <n-link :to="`/u/${post.quoted_post[0].user.username}`">
            <vs-avatar size="50">
              <img
                :src="`${smallAvatar + post.quoted_post[0].user.avatar}.jpg`"
                alt="Avatar"
              />
            </vs-avatar>
          </n-link>
        </div>
        <div class="ml-4 w-full">
          <div class="flex justify-between">
            <div class="flex flex-row items-center">
              <h4 class="">{{ post.quoted_post[0].user.name }}</h4>
              <span class="text-gray-400 ml-1">{{
                '@' + post.quoted_post[0].user.username
              }}</span>
            </div>
            <span class="text-gray-500 text-sm">
              {{ $moment(post.quoted_post[0].created_at).fromNow(true) }}</span
            >
          </div>
          <div>
            <p v-html="post.quoted_post[0].text" />
            <img
              v-if="
                post.quoted_post[0].image &&
                post.quoted_post[0].image.length > 0
              "
              :src="`${
                mediumImagePath + post.quoted_post[0].image[0].image
              }.jpg`"
              class="mt-3 rounded-xl"
              alt=""
            />
            <quoted-post
              v-if="
                post.quoted_post[0].quoted_post &&
                post.quoted_post[0].quoted_post.length > 0
              "
              :post="post.quoted_post[0].quoted_post[0]"
            />
          </div>
          <div class="flex justify-between mt-3 text-gray-500">
            <div class="flex items-center">
              <i class="bx bx-message-square-detail text-lg mr-3"></i>
              {{ post.quoted_post[0].comments_count }}
            </div>
            <div class="flex items-center">
              <i class="bx bxs-zap text-lg mr-3"></i
              >{{ post.quoted_post[0].boosts_count }}
            </div>
            <div class="flex items-center text-yellow-500">
              <i class="bx bxs-star text-lg mr-3"></i
              >{{ post.quoted_post[0].likes_count }}
            </div>
            <div class="flex items-center">
              <i class="bx bx-share-alt text-lg"></i>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="flex flex-row">
        <div class="user">
          <n-link :to="`/u/${post.user.username}`">
            <vs-avatar size="50">
              <img
                :src="`${smallAvatar + post.user.avatar}.jpg`"
                alt="Avatar"
              />
            </vs-avatar>
          </n-link>
        </div>
        <div class="ml-4 w-full">
          <div class="flex justify-between">
            <div class="flex flex-row items-center">
              <h4 class="">{{ post.user.name }}</h4>
              <span class="text-gray-400 ml-1">{{
                '@' + post.user.username
              }}</span>
            </div>
            <span class="text-gray-500 text-sm">
              {{ $moment(post.created_at).fromNow(true) }}</span
            >
          </div>
          <div>
            <p v-html="post.text" />
            <img
              v-if="post.image && post.image.length > 0"
              :src="`${mediumImagePath + post.image[0].image}.jpg`"
              class="mt-3 rounded-xl"
              alt=""
            />
            <quoted-post
              v-if="post.quoted_post && post.quoted_post.length > 0"
              :post="post.quoted_post[0]"
            />
          </div>
          <div class="flex justify-between mt-3 text-gray-500">
            <div class="flex items-center">
              <i class="bx bx-message-square-detail text-lg mr-3"></i>
              {{ post.comments_count }}
            </div>
            <div class="flex items-center">
              <i class="bx bxs-zap text-lg mr-3"></i>{{ post.boosts_count }}
            </div>
            <div class="flex items-center text-yellow-500">
              <i class="bx bxs-star text-lg mr-3"></i>{{ post.likes_count }}
            </div>
            <div class="flex items-center">
              <i class="bx bx-share-alt text-lg"></i>
            </div>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>
<script>
import QuotedPost from './QuotedPost.vue'
export default {
  components: { QuotedPost },
  props: {
    posts: null,
  },
  data() {
    return {
      smallAvatar: process.env.AVATAR_SMALL,
      mediumImagePath: process.env.POSTIMAGE_MEDIUM,
    }
  },
}
</script>
