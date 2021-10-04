<template>
  <div
    class="
      bg-white
      dark:bg-black
      col-span-12
      md:col-span-8
      max-h-screen
      relative
      overflow-auto
    "
  >
    <CoolLightBox
      :items="showedImage"
      :index="index"
      :useZoomBar="true"
      :fullScreen="true"
      :closeOnClickOutsideMobile="true"
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
        :to="'/u/' + selected.user.username"
        v-if="selected"
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
      <div class="flex flex-row space-x-4">
        <vs-button icon color="#666" flat
          ><i class="bx bx-block"></i
        ></vs-button>
        <vs-button icon color="#666" flat
          ><i class="bx bx-trash"></i
        ></vs-button>
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
        class="flex flex-col my-1"
        v-for="message in messages"
        :key="message.id"
      >
        <div v-if="checkDate(message)" class="text-2xs my-3 strike">
          <span class="dark:text-gray-500 text-gray-400">{{
            $moment(message.created_at).format('ll')
          }}</span>
        </div>
        <div
          class="flex w-full text-sm"
          :class="
            message.from === loggedInUser.id ? 'justify-end' : 'justify-start'
          "
        >
          <span
            v-if="message.text"
            class="rounded-2xl max-w-lg px-5 py-2"
            :class="
              message.from === loggedInUser.id
                ? 'bg-purple-500 text-white'
                : 'bg-gray-100 dark:bg-content-bg'
            "
            >{{ message.text }}</span
          >
          <div
            v-if="message.image"
            @click="showImageViewer(message)"
            class="cursor-pointer"
            :class="message.from === loggedInUser.id ? 'ml-auto' : 'mr-auto'"
          >
            <img
              class="rounded-2xl object-cover"
              :src="`${smallMessageImage + message.image}.jpg`"
              alt="Message Image"
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
            v-model="message"
            ref="textarea"
            rows="1"
            @focus="resize"
            @keyup="resize"
            @paste.prevent="onPaste"
            placeholder="Type something..."
            :disabled="sendLoading"
          ></textarea>
        </div>

        <input type="file" ref="photo_upload" @change="onFileChange" hidden />

        <div class="flex flex-row space-x-2">
          <vs-button
            icon
            color="#666"
            transparent
            @click.stop="$refs.photo_upload.click()"
            ><i class="bx bx-images"></i
          ></vs-button>
          <vs-button icon floating :loading="sendLoading" @click="send"
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
      toggleLoading: 'messages/toggleMessagesLoading',
    }),
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
      this.sendMessage(formData)
        .then((data) => {
          self.image = null
          self.message = ''
          textarea.style.height = '35px'
        })
        .catch((err) => {
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
    },
    onFileChange(e) {
      this.image = e.target.files[0]
      this.send()
    },
    onPaste(e) {
      let file =
        e.clipboardData.items[e.clipboardData.items.length - 1].getAsFile()
      if (file) {
        this.image = file
        this.message = ''
        this.send()
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
</style>
