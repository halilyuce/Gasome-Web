<template>
  <div
    class="bg-gray-100 dark:bg-content-bg dark:text-white grid grid-cols-12 gap-0"
  >
    <div class="col-span-1 lg:col-span-4 xl:col-span-3 2xl:col-span-4 flex">
      <sidebar class="hidden lg:flex" />
      <Menubar class="flex lg:hidden" />
      <user-bar class="hidden lg:flex" />
    </div>
    <Nuxt class="col-span-12 md:col-span-7 lg:col-span-5 2xl:col-span-4" />
    <right-sidebar
      class="hidden md:flex md:col-span-4 lg:col-span-3 2xl:col-span-2"
    />
  </div>
</template>
<script>
import Sidebar from '../components/Layout/Sidebar.vue'
import RightSidebar from '../components/Layout/RightSidebar.vue'
import UserBar from '../components/Layout/UserBar.vue'
import Menubar from "@/components/Layout/Menubar";
import {mapGetters} from "vuex";
export default {
  name: 'sidebars',
  components: { Sidebar, RightSidebar, UserBar, Menubar },
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
}
</script>
