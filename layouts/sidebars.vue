<template>
  <div
    class="bg-white dark:bg-content-bg dark:text-white grid grid-cols-12 gap-0"
  >
    <div class="col-span-3 flex">
      <sidebar />
      <user-bar />
    </div>
    <Nuxt class="col-span-6" />
    <right-sidebar class="col-span-3" />
  </div>
</template>
<script>
import Sidebar from '../components/Layout/Sidebar.vue'
import RightSidebar from '../components/Layout/RightSidebar.vue'
import UserBar from '../components/Layout/UserBar.vue'
export default {
  name: 'sidebars',
  components: { Sidebar, RightSidebar, UserBar },
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
