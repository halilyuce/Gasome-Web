<template>
  <div class="container m-auto min-h-screen">
    <div class="grid grid-cols-3 gap-4">
      <div></div>
      <div class="mt-10">
        <div class="flex justify-between items-center">
          <vs-button shadow size="large" :active="true" animation-type="scale">
            <b class="mx-5 text-gray-500">Sign Up</b>

            <template #animate> <i class="bx bxs-game"></i> </template>
          </vs-button>
          <vs-switch v-model="isDark">
            <template #circle>
              <i v-if="!isDark" class="bx bxs-moon"></i>
              <i v-else class="bx bxs-sun"></i>
            </template>
          </vs-switch>
        </div>
        <vs-input
          color="#6e00ff"
          v-model="username"
          placeholder="Username"
          class="my-5"
        >
          <template #icon>
            <i class="bx bx-user"></i>
          </template>
        </vs-input>
        <vs-input
          type="password"
          color="#6e00ff"
          v-model="password"
          placeholder="Password"
          :progress="getProgress"
          :visiblePassword="hasVisiblePassword"
          icon-after
          @click-icon="hasVisiblePassword = !hasVisiblePassword"
        >
          <template #icon>
            <i v-if="!hasVisiblePassword" class="bx bx-show-alt"></i>
            <i v-else class="bx bx-hide"></i>
          </template>

          <template v-if="getProgress >= 100" #message-success>
            Secure password
          </template>
        </vs-input>
        <div
          class="flex justify-between items-center text-sm my-3 text-gray-700"
        >
          <vs-checkbox v-model="remember">Remember me</vs-checkbox>
          <a href="#">Forgot Password?</a>
        </div>
        <vs-button block size="large" animation-type="vertical">
          <b>Sign In</b>
          <template #animate>
            <i class="bx bxs-game"></i>
          </template>
        </vs-button>
        <div class="flex justify-center text-sm my-5">
          <span class="text-gray-700">New Here?</span>
          <a class="ml-3 text-purple-600 font-bold" href="#"
            >Create New Account</a
          >
        </div>
        <div class="my-5 separator">or continue with</div>
        <div class="grid grid-cols-3 gap-8">
          <vs-button
            shadow
            border
            color="#a0aec0"
            size="xl"
            animation-type="scale"
          >
            <i class="bx bxl-google"></i>
            <template #animate> Google </template>
          </vs-button>
          <vs-button
            shadow
            color="#a0aec0"
            border
            size="xl"
            animation-type="scale"
          >
            <i class="bx bxl-apple"></i>
            <template #animate> Apple </template>
          </vs-button>
          <vs-button
            border
            color="#a0aec0"
            shadow
            size="xl"
            animation-type="scale"
          >
            <i class="bx bxl-facebook"></i>
            <template #animate> Facebook </template>
          </vs-button>
        </div>
      </div>
      <div></div>
    </div>
  </div>
</template>
<script>
import Logo from '~/components/Logo.vue'
export default {
  components: {
    Logo,
  },
  data: () => ({
    username: '',
    password: '',
    remember: false,
    hasVisiblePassword: false,
    isDark: false,
  }),
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
  computed: {
    getProgress() {
      let progress = 0

      // at least one number

      if (/\d/.test(this.password)) {
        progress += 20
      }

      // at least one capital letter

      if (/(.*[A-Z].*)/.test(this.password)) {
        progress += 20
      }

      // at menons a lowercase

      if (/(.*[a-z].*)/.test(this.password)) {
        progress += 20
      }

      // more than 5 digits

      if (this.password.length >= 6) {
        progress += 20
      }

      // at least one special character

      if (/[^A-Za-z0-9]/.test(this.password)) {
        progress += 20
      }

      return progress
    },
  },
}
</script>
