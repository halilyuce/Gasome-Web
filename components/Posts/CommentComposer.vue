<template>
  <div
    v-if="user && post"
    class="flex flex-row px-5 pt-4 pb-2 border-b border-gray-200 dark:border-gray-700"
  >
    <!-- AVATAR  -->
    <div class="mr-4">
      <n-link :to="`/u/${user.username}`">
        <vs-avatar size="50">
          <img :src="`${smallAvatar + user.avatar}.jpg`" alt="Avatar" />
        </vs-avatar>
      </n-link>
    </div>

    <!-- TEXTAREA  -->
    <div class="flex flex-col w-full">
      <transition name="list">
        <div class="flex flex-row text-sm mb-2" v-show="isFocused">
          <span class="text-gray-700 dark:text-gray-300">Replying to</span>
          <n-link
            class="text-purple-500 ml-1"
            :to="`/u/${post.user.username}`"
            >{{ '@' + post.user.username }}</n-link
          >
        </div>
      </transition>

      <!-- TEXTAREA FORM  -->
      <div class="relative">
        <textarea
          class="w-full px-3 py-2 text-gray-700 dark:text-gray-300 dark:bg-content-bg border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none"
          v-model="text"
          placeholder="Share your thoughts about this post"
          :rows="isFocused ? 4 : 2"
          @focusin="onFocus(true)"
        ></textarea>

        <emoji-picker v-if="isFocused" :search="emojiSearch">
          <vs-button
            shadow
            size="small"
            slot="emoji-invoker"
            slot-scope="{ events: { click: clickEvent } }"
            @click.stop="clickEvent"
            class="absolute-important top-0.5 right-0"
          >
            <i class="bx bx-smile text-xl"></i>
          </vs-button>

          <div slot="emoji-picker" slot-scope="{ emojis }">
            <div
              class="absolute z-10 border-none w-64 h-96 overflow-scroll p-4 rounded bg-white dark:bg-content-bg shadow-xl top-0.5 right-14"
            >
              <div class="flex">
                <input
                  class="rounded-full dark:bg-content-bg dark:text-gray-400 border dark:border-gray-600 border-gray-300 py-2 px-4 outline-none focus:shadow-outline w-full"
                  type="text"
                  placeholder="Start to type emoji name"
                  v-model="emojiSearch"
                  v-focus
                />
              </div>
              <div>
                <div v-for="(emojiGroup, category) in emojis" :key="category">
                  <h5
                    class="text-grey-darker uppercase text-sm cursor-default mb-2 mt-4"
                  >
                    {{ category }}
                  </h5>
                  <div class="flex flex-wrap justify-between emojis">
                    <button
                      class="p-1 cursor-pointer rounded bg-white dark:bg-content-bg focus:outline-none focus:shadow-outline text-xl flex items-center justify-center h-8 w-8"
                      v-for="(emoji, emojiName) in emojiGroup"
                      :key="emojiName"
                      @click="append(emoji)"
                      :title="emojiName"
                    >
                      {{ emoji }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </emoji-picker>
      </div>

      <!-- COMMENT ACTIONS  -->
      <transition name="list">
        <div v-show="isFocused">
          <input
            type="file"
            ref="photo_upload"
            multiple
            @change="onFileChange"
            hidden
          />
          <div v-if="photos" class="grid grid-cols-4 gap-2">
            <div v-for="(photo, index) in photos" :key="index" class="relative">
              <img
                class="h-20 w-full rounded object-cover border dark:border-gray-700 border-gray-300 mb-3"
                :src="photo.url"
              />
              <button
                class="absolute bg-gray-900 hover:bg-red-600 text-white font-bold text-lg h-6 w-6 rounded-full top-1 right-1"
                @click.stop="removePhoto(index)"
              >
                <i class="bx bx-x"></i>
              </button>
            </div>
          </div>

          <vs-input
            v-if="showYoutube"
            shadow
            danger
            :loading="youtubeLoad"
            type="url"
            v-model="youtubeURL"
            placeholder="Youtube URL"
            class="mb-3"
          >
            <template #icon>
              <i class="bx bxl-youtube"></i>
            </template>
          </vs-input>

          <div
            class="max-w-2xl bg-white dark:bg-content-bg relative border border-gray-200 dark:border-gray-700 p-3 mb-3 rounded-md tracking-wide"
            v-if="youtubeVideo"
          >
            <div id="header" class="flex">
              <img
                class="h-20 rounded-md"
                :src="youtubeVideo.thumbnail_url"
                :alt="youtubeVideo.title"
              />
              <div id="body" class="flex flex-col ml-5">
                <h4 id="name" class="font-bold">
                  {{ youtubeVideo.title }}
                </h4>
                <p
                  id="job"
                  class="text-gray-800 dark:text-gray-400 text-xs mt-2"
                >
                  {{ youtubeVideo.author_name }}
                </p>
              </div>
            </div>

            <vs-button
              color="#ff3e4e"
              circle
              floating
              size="mini"
              class="absolute-important -top-2.5 -right-3"
              @click.stop="removeVideo"
            >
              <i class="bx bx-x py-1 text-base"></i>
            </vs-button>
          </div>

          <div class="flex justify-between">
            <div class="flex items-center">
              <vs-button
                @click.stop="$refs.photo_upload.click()"
                shadow
                active
                :disabled="photos.length > 3"
              >
                <i class="bx bx-image text-xl"></i>
              </vs-button>

              <vs-button
                @click.stop="showYoutube = !showYoutube"
                shadow
                active
                :loading="youtubeLoad"
              >
                <i class="bx bxl-youtube text-xl"></i>
              </vs-button>
            </div>
            <vs-button
              @click.stop="sendNewComment()"
              :loading="shareLoading"
              :disabled="text == '' && youtubeURL == '' && photos.length == 0"
            >
              Reply
            </vs-button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions, mapState } from 'vuex'
