<template>
  <ul
    class="divide-y divide-gray-100 dark:divide-gray-600 dark:divide-opacity-20 divide-solid mt-2 border-t border-gray-100 dark:border-gray-600 dark:border-opacity-20"
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
          <vs-avatar size="50">
            <img
              :src="`${smallAvatar + post.quoted_post[0].user.avatar}.jpg`"
              alt="Avatar"
            />
          </vs-avatar>
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
            <p class="dark:text-gray-300" v-html="post.quoted_post[0].text" />
            <div
              class="aspect-w-16 aspect-h-9 mt-2"
              v-if="
                post.quoted_post[0].image &&
                post.quoted_post[0].image.length > 0
              "
            >
              <img
                :src="`${
                  mediumImagePath + post.quoted_post[0].image[0].image
                }.jpg`"
                class="rounded-xl object-cover"
                alt=""
              />
            </div>

            <div
              class="relative mt-2 aspect-w-16 aspect-h-9"
              v-if="post.quoted_post[0].video"
            >
              <div
                class="absolute w-full h-full flex justify-center items-center"
              >
                <vs-button
                  color="#ff3e4e"
                  size="xl"
                  circle
                  floating
                  @click.stop=""
                >
                  <i class="bx bx-play text-xl"></i>
                </vs-button>
              </div>
              <img
                class="rounded-xl object-cover"
                :src="
                  'https://img.youtube.com/vi/' +
                  post.quoted_post[0].video +
                  '/0.jpg'
                "
                :alt="post.quoted_post[0].video"
              />
            </div>

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
            <div
              class="flex items-center"
              :class="{
                'text-purple-600': post.quoted_post[0].is_boosted_count,
              }"
            >
              <i class="bx bxs-zap text-lg mr-3"></i
              >{{ post.quoted_post[0].boosts_count }}
            </div>
            <div
              class="flex items-center"
              :class="{
                'text-yellow-500': post.quoted_post[0].is_favorited_count,
              }"
            >
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
          <vs-avatar size="50">
            <img :src="`${smallAvatar + post.user.avatar}.jpg`" alt="Avatar" />
          </vs-avatar>
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
            <p class="dark:text-gray-300" v-html="post.text" />
            <div
              v-if="post.image && post.image.length > 0"
              class="aspect-w-16 aspect-h-9 mt-2"
            >
              <img
                :src="`${mediumImagePath + post.image[0].image}.jpg`"
                class="rounded-xl object-cover"
                alt=""
              />
            </div>

            <div class="relative mt-2 aspect-w-16 aspect-h-9" v-if="post.video">
              <div
                class="absolute w-full h-full flex justify-center items-center"
              >
                <vs-button
                  color="#ff3e4e"
                  size="xl"
                  circle
                  floating
                  @click.stop=""
                >
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
            />
          </div>
          <div class="flex justify-between mt-3 text-gray-500">
            <div class="flex items-center">
              <i class="bx bx-message-square-detail text-lg mr-3"></i>
              {{ post.comments_count }}
            </div>
            <div
              class="flex items-center"
              :class="{
                'text-purple-600': post.is_boosted_count,
              }"
            >
              <i class="bx bxs-zap text-lg mr-3"></i>{{ post.boosts_count }}
            </div>
            <div
              class="flex items-center"
              :class="{ 'text-yellow-500': post.is_favorited_count }"
            >
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
