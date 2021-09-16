<template>
  <vs-dialog width="500px" not-center v-model="composer">
    <template #header>
      <h4 class="not-margin">A penny for your <b>thoughts</b></h4>
    </template>

    <div class="relative">
      <textarea
        class="w-full px-3 py-2 text-gray-700 dark:text-gray-300 dark:bg-content-bg border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none"
        v-model="text"
        placeholder="What do you think?"
        rows="4"
      ></textarea>

      <emoji-picker :search="emojiSearch">
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
            class="absolute z-10 border-none w-64 h-96 overflow-scroll p-4 rounded bg-white dark:bg-content-bg shadow-xl top-0.5 -r-64"
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

    <template #footer>
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
            <p id="job" class="text-gray-800 dark:text-gray-400 text-xs mt-2">
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

      <quoted-post v-if="quote" :post="quote" />

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
        <div class="flex items-center">
          <vs-button @click.stop="toggleComposer(false)" danger transparent>
            Cancel
          </vs-button>
          <vs-button
            @click.stop="sendNewPost()"
            :loading="shareLoading"
            :disabled="text == '' && youtubeURL == '' && photos.length == 0"
          >
            Share
          </vs-button>
        </div>
      </div>
    </template>
  </vs-dialog>
</template>

<script>
import axios from 'axios'
import { mapState, mapActions } from 'vuex'
import EmojiPicker from 'vue-emoji-picker'
import QuotedPost from './QuotedPost.vue'
export default {
  components: {
    EmojiPicker,
    QuotedPost,
  },
  computed: {
    ...mapState({
      alert: (state) => state.alert,
      shareLoading: (state) => state.posts.shareLoading,
      composerStore: (state) => state.posts.composer,
      quote: (state) => state.posts.quotedPost,
    }),
    composer: {
      get() {
        return this.composerStore
      },
      set(value) {
        this.toggleComposer(value)
      },
    },
  },
  data() {
    return {
      emojiSearch: '',
      text: '',
      postLoading: null,
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
      newPost: 'posts/newPost',
      toggleComposer: 'posts/toggleComposer',
      toggleShareLoading: 'posts/toggleShareLoading',
    }),
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

    async sendNewPost() {
      const self = this
      if (this.photos.length > 0) {
        this.toggleShareLoading(true)
        const payload = {
          text: this.text,
          image: await this.convertImages(),
        }
        if (this.quote) {
          payload['quoteId'] = this.quote.id
        }
        setTimeout(function () {
          self.newPost(payload).then(() => {
            self.toggleComposer(false)
          })
        }, 2000)
      } else {
        const payload = {
          text: this.text,
          video: this.getYoutubeID(this.youtubeURL),
        }
        if (this.quote) {
          payload['quoteId'] = this.quote.id
        }
        this.newPost(payload).then(() => {
          this.toggleComposer(false)
        })
      }
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

<style lang="scss"></style>
