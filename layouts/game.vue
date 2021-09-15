<template>
  <div class="bg-gray-100 dark:bg-content-bg dark:text-white">
    <div class="flex h-full">
      <sidebar class="hidden md:flex fixed" />
    </div>
    <div class="grid grid-cols-12 gap-0 md:ml-20">
      <Nuxt class="col-span-12 lg:col-span-9 2xl:col-span-8 md:mr-6 lg:mr-0" />
      <right-sidebar class="hidden lg:flex lg:col-span-3 2xl:col-span-2" />
    </div>
  </div>
</template>

<script>
import Sidebar from '~/components/Layout/Sidebar'
import RightSidebar from '~/components/Layout/RightSidebar.vue'
export default {
  name: 'game',
  components: { Sidebar, RightSidebar },
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
