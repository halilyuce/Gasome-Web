<template>
  <div class="bg-white dark:bg-black dark:text-white">
    <Nuxt />
  </div>
</template>
<script>
export default {
  name: 'Blank',
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