import EmojiPicker from 'vue-emoji-picker'
export default {
  props: { post: null },
  components: {
    EmojiPicker,
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      shareLoading: (state) => state.posts.shareLoading,
    }),
  },
  data() {
    return {
      isFocused: false,
      smallAvatar: process.env.AVATAR_SMALL,
      emojiSearch: '',
      text: '',
      photos: [],
      showYoutube: false,
      youtubeURL: '',
      youtubeLoad: false,
      youtubeVideo: null,
    }
  },
  watch: {
    youtubeURL(newVal, oldVal) {
      if (oldVal != newVal && !!newVal) {
        this.getYoutubeVideo(newVal)
      }
    },
  },

  methods: {
    ...mapActions({
      clearAlert: 'alert/clear',
      newComment: 'posts/newComment',
      toggleShareLoading: 'posts/toggleShareLoading',
    }),
    onFocus(val) {
      this.isFocused = val
    },
    onFileChange(e) {
      if (
        e.target.files.length > 0 &&
        this.photos.length + e.target.files.length < 5
      ) {
        e.target.files.forEach((element, index) => {
          this.photos.push({ url: URL.createObjectURL(element), file: element })
        })
      } else if (this.photos.length + e.target.files.length > 4) {
        this.$vs.notification({
          flat: true,
          color: 'warn',
          icon: `<i class='bx bx-error' ></i>`,
          position: 'top-center',
          title: 'Maximum number exceeded',
          text: 'Please select maximum 4 photos at the same time.',
        })
      }
    },
    append(emoji) {
      this.text += emoji
    },
    removePhoto(index) {
      this.photos = this.photos.filter((item) => item != this.photos[index])
    },
    removeVideo() {
      this.youtubeURL = ''
      this.youtubeVideo = null
    },
    async getYoutubeVideo(url) {
      this.youtubeLoad = true
      const instance = axios.create()
      try {
        const res = await instance.get(
          `https://youtube.com/oembed?url=${url}&format=json`
        )
        this.youtubeVideo = res.data

        this.youtubeLoad = false
      } catch (error) {
        this.youtubeLoad = false
      }
    },

    async convertImages() {
      const encodedImages = []
      await this.photos.forEach((element, index) => {
        const reader = new FileReader()
        let file = element.file

        reader.onloadend = () => {
          encodedImages.push(btoa(reader.result))
        }
        reader.readAsDataURL(file)
      })
      return encodedImages
    },

    getYoutubeID(url) {
      var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
      var match = url.match(regExp)
      if (match && match[2].length == 11) {
        return match[2]
      } else {
        return null
      }
    },

    resetInputs() {
      this.text = ''
      this.photos = []
      this.showYoutube = false
      this.youtubeURL = ''
      this.youtubeLoad = false
      this.youtubeVideo = null
      this.isFocused = false
    },

    async sendNewComment() {
      const self = this
      if (this.photos.length > 0) {
        this.toggleShareLoading(true)
        const payload = {
          text: this.text,
          image: await this.convertImages(),
        }
        if (this.post) {
          payload['parentId'] = this.post.id
        }
        setTimeout(function () {
          self.newComment(payload).then(function () {
            self.resetInputs()
          })
        }, 2000)
      } else {
        const payload = {
          text: this.text,
          video: this.getYoutubeID(this.youtubeURL),
        }
        if (this.post) {
          payload['parentId'] = this.post.id
        }
        this.newComment(payload).then(function () {
          self.resetInputs()
        })
      }
    },
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus()
      },
    },
  },
}
</script>

<style lang="scss">
.list-enter,
.list-leave-to {
  visibility: hidden;
  height: 0;
  margin: 0;
  padding: 0;
  opacity: 0;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s;
}
</style>
