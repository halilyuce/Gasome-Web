<template>
  <div class="container m-auto">
    <div class="grid grid-cols-6 lg:grid-cols-5 gap-4 min-h-screen">
      <div class="p-10 lg:p-20 my-auto col-span-6 md:col-span-3 lg:col-span-2">
        <div class="flex justify-start my-5">
          <Logo />
        </div>
        <div class="flex justify-between items-center">
          <n-link :to="'/register'">
            <vs-button shadow border animation-type="scale">
              <b class="mx-5">Sign Up</b>

              <template #animate>
                <i class="bx bxs-face"></i>
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
        <form v-on:submit.prevent="login">
          <vs-input
            :color="isDark ? '#6e00ff' : '#7850ff'"
            v-model="username"
            placeholder="Username or E-mail"
            class="my-5"
          >
            <template #icon>
              <i class="bx bx-at"></i>
            </template>
          </vs-input>
          <vs-input
            type="password"
            :color="isDark ? '#6e00ff' : '#7850ff'"
            v-model="password"
            placeholder="Password"
            :visiblePassword="hasVisiblePassword"
            icon-after
            @click-icon="hasVisiblePassword = !hasVisiblePassword"
          >
            <template #icon>
              <i v-if="!hasVisiblePassword" class="bx bx-show-alt"></i>
              <i v-else class="bx bx-hide"></i>
            </template>
          </vs-input>
          <div
            class="flex justify-between items-center text-sm my-3 text-gray-700"
          >
            <vs-checkbox v-model="remember">Remember me</vs-checkbox>
            <n-link :to="'/forgot-password'">Forgot Password?</n-link>
          </div>
          <vs-button
            block
            type="submit"
            size="large"
            animation-type="vertical"
            v-on:keyup.enter="login"
            :loading="loading"
          >
            <b>Sign In</b>
            <template #animate>
              <i class="bx bxs-game"></i>
            </template>
          </vs-button>
        </form>
        <div class="flex justify-center text-sm my-5">
          <span class="text-gray-700">New Here?</span>
          <n-link class="ml-3 text-purple-500 font-bold" :to="'/register'"
            >Create New Account</n-link
          >
        </div>
        <!-- <div class="my-5 separator">or continue with</div>
        <div class="grid grid-cols-3 gap-2">
          <vs-button shadow size="xl" animation-type="scale">
            <i class="bx bxl-google"></i>
            <template #animate> Google </template>
          </vs-button>
          <vs-button shadow size="xl" animation-type="scale">
            <i class="bx bxl-apple"></i>
            <template #animate> Apple </template>
          </vs-button>
          <vs-button shadow size="xl" animation-type="scale">
            <i class="bx bxl-facebook"></i>
            <template #animate> Facebook </template>
          </vs-button>
        </div> -->
      </div>
      <div class="col-span-3 hidden md:flex">
        <lottie :options="lottieOptions" v-on:animCreated="handleAnimation" />
      </div>
    </div>
  </div>
</template>
<script>
import Logo from '~/components/Logo.vue'
import lottie from 'vue-lottie/src/lottie.vue'
import * as animationData from '~/assets/lottie/login.json'
export default {
  components: {
    Logo,
    lottie,
  },
  data: () => ({
    username: '',
    password: '',
    remember: false,
    loading: false,
    hasVisiblePassword: false,
    isDark: false,
    anim: null,
    lottieOptions: { animationData: animationData.default },
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
  methods: {
    handleAnimation: function (anim) {
      this.anim = anim
    },
    async login() {
      this.loading = true
      const self = this
      const form = {
        username: this.username,
        password: this.password,
        grant_type: 'password',
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
      }

      await this.$auth
        .loginWith('local', { data: form })
        .then(function () {
          self.loading = false
        })
        .catch((err) => {
          self.loading = false
          self.$vs.notification({
            duration: 5000,
            progress: 'auto',
            flat: true,
            color: 'danger',
            icon: `<i class='bx bx-error' ></i>`,
            position: 'top-center',
            title: 'An Error Occured',
            text:
              'It seems your credentials are wrong, please check your username and password and try again.',
          })
        })
    },
  },
}
</script>
