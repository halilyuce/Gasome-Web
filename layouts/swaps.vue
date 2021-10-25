<template>
  <div class="max-h-screen lg:max-h-full">
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
      <vs-button icon flat>
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
        gap-0
      "
    >
      <div class="col-span-7 lg:col-span-2 flex relative">
        <Sidebar class="hidden lg:flex" />
        <Menubar class="flex lg:hidden" />
        <SwapsBar />
      </div>
      <Nuxt class="col-span-7 lg:col-span-5" />
    </div>
  </div>
</template>
<script>
import Sidebar from '../components/Layout/Sidebar.vue'
import SwapsBar from '../components/Layout/SwapsBar.vue'
import Menubar from '@/components/Layout/Menubar'
import Logo from '@/components/Logo.vue'
import { mapGetters, mapState, mapActions } from 'vuex'
export default {
  name: 'Swaps',
  components: {
    Sidebar,
    SwapsBar,
    Menubar,
    Logo,
  },
  computed: {
    ...mapGetters(['loggedInUser']),
    ...mapState({
      quotedPostState: (state) => state.posts.quotedPost,
    }),
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
  },
  methods: {
    ...mapActions({
      toggleComposer: 'posts/toggleComposer',
    }),
  },
}
</script>
