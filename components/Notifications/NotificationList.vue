<template>
  <div class="grid grid-cols-5">
    <div
      class="flex flex-col"
      :class="notification.game ? 'col-span-4' : 'col-span-5'"
    >
      <div class="flex flex-row">
        <div class="mr-4">
          <n-link :to="`/u/${notification.sender.username}`">
            <vs-avatar badge :badge-color="badge()[0]" size="50">
              <img
                :src="`${smallAvatar + notification.sender.avatar}.jpg`"
                alt="Avatar"
              />
              <template #badge>
                <div class="py-1 px-0.5 flex">
                  <i
                    v-if="badge()[1] !== '@'"
                    class="text-white"
                    :class="badge()[1]"
                    style="font-size: 0.8rem"
                  ></i>
                  <span v-else class="text-white text-lg">@</span>
                </div>
              </template>
            </vs-avatar>
          </n-link>
        </div>
        <div class="flex flex-col text-gray-700 dark:text-gray-300 w-full">
          <span>
            <b
              class="cursor-pointer"
              @click="$router.push(`/u/${notification.sender.username}`)"
              >{{ notification.sender.name }}</b
            >
            {{ notification.message }}</span
          >

          <n-link
            v-if="notification.post"
            :to="`/p/${notification.post.id}`"
            class="mt-2"
          >
            <div
              class="
                flex flex-col
                text-sm
                border border-gray-200
                dark:border-gray-700
                rounded-lg
                p-2
              "
            >
              <n-link
                :to="`/u/${
                  notification.post.only_boost
                    ? notification.post.quote[0].user.username
                    : notification.post.user.username
                }`"
                class="flex items-center space-x-1"
              >
                <vs-avatar size="21">
                  <img
                    :src="
                      smallAvatar +
                      (notification.post.only_boost
                        ? notification.post.quote[0].user.avatar
                        : notification.post.user.avatar) +
                      '.jpg'
                    "
                    alt=""
                  />
                </vs-avatar>
                <span class="font-bold">{{
                  notification.post.only_boost
                    ? notification.post.quote[0].user.name
                    : notification.post.user.name
                }}</span>
                <span class="text-gray-400 text-xs">
                  @{{
                    notification.post.only_boost
                      ? notification.post.quote[0].user.username
                      : notification.post.user.username
                  }}
                </span>
              </n-link>
              <div
                v-if="notification.post.parent.length > 0"
                class="flex items-center space-x-2"
              >
                <span class="text-gray-400 mt-1">Response to</span>
                <n-link
                  :to="`/u/${notification.post.parent[0].user.username}`"
                  class="text-purple-500"
                >
                  @{{ notification.post.parent[0].user.username }}
                </n-link>
              </div>
              <span class="mt-1">{{
                notification.post.only_boost
                  ? notification.post.quote[0].text
                  : notification.post.text
              }}</span>
              <div
                v-if="
                  notification.post.quote.length > 0 &&
                  !notification.post.only_boost
                "
                class="flex items-center space-x-2 m-1"
              >
                <div
                  class="
                    flex flex-col
                    border border-gray-400
                    dark:border-gray-700
                    rounded-lg
                    p-2
                  "
                >
                  <n-link
                    :to="`/u/${notification.post.quote[0].user.username}`"
                    class="flex items-center space-x-2"
                  >
                    <vs-avatar size="30">
                      <img
                        :src="
                          smallAvatar +
                          notification.post.quote[0].user.avatar +
                          '.jpg'
                        "
                        alt=""
                      />
                    </vs-avatar>
                    <span class="text-lg font-bold">{{
                      notification.post.quote[0].user.name
                    }}</span>
                    <span class="text-gray-400">
                      @{{ notification.post.quote[0].user.username }}
                    </span>
                  </n-link>
                  <span>{{ notification.post.quote[0].text }}</span>
                </div>
              </div>
              <div
                v-if="
                  notification.post &&
                  notification.post.image &&
                  notification.post.image.length > 0
                "
                class="grid grid-cols-1 gap-2 auto-cols-max mt-2"
                :class="{ 'grid-cols-2': notification.post.image.length > 1 }"
              >
                <div
                  v-for="image in notification.post.image"
                  :key="image.id"
                  class="aspect-w-16 aspect-h-9 cursor-pointer"
                >
                  <img
                    :src="`${mediumImagePath + image.image}.jpg`"
                    class="rounded-xl object-cover"
                    alt=""
                  />
                </div>
              </div>

              <div
                v-if="
                  notification.post.only_boost
                    ? notification.post.quote[0].video
                    : notification.post.video
                "
                class="relative mt-2 aspect-w-16 aspect-h-9 cursor-pointer"
              >
                <div
                  class="
                    absolute
                    w-full
                    h-full
                    flex
                    justify-center
                    items-center
                  "
                >
                  <vs-button color="#ff3e4e" size="xl" circle floating>
                    <i class="bx bx-play text-xl"></i>
                  </vs-button>
                </div>
                <img
                  class="rounded-xl object-cover"
                  :src="
                    'https://img.youtube.com/vi/' +
                    (notification.post.only_boost
                      ? notification.post.quote[0].video
                      : notification.post.video) +
                    '/0.jpg'
                  "
                  :alt="
                    notification.post.only_boost
                      ? notification.post.quote[0].video
                      : notification.post.video
                  "
                />
              </div>
            </div>
          </n-link>
        </div>
      </div>
    </div>
    <n-link
      class="rounded-xl px-2"
      :to="'/g/' + notification.game.id"
      v-if="notification.game"
    >
      <img
        class="aspect-h-16 rounded-xl"
        :src="smallImagePath + notification.game.image + '.jpg'"
        :alt="notification.game.name"
      />
    </n-link>
  </div>
</template>

<script>
export default {
  name: 'NotificationList',
  props: {
    notification: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      smallAvatar: process.env.AVATAR_SMALL,
      smallImagePath: process.env.GAMECOVER_SMALL,
      mediumImagePath: process.env.POSTIMAGE_MEDIUM,
    }
  },
  mounted() {
    this.$vs.setColor('secondary', '#0a85fb')
  },
  methods: {
    badge() {
      const notfType = this.notification.type
      if (notfType === 1) {
        return ['warn', 'bx bxs-star']
      } else if (notfType === 2) {
        return ['primary', 'bx bxs-bolt']
      } else if (notfType === 3) {
        return ['secondary', 'bx bxs-message-dots']
      } else if (notfType === 4) {
        return ['primary', 'bx bxs-message-dots']
      } else if (notfType === 5) {
        return ['primary', 'bx bxs-hand-up']
      } else if (notfType === 6) {
        return ['secondary', 'bx bxs-user']
      } else if (notfType === 7) {
        return ['primary', 'bx bx-plus-medical']
      } else if (notfType === 11) {
        return ['primary', '@']
      }
    },
  },
  /*
 1=' gönderinizi favorilerine ekledi.',
2=' gönderinizi boostladı.',
3=' gönderinize yorum yaptı.',
4=' gönderinizi alıntıladı.',
5=' Takas isteğiniz var.',
6=' sizi takip etti.',
7=' İstediğiniz bir oyun takas listesine eklendi.'
   */
}
</script>

<style scoped></style>
