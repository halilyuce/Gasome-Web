<template>
  <div class="container m-auto">
    <div class="grid grid-cols-6 lg:grid-cols-5 gap-4 min-h-screen">
      <div class="p-10 lg:p-20 my-auto col-span-6 md:col-span-3 lg:col-span-2">
        <div class="flex justify-start my-5">
          <Logo />
        </div>
        <div class="flex justify-between items-center">
          <vs-button
            @click="$router.back()"
            shadow
            border
            animation-type="scale"
          >
            <b class="mx-5">Back</b>

            <template #animate>
              <i class="bx bxs-chevrons-left"></i>
            </template>
          </vs-button>
          <vs-switch v-model="isDark">
            <template #circle>
              <i v-if="!isDark" class="bx bxs-moon"></i>
              <i v-else class="bx bxs-sun"></i>
            </template>
          </vs-switch>
        </div>
        <form v-if="token" v-on:submit.prevent="changePassword">
          <vs-input
            type="password"
            :color="isDark ? '#6e00ff' : '#7850ff'"
            v-model="password"
            placeholder="Enter New Password"
            :visiblePassword="hasVisiblePassword"
            icon-after
            @click-icon="hasVisiblePassword = !hasVisiblePassword"
            class="my-5"
          >
            <template #icon>
              <i v-if="!hasVisiblePassword" class="bx bx-show-alt"></i>
              <i v-else class="bx bx-hide"></i>
            </template>
          </vs-input>
          <vs-input
            type="password"
            :color="isDark ? '#6e00ff' : '#7850ff'"
            v-model="confirm"
            placeholder="Confirm New Password"
            :visiblePassword="hasVisiblePassword"
            icon-after
            @click-icon="hasVisiblePassword = !hasVisiblePassword"
            class="mb-7"
          >
            <template #icon>
              <i v-if="!hasVisiblePassword" class="bx bx-show-alt"></i>
              <i v-else class="bx bx-hide"></i>
            </template>
          </vs-input>

          <div v-if="error">
            <vs-alert danger class="text-xs mb-7">
              <template #icon>
                <i class="bx bxs-error"></i>
              </template>
              {{ error }}
            </vs-alert>
          </div>

          <div v-if="passwordChanged">
            <vs-alert success class="text-xs mb-6">
              <template #icon>
                <i class="bx bxs-lock-open"></i>
              </template>
              Password changed successfully, you can login with your new
              password.
            </vs-alert>
          </div>

          <vs-button
            block
            type="submit"
            size="large"
            animation-type="vertical"
            v-on:keyup.enter="changePassword"
            :loading="passwordLoading"
          >
            <b>Change Password</b>
            <template #animate>
              <i class="bx bxs-lock"></i>
            </template>
          </vs-button>
        </form>
        <form v-else v-on:submit.prevent="sendEmail">
          <vs-input
            :color="isDark ? '#6e00ff' : '#7850ff'"
            v-model="email"
            placeholder="Email address you registered"
            class="my-5"
          >
            <template #icon>
              <i class="bx bx-at"></i>
            </template>
          </vs-input>
          <vs-alert v-if="!emailSent" class="mb-6 text-xs">
            <template #icon>
              <i class="bx bxs-lock-open"></i>
            </template>
            Please enter the e-mail address you registered to Gasome in the box
            above.
          </vs-alert>
          <vs-alert success v-else class="mb-6 text-xs">
            <template #icon>
              <i class="bx bxs-envelope"></i>
            </template>
            Password reset link sent successfully, please check your inbox.
          </vs-alert>
          <vs-button
            block
            type="submit"
            size="large"
            animation-type="vertical"
            v-on:keyup.enter="sendEmail"
            :loading="emailLoading"
          >
            <b>Send Reset Link</b>
            <template #animate>
              <i class="bx bxs-envelope"></i>
            </template>
          </vs-button>
        </form>
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
import * as animationData from '~/assets/lottie/login.json'
export default {
  auth: 'guest',
  layout: 'blank',
  components: {
    Logo,
    lottie,
  },
  computed: {
    ...mapState({
      emailLoading: (state) => state.emailLoading,
      passwordLoading: (state) => state.passwordLoading,
    }),
  },
  data: () => ({
    error: '',
    email: '',
    password: '',
    confirm: '',
    emailSent: false,
    passwordChanged: false,
    hasVisiblePassword: false,
    isDark: false,
    anim: null,
    lottieOptions: { animationData: animationData.default },
  }),
  asyncData({ route }) {
    return {
      token: route.query.token,
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
  methods: {
    ...mapActions({
      sendEmailAction: 'sendEmail',
      changePasswordAction: 'changePassword',
    }),
    handleAnimation: function (anim) {
      this.anim = anim
    },
    isValid() {
      if (this.password && this.password.trim()) {
        if (this.password === this.confirm) {
          return true
        }
      }
      return false
    },
    async changePassword() {
      const self = this
      this.error = ''
      if (this.isValid()) {
        this.changePasswordAction({
          password: this.password,
          token: this.token,
        })
          .then((res) => {
            self.password = ''
            self.confirm = ''
            self.passwordChanged = true
          })
          .catch((err) => {
            this.$vs.notification({
              duration: 5000,
              progress: 'auto',
              flat: true,
              color: 'danger',
              icon: `<i class='bx bx-error' ></i>`,
              position: 'top-center',
              title: 'An Error Occured',
              text:
                'It seems your password is not matching with criteria, please enter a stronger password.',
            })
          })
      } else {
        this.error = '*Please check your password and be sure both of them same'
      }
    },
    async sendEmail() {
      const self = this
      this.sendEmailAction(this.email)
        .then((res) => {
          self.email = ''
          self.emailSent = true
        })
        .catch((err) => {
          this.$vs.notification({
            duration: 5000,
            progress: 'auto',
            flat: true,
            color: 'danger',
            icon: `<i class='bx bx-error' ></i>`,
            position: 'top-center',
            title: 'An Error Occured',
            text:
              'It seems there is no user with this email/username. Please try again.',
          })
        })
    },
  },
}
</script>
