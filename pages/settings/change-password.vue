<template>
  <div class="bg-white dark:bg-black col-span-12 min-h-screen overflow-auto">
    <!-- Breadcrumb -->

    <div
      class="
        flex
        items-center
        py-3
        px-5
        border-b border-gray-200
        dark:border-gray-700
      "
    >
      <vs-button
        active
        size="small"
        transparent
        @click.prevent="$router.back()"
      >
        <i class="bx bxs-chevron-left text-xl"></i>
      </vs-button>
      <div class="flex flex-col ml-9">
        <h5>Change Password</h5>
        <span class="text-gray-400 text-sm mr-1"
          >Update your account password</span
        >
      </div>
    </div>

    <form class="px-5 md:px-20 lg:px-5" @submit.prevent="updatePassword">
      <vs-alert class="text-xs mt-7">
        <template #icon>
          <i class="bx bxs-error"></i>
        </template>
        Your new password must match with criteria and you must enter current
        password to update.
      </vs-alert>

      <vs-input
        v-model="current"
        type="password"
        :color="isDark ? '#6e00ff' : '#7850ff'"
        placeholder="Enter Current Password"
        :visible-password="hasVisiblePassword"
        icon-after
        class="my-5"
        @click-icon="hasVisiblePassword = !hasVisiblePassword"
      >
        <template #icon>
          <i v-if="!hasVisiblePassword" class="bx bx-show-alt"></i>
          <i v-else class="bx bx-hide"></i>
        </template>
      </vs-input>
      <vs-input
        v-model="password"
        type="password"
        :color="isDark ? '#6e00ff' : '#7850ff'"
        placeholder="Enter New Password"
        :visible-password="hasVisiblePassword"
        icon-after
        class="mb-7"
        @click-icon="hasVisiblePassword = !hasVisiblePassword"
      >
        <template #icon>
          <i v-if="!hasVisiblePassword" class="bx bx-show-alt"></i>
          <i v-else class="bx bx-hide"></i>
        </template>
      </vs-input>

      <div v-if="passwordChanged">
        <vs-alert success class="text-xs mb-6">
          <template #icon>
            <i class="bx bxs-lock-open"></i>
          </template>
          Password updated successfully, you can use your new password.
        </vs-alert>
      </div>

      <vs-button
        block
        type="submit"
        size="large"
        animation-type="vertical"
        :loading="passwordLoading"
        @keyup.enter="updatePassword"
      >
        <b>Update Password</b>
        <template #animate>
          <i class="bx bxs-lock"></i>
        </template>
      </vs-button>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  layout: 'sidebars',
  computed: {
    ...mapState({
      passwordLoading: (state) => state.settings.passwordLoading,
    }),
  },
  data() {
    return {
      password: '',
      current: '',
      passwordChanged: false,
      hasVisiblePassword: false,
      isDark: false,
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
      updatePasswordAction: 'settings/updatePassword',
    }),
    async updatePassword() {
      const self = this
      this.updatePasswordAction({
        password: this.current,
        newPassword: this.password,
      })
        .then((res) => {
          self.password = ''
          self.current = ''
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
            text: 'It seems your password is not matching with criteria or current password is wrong, please enter a stronger password.',
          })
        })
    },
  },
}
</script>

<style></style>
