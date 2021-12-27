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
        grid grid-cols-7
      "
    >
      <div class="col-span-1 lg:col-span-2 flex">
        <Sidebar class="hidden lg:flex" />
        <Menubar class="flex lg:hidden" />
        <GameCard v-if="game" class="hidden lg:flex" :game="game" />
      </div>
      <Nuxt class="col-span-7 lg:col-span-3" />
      <RightSidebar class="hidden lg:flex col-span-2" />
    </div>
    <GameCommentModal />
  </div>
</template>

<script>
import Sidebar from '~/components/Layout/Sidebar'
import RightSidebar from '~/components/Layout/RightSidebar.vue'
import Menubar from '@/components/Layout/Menubar'
import Logo from '@/components/Logo.vue'
import GameCard from '~/components/Games/GameCard'
import GameCommentModal from '@/components/Games/GameCommentModal'
import { mapGetters, mapState, mapActions } from 'vuex'
export default {
  name: 'Game',
  components: {
    Sidebar,
    RightSidebar,
    Menubar,
    Logo,
    GameCommentModal,
    GameCard,
  },
  computed: {
    ...mapGetters(['loggedInUser']),
    ...mapState({
      quotedPostState: (state) => state.posts.quotedPost,
      game: (state) => state.game.game,
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
  data() {
    return {
      smallAvatar: process.env.AVATAR_SMALL,
    }
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
  },
  methods: {
    ...mapActions({
      toggleComposer: 'posts/toggleComposer',
      setQuotedPost: 'posts/setQuotedPost',
      getBadges: 'getBadges',
    }),

    openComposer() {
      this.quotedPost = null
      this.toggleComposer(true)
    },
  },
}
</script>
