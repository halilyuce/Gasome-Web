<template>
  <div class="container m-auto">
    <div class="grid grid-cols-6 lg:grid-cols-5 gap-4 min-h-screen">
      <div class="p-10 lg:p-20 my-auto col-span-6 md:col-span-3 lg:col-span-2">
        <div class="flex justify-start my-5">
          <Logo />
        </div>
        <div class="flex justify-between items-center">
          <n-link :to="'/login'">
            <vs-button shadow border animation-type="scale">
              <b class="mx-5">Sign In</b>

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
        <form v-on:submit.prevent="registerUser">
          <vs-input
            :color="isDark ? '#6e00ff' : '#7850ff'"
            v-model="fullname"
            placeholder="Full Name"
            class="my-5"
          >
            <template #icon>
              <i class="bx bxs-face"></i>
            </template>
          </vs-input>
          <vs-input
            :color="isDark ? '#6e00ff' : '#7850ff'"
            v-model="username"
            placeholder="Username"
            class="my-5"
          >
            <template #icon>
              <i class="bx bx-at"></i>
            </template>
          </vs-input>
          <vs-input
            :color="isDark ? '#6e00ff' : '#7850ff'"
            v-model="email"
            placeholder="E-mail Adress"
            class="my-5"
          >
            <template #icon>
              <i class="bx bx-mail-send"></i>
            </template>
          </vs-input>
          <vs-input
            type="password"
            :color="isDark ? '#6e00ff' : '#7850ff'"
            v-model="password"
            class="my-5"
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
          <vs-button
            block
            size="large"
            animation-type="vertical"
            type="submit"
            :loading="registerLoading"
            v-on:keyup.enter="registerUser"
          >
            <b>Register</b>
            <template #animate>
              <i class="bx bxs-game"></i>
            </template>
          </vs-button>
        </form>
        <div class="flex justify-center text-sm my-5">
          <span class="text-gray-700">Already have an account?</span>
          <n-link :to="'/login'" class="ml-3 text-purple-500 font-bold"
            >Login</n-link
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
import { mapState, mapActions } from 'vuex'
import Logo from '~/components/Logo.vue'
import lottie from 'vue-lottie/src/lottie.vue'
import * as animationData from '~/assets/lottie/register.json'
export default {
  components: {
    Logo,
    lottie,
  },
  computed: {
    ...mapState({
      alert: (state) => state.alert,
      registerLoading: (state) => state.registerLoading,
    }),

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
  data: () => ({
    fullname: '',
    email: '',
    username: '',
    password: '',
    remember: false,
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
    ...mapActions({
      clearAlert: 'alert/clear',
      register: 'register',
    }),
    handleAnimation: function (anim) {
      this.anim = anim
    },
    async registerUser() {
      const self = this
      const form = {
        username: this.username,
        password: this.password,
        name: this.fullname,
        email: this.email,
      }

      this.register(form)
        .then(function (token) {
          self.$auth.setUserToken(token)
        })
        .catch(function () {
          self.$vs.notification({
            flat: true,
            color: 'danger',
            icon: `<i class='bx bx-error' ></i>`,
            position: 'bottom-center',
            title: 'Unable to register',
            text: 'Please check all fields and try again.',
          })
        })
    },
  },
}
</script>
