<template>
  <div
    class="bg-gray-100 dark:bg-content-bg dark:text-white grid grid-cols-12 gap-4"
  >
    <div class="col-span-1 flex h-full">
      <sidebar class="hidden md:flex fixed" />
    </div>
    <Nuxt class="col-span-12 md:col-span-11 p-3" />
  </div>
</template>

<script>
import Sidebar from "~/components/Layout/Sidebar";
export default {
  name: "game",
  components: { Sidebar },
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
