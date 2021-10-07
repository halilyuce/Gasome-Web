<template>
  <div
    class="
      bg-gray-100
      mb-14
      lg:mb-0
      dark:bg-content-bg dark:text-white
      grid grid-cols-12
    "
  >
    <Sidebar class="hidden lg:flex" />
    <Menubar class="flex lg:hidden" />
    <Nuxt class="col-span-12 lg:col-span-8 xl:col-span-8 2xl:col-span-7" />
    <RightSidebar class="hidden lg:flex lg:col-span-3 2xl:col-span-2" />
  </div>
</template>

<script>
import Sidebar from '~/components/Layout/Sidebar'
import RightSidebar from '~/components/Layout/RightSidebar.vue'
import Menubar from '@/components/Layout/Menubar'
export default {
  name: 'Game',
  components: { Sidebar, RightSidebar, Menubar },
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
