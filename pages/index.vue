<template>
  <div ref="target" class="bg-white dark:bg-black max-h-screen overflow-y-auto">
    <div class="my-5">
      <div class="flex justify-between items-center px-5">
        <vs-input
          color="#7d33ff"
          type="search"
          v-model="search"
          icon-after
          placeholder="Search A Game or User"
          class="mb-3 w-72"
        >
          <template #icon>
            <i class="bx bx-search"></i>
          </template>
        </vs-input>
        <vs-button :active="true" @click="showModal = true">
          <i class="bx bx-edit text-xl"></i>

          <template #animate>
            <span class="px-6">Post</span>
          </template>
        </vs-button>
      </div>
      <Posts
        class="relative"
        :class="{ 'h-screen': loading }"
        ref="posts"
        :posts="posts"
      />
    </div>
    <vs-dialog width="500px" not-center v-model="showModal">
      <template #header>
        <h4 class="not-margin">A penny for your <b>thoughts</b></h4>
      </template>

      <div class="con-content relative">
        <textarea
          class="w-full px-3 py-2 text-gray-700 dark:bg-content-bg border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none"
          v-model="text"
          placeholder="What do you think?"
          rows="4"
        ></textarea>

        <emoji-picker :search="emojiSearch">
          <vs-button
            shadow
            slot="emoji-invoker"
            slot-scope="{ events: { click: clickEvent } }"
            @click.stop="clickEvent"
            class="absolute-important top-0.5 right-0"
          >
            <i class="bx bx-smile text-xl"></i>
          </vs-button>

          <div slot="emoji-picker" slot-scope="{ emojis }">
            <div
              class="absolute z-10 border-none w-64 h-96 overflow-scroll p-4 rounded bg-white shadow-xl top-0.5 -r-64"
            >
              <div class="flex">
                <input
                  class="rounded-full border border-gray-300 py-2 px-4 outline-none focus:shadow-outline w-full"
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
                      class="p-1 cursor-pointer rounded bg-white focus:outline-none focus:shadow-outline text-xl flex items-center justify-center h-8 w-8"
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
          class="max-w-2xl bg-white relative border border-gray-200 p-3 mb-3 rounded-md tracking-wide"
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
              <p id="job" class="text-gray-800 text-xs mt-2">
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
            <vs-button shadow active>
              <i class="bx bx-image text-xl"></i>
            </vs-button>
            <vs-button
              @click="showYoutube = !showYoutube"
              shadow
              active
              :loading="youtubeLoad"
            >
              <i class="bx bxl-youtube text-xl"></i>
            </vs-button>
          </div>
          <div class="flex items-center">
            <vs-button @click="showModal = false" danger transparent>
              Cancel
            </vs-button>
            <vs-button
              @click="sendNewPost()"
              :loading="shareLoading"
              :disabled="text == '' && youtubeURL == ''"
            >
              Share
            </vs-button>
          </div>
        </div>
      </template>
    </vs-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState, mapActions } from 'vuex'
import Posts from '../components/Posts/Posts.vue'
import EmojiPicker from 'vue-emoji-picker'
export default {
  layout: 'sidebars',
  components: {
    Posts,
    EmojiPicker,
  },
  computed: {
    ...mapState({
      alert: (state) => state.alert,
      posts: (state) => state.posts.posts,
      loading: (state) => state.posts.loading,
      shareLoading: (state) => state.posts.shareLoading,
    }),
  },
  watch: {
    youtubeURL(newVal, oldVal) {
      if (oldVal != newVal && !!newVal) {
        this.getYoutubeVideo(newVal)
      }
    },
    loading(newVal, oldVal) {
      if (newVal != oldVal) {
        if (!newVal) {
          this.postLoading.close()
        } else {
          this.postLoading = this.$vs.loading({
            target: this.$refs.posts,
          })
        }
      }
    },
  },
  data() {
    return {
      search: '',
      emojiSearch: '',
      text: '',
      postLoading: null,
      showModal: false,
      showYoutube: false,
      youtubeURL: '',
      youtubeLoad: false,
      youtubeVideo: null,
    }
  },
  mounted() {
    this.getPosts()
  },
  methods: {
    ...mapActions({
      getPosts: 'posts/getPosts',
      clearAlert: 'alert/clear',
      newPost: 'posts/newPost',
    }),
    append(emoji) {
      this.text += emoji
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
    async sendNewPost() {
      const payload = {
        text: this.text,
        video: this.getYoutubeID(this.youtubeURL),
      }
      this.newPost(payload).then(() => {
        this.showModal = false
      })
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
<style lang="scss">
.con-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .vs-button__content {
    padding: 8px 20px;
  }

  ~ .vs-button {
    margin-left: 10px;
  }
}
.not-margin {
  margin: 0px;
  font-weight: normal;
  padding: 10px;
  padding-bottom: 0px;
}
.emoji-invoker {
  transition: all 0.2s;
}
.emoji-invoker:hover {
  transform: scale(1.1);
}

.emojis:after {
  content: '';
  flex: auto;
}

.absolute-important {
  position: absolute !important;
}

.t-4 {
  top: 1rem;
}
.-r-64 {
  right: -17.5rem;
}
</style>
