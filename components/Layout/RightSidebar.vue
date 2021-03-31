<template>
  <div class="m-5">
    <div class="flex justify-between items-center">
      <n-link :to="'/register'">
        <vs-button shadow border size="small" animation-type="scale">
          <b class="mx-5">Settings</b>

          <template #animate>
            <i class="bx bx-cog"></i>
          </template>
        </vs-button>
      </n-link>
      <vs-switch v-model="isDark">
        <template #circle>
          <i v-if="!isDark" class="bx bxs-moon"></i>
          <i v-else class="bx bxs-sun"></i>
        </template>
      </vs-switch>
    </div>
    <div class="bg-gray-50 dark:bg-black p-5 rounded-xl mt-3">
      <h3>Most Spoken</h3>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isDark: true,
    }
  },
  watch: {
    isDark(val) {
      if (val === true) {
        localStorage.setItem('mode', 'light')
        this.$vs.setTheme('light')
        this.$colorMode.preference = 'light'
      } else {
        localStorage.setItem('mode', 'dark')
        this.$vs.setTheme('dark')
        this.$colorMode.preference = 'dark'
      }
    },
  },
  mounted() {
    this.isDark = localStorage.getItem('mode') === 'light' ? true : false
  },
}
</script>
