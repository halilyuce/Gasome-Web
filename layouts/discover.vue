<template>
  <div>
    <div
      class="
        sticky
        top-0
        z-20
        items-center
        flex
        bg-white
        dark:bg-black
        lg:hidden
        justify-between
        px-5
        py-1
        border-b border-gray-100
        dark:border-gray-600 dark:border-opacity-20
      "
    >
      <n-link :to="`/u/${loggedInUser.username}`">
        <vs-avatar size="34">
          <img
            v-if="loggedInUser"
            :src="`${smallAvatar + loggedInUser.avatar}.jpg`"
            alt="Avatar"
          />
        </vs-avatar>
      </n-link>
      <Logo />
      <vs-button icon flat @click="openComposer()">
        <i class="bx bx-edit"></i>
      </vs-button>
    </div>
    <div
      class="
        bg-gray-100
        mb-14
        lg:mb-0
        dark:bg-content-bg dark:text-white
        grid grid-cols-10
        min-h-screen
      "
    >
      <Sidebar class="hidden lg:flex" />
      <Menubar class="flex lg:hidden" />
      <Nuxt class="col-span-12 lg:col-span-6" />
      <RightSidebar class="hidden lg:flex col-span-3" />
    </div>
    <PostComposer />
  </div>
</template>

<script>
import Sidebar from '../components/Layout/Sidebar.vue'
import RightSidebar from '../components/Layout/RightSidebar.vue'
import Menubar from '@/components/Layout/Menubar'
import Logo from '@/components/Logo.vue'
import PostComposer from '@/components/Posts/PostComposer.vue'
import { mapGetters, mapState, mapActions } from 'vuex'
export default {
  name: 'Discover',
  components: { Sidebar, RightSidebar, Menubar, Logo, PostComposer },
  data() {
    return {
      smallAvatar: process.env.AVATAR_SMALL,
    }
  },
  computed: {
    ...mapGetters(['loggedInUser']),
    ...mapState({
      quotedPostState: (state) => state.posts.quotedPost,
    }),
    quotedPost: {
      get() {
        return this.quotedPostState
      },
      set(value) {
        this.setQuotedPost(value)
      },
    },
  },
  mounted() {
    this.$vs.setColor('primary', '#7850ff')
    this.$store.dispatch(`getSettings`)
    const mode = localStorage.getItem('mode')
    if (mode && mode === 'light') {
      this.$vs.setTheme('light')
    } else {
      this.$vs.setTheme('dark')
    }
    this.getBadges()
    this.$echo
      .private(`messages.${this.loggedInUser.id}`)
      .listen('NewMessage', (e) => {
        if (this.$route.name !== 'messages') {
          this.setMessageBadge(1)
          this.$vs.notification({
            duration: 10000,
            progress: 'auto',
            icon: `<img class='rounded-lg h-8 w-8' src='${
              this.smallAvatar + e.message.user.avatar
            }.jpg' />`,
            title: e.message.image
              ? e.message.user.name + ' sent a photo'
              : e.message.user.name + ' sent a message',
            text: e.message.text,
          })
        }
      })
    if (this.$route.name !== 'notifications') {
      this.setNotificationBadge(0)
    }
  },
  methods: {
    ...mapActions({
      toggleComposer: 'posts/toggleComposer',
      setQuotedPost: 'posts/setQuotedPost',
      getBadges: 'getBadges',
      setMessageBadge: 'setMessageBadge',
      setNotificationBadge: 'setNotificationBadge',
    }),

    openComposer() {
      this.quotedPost = null
      this.toggleComposer(true)
    },
  },
}
</script>

<style scoped></style>
