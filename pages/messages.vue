<template>
  <div
    class="
      bg-white
      dark:bg-black
      col-span-12
      lg:col-span-8 lg:h-screen
      relative
      overflow-auto
    "
  >
    <CoolLightBox
      :items="showedImage"
      :index="index"
      :use-zoom-bar="true"
      :full-screen="true"
      :close-on-click-outside-mobile="true"
      @close="closeImageViewer()"
    />

    <!-- Breadcrumb -->

    <div
      class="
        flex
        items-center
        justify-between
        py-3
        px-5
        border-b border-gray-200
        dark:border-gray-700
      "
    >
      <n-link
        v-if="selected"
        :to="'/u/' + selected.user.username"
        class="flex flex-row items-center"
      >
        <vs-avatar size="38">
          <img
            :src="`${smallAvatar + selected.user.avatar}.jpg`"
            alt="Avatar"
          />
        </vs-avatar>
        <div class="flex flex-col ml-3">
          <h4>{{ selected.user.name }}</h4>
          <span class="text-gray-400 text-xs">{{
            '@' + selected.user.username
          }}</span>
        </div>
      </n-link>
      <div v-if="selected" class="flex flex-row space-x-3">
        <vs-button
          v-if="selected.user.twitch"
          @click.stop.prevent="
            openWindow('https://www.twitch.tv/' + selected.user.twitch)
          "
          icon
          flat
          ><i class="bx bxl-twitch"></i
        ></vs-button>
        <vs-button
          v-if="selected.user.weblink"
          @click.stop.prevent="openWindow(selected.user.weblink)"
          icon
          flat
        >
          <i class="bx bx-world"></i>
        </vs-button>
      </div>
    </div>

    <ul
      class="
        px-5
        pt-1
        py-24
        relative
        messagebox
        overflow-auto
        disable-scrollbars
      "
    >
      <client-only>
        <infinite-loading
          v-if="selected"
          spinner="spiral"
          :identifier="selected.id"
          direction="top"
          :distance="300"
          @infinite="infiniteHandler"
          ><span slot="no-results"></span><span slot="no-more"></span
        ></infinite-loading>
      </client-only>

      <li
        :id="`message-${message.id}`"
        class="flex flex-col my-1"
        v-for="message in messages"
        :key="message.id"
        :disabled="message.unique"
      >
        <div v-if="checkDate(message)" class="text-2xs my-3 strike">
          <span class="dark:text-gray-500 text-gray-400">{{
            $moment(message.created_at).format('ll')
          }}</span>
        </div>
        <div
          class="flex text-sm"
          :class="message.from === loggedInUser.id ? 'ml-auto' : 'mr-auto'"
        >
          <span
            v-if="message.text"
            class="rounded-2xl w-full max-w-sm px-5 py-2"
            :class="
              message.from === loggedInUser.id
                ? 'bg-purple-500 text-white'
                : 'bg-gray-100 dark:bg-content-bg'
            "
            >{{ message.text }}</span
          >
          <div
            v-if="message.image && !message.unique"
            class="cursor-pointer"
            :class="message.from === loggedInUser.id ? 'ml-auto' : 'mr-auto'"
            @click="showImageViewer(message)"
          >
            <img
              class="rounded-2xl object-cover"
              :src="`${smallMessageImage + message.image}.jpg`"
              alt="Message Image"
            />
          </div>
          <div
            v-if="message.image && message.unique"
            :class="message.from === loggedInUser.id ? 'ml-auto' : 'mr-auto'"
          >
            <img
              class="rounded-2xl w-32 shimmer object-cover"
              :src="localImage(message.image)"
              alt="Message Image"
              disabled
            />
          </div>
        </div>
        <span
          v-if="checkNext(message)"
          class="text-2xs dark:text-gray-500 text-gray-400 mt-1 mx-1"
          :class="{ 'ml-auto': message.from === loggedInUser.id }"
          >{{ $moment(message.created_at).format('hh:mm A') }}</span
        >
      </li>
    </ul>

    <div
      class="
        absolute
        bottom-0
        left-0
        p-5
        w-full
        bg-gradient-to-t
        from-white
        dark:from-content-bg
      "
    >
      <div
        class="
          flex
          justify-between
          items-center
          py-2
          px-3
          text-gray-400
          border border-white
          dark:border-gray-800
          text-sm
          bg-gray-50
          dark:bg-content-bg
          rounded-2xl
          shadow-2xl
        "
      >
        <div class="flex flex-row w-full items-center">
          <vs-avatar size="28">
            <img
              :src="`${smallAvatar + loggedInUser.avatar}.jpg`"
              alt="Avatar"
            />
          </vs-avatar>
          <textarea
            ref="textarea"
            v-model="message"
            class="
              w-full
              h-full
              ml-3
              px-3
              py-2
              text-gray-700
              dark:text-gray-300 dark:bg-black
              rounded-lg
              focus:outline-none
              resize-none
            "
            rows="1"
            placeholder="Type something..."
            :disabled="sendLoading"
            @focus="resize"
            @keyup="resize"
            @keydown.enter.exact.prevent="send"
            @paste.prevent="onPaste"
          ></textarea>
        </div>

        <input ref="photo_upload" type="file" hidden @change="onFileChange" />

        <div class="flex flex-row space-x-2">
          <vs-button
            icon
            color="#666"
            transparent
            @click.stop="$refs.photo_upload.click()"
            ><i class="bx bx-images"></i
          ></vs-button>
          <vs-button
            icon
            floating
            :loading="sendLoading"
            :disabled="!message"
            @click="send"
            ><i class="bx bxs-paper-plane"></i
          ></vs-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  layout: 'messages',
  computed: {
    ...mapGetters(['loggedInUser']),
    ...mapState({
      selected: (state) => state.messages.selected,
      messagesState: (state) => state.messages.messages,
      loading: (state) => state.messages.messagesLoading,
      sendLoading: (state) => state.messages.sendLoading,
      contacts: (state) => state.messages.contacts,
      socket: (state) => state.messages.socket,
    }),
    messages: {
      get() {
        return this.messagesState
      },
      set(value) {
        this.setMessages(value)
      },
    },
  },
  mounted() {
    if (!this.socket) {
      this.setSocket(true)
      this.$echo
        .private(`messages.${this.loggedInUser.id}`)
        .listen('NewMessage', (e) => {
          this.hanleIncoming(e.message)
        })
    }
  },
  watch: {
    selected(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$refs.textarea.focus()
      }
    },
  },
  data() {
    return {
      message: '',
      image: null,
      index: null,
      showedImage: [],
      smallAvatar: process.env.AVATAR_SMALL,
      smallMessageImage: process.env.MESSAGES_SMALL,
      largeMessageImage: process.env.MESSAGES_LARGE,
    }
  },
  async asyncData({ route, store }) {
    if (route.name === 'messages') {
      await store.dispatch('setTab', 'messages')
    }
    if (route.query.room) {
      await store.dispatch('messages/setQuery', route.query.room)
    }
  },
  methods: {
    ...mapActions({
      getMessages: 'messages/getMessages',
      setMessages: 'messages/setMessages',
      sendMessage: 'messages/sendMessage',
      removeMessage: 'messages/removeMessage',
      insertMessage: 'messages/insertMessage',
      messageFromAnother: 'messages/messageFromAnother',
      toggleLoading: 'messages/toggleMessagesLoading',
      setSocket: 'messages/setSocket',
    }),
    localImage(image) {
      return window && window.URL.createObjectURL(image)
    },
    openWindow(link) {
      if (link.includes('http')) {
        window && window.open(link, '_blank')
      } else {
        window && window.open('https://' + link, '_blank')
      }
    },
    resize() {
      const { textarea } = this.$refs
      if (this.message) {
        if (textarea.scrollHeight < 40) {
          textarea.style.height = '35px'
        } else if (textarea.scrollHeight > 40 && textarea.scrollHeight < 80) {
          textarea.style.height = textarea.scrollHeight + 'px'
        }
      } else {
        textarea.style.height = '35px'
      }
    },
    scrollToElement() {
      const last = this.messages[this.messages.length - 1].id
      const el = document.getElementById(`message-${last}`)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    },
    infiniteHandler($state) {
      const self = this
      this.getMessages(this.checkSender()).then((data) => {
        if (data.length > 9) {
          $state.loaded()
        } else {
          $state.complete()
        }
      })
    },
    async hanleIncoming(message) {
      const self = this
      if (this.selected && message.from == this.selected.user.id) {
        this.insertMessage(message).then(() => {
          self.scrollToElement()
        })
      } else {
        this.messageFromAnother(message)
      }
    },
    async send() {
      const self = this
      const { textarea } = this.$refs
      var formData = new FormData()
      formData.append('contact_id', this.checkSender())
      if (this.message) {
        formData.append('text', this.message)
      }
      if (this.image) {
        formData.append('image', this.image)
      }
      this.sendMessage(formData).catch((id) => {
        self.removeMessage(id)
        self.$vs.notification({
          duration: 5000,
          progress: 'auto',
          flat: true,
          color: 'danger',
          icon: `<i class='bx bxs-error' ></i>`,
          position: 'top-right',
          title: 'An error occured!',
          text: 'An error occurred while sending your message. Please try again.',
        })
      })
      setTimeout(() => {
        self.image = null
        self.message = ''
        textarea.style.height = '35px'
        self.scrollToElement()
        setTimeout(() => {
          self.$refs.textarea.focus()
        }, 500)
      }, 100)
    },
    onFileChange(e) {
      this.image = e.target.files[0]
      this.send()
    },
    onPaste(e) {
      let file =
        e.clipboardData.items[e.clipboardData.items.length - 1].getAsFile()
      let text = e.clipboardData.getData('text')
      if (file) {
        this.image = file
        this.message = ''
        this.send()
      }
      if (text) {
        this.message = text
      }
    },
    checkSender() {
      if (this.selected) {
        if (this.selected.to === this.loggedInUser.id) {
          return this.selected.from
        } else {
          return this.selected.to
        }
      } else {
        return null
      }
    },
    async showImageViewer(payload) {
      this.showedImage.push(`${this.largeMessageImage + payload.image}.jpg`)
      this.index = 0
    },
    async closeImageViewer() {
      this.showedImage = []
      this.index = null
    },
    checkNext(message) {
      const index = this.messages.findIndex((item) => item === message)
      if (
        index > -1 &&
        this.messages[index] !== this.messages[this.messages.length - 1]
      ) {
        if (this.messages[index + 1].from !== this.messages[index].from) {
          return true
        } else if (
          index > 0 &&
          !this.$moment(this.messages[index - 1].created_at).isSame(
            this.messages[index].created_at,
            'day'
          )
        ) {
          return true
        } else if (
          !this.$moment(this.messages[index + 1].created_at).isSame(
            this.messages[index].created_at,
            'day'
          )
        ) {
          return true
        }
      } else {
        return true
      }
      return false
    },
    checkDate(message) {
      const index = this.messages.findIndex((item) => item === message)
      if (index > -1) {
        if (
          index > 0 &&
          !this.$moment(this.messages[index - 1].created_at).isSame(
            this.messages[index].created_at,
            'day'
          )
        ) {
          return true
        }
      }
      return false
    },
  },
}
</script>

<style lang="scss">
.messagebox {
  height: calc(100vh - 1.5rem - 45px);
}
.shimmer {
  color: grey;
  display: inline-block;
  -webkit-mask: linear-gradient(60deg, #000 30%, #0005, #000 70%) right/300%
    100%;
  background-repeat: no-repeat;
  animation: shimmer 2.5s infinite;
  font-size: 50px;
  max-width: 200px;
}

@keyframes shimmer {
  100% {
    -webkit-mask-position: left;
  }
}
</style>
