<template>
  <div class="app center content-inputs">
    <Logo />
    <vs-input color="#6e00ff" v-model="username" placeholder="Username">
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
    <div class="flex">
      <vs-checkbox v-model="remember">Remember me</vs-checkbox>
      <a href="#">Forgot Password?</a>
    </div>
    <vs-button>
      Login
      <template #animate>
        <i class="bx bx-home-alt"></i>
      </template>
    </vs-button>
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
  }),
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
<style lang="scss">
.flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
