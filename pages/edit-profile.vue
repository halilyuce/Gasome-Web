<template>
  <div class="bg-white dark:bg-black lg:h-screen overflow-hidden">
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
        <h5>{{ $t('edit.edit') }}</h5>
        <span class="text-gray-400 text-sm mr-1">{{
          $t('edit.editText')
        }}</span>
      </div>
    </div>
    <form
      class="px-6 md:px-24 lg:px-6"
      autocomplete="on"
      @submit.prevent="saveChanges"
    >
      <input ref="avatar_upload" type="file" hidden @change="onFileChange" />
      <div class="flex flex-row mt-5">
        <div class="w-32 mr-3 relative">
          <div
            class="
              absolute
              w-full
              h-full
              bg-black bg-opacity-40
              rounded-3xl
              flex
              justify-center
              items-center
            "
          >
            <vs-button
              color="#fff"
              flat
              @click.prevent="$refs.avatar_upload.click()"
            >
              <i class="bx bx-photo-album text-lg"></i>
            </vs-button>
          </div>
          <img
            class="
              h-24
              w-28
              cursor-pointer
              rounded-3xl
              object-cover
              border
              dark:border-gray-700
              border-gray-300
            "
            :src="avatar"
          />
        </div>

        <div class="flex flex-col items-center justify-center w-full">
          <vs-input
            v-model="name"
            :color="isLight ? '#6e00ff' : '#7850ff'"
            :placeholder="$t('edit.fullName')"
            class="mb-3 w-full"
          >
            <template #icon>
              <i class="bx bxs-face"></i>
            </template>
          </vs-input>

          <vs-input
            v-model="username"
            :color="isLight ? '#6e00ff' : '#7850ff'"
            :placeholder="$t('edit.userName')"
            name="username"
            class="w-full"
          >
            <template #icon>
              <i class="bx bx-at"></i>
            </template>
          </vs-input>
        </div>
      </div>

      <vs-input
        v-model="email"
        :color="isLight ? '#6e00ff' : '#7850ff'"
        name="email"
        placeholder="E-mail"
        class="my-4"
      >
        <template #icon>
          <i class="bx bx-mail-send"></i>
        </template>
      </vs-input>

      <vs-input
        v-model="birthday"
        type="date"
        :color="isLight ? '#6e00ff' : '#7850ff'"
        name="birthday"
        :placeholder="$t('edit.birthday')"
        class="my-4"
      >
        <template #icon>
          <i class="bx bx-cake"></i>
        </template>
      </vs-input>

      <vs-input
        v-model="website"
        :color="isLight ? '#6e00ff' : '#7850ff'"
        name="website"
        placeholder="Website URL"
        class="my-4"
      >
        <template #icon>
          <i class="bx bx-world"></i>
        </template>
      </vs-input>

      <textarea
        v-model="bio"
        class="
          w-full
          px-3
          py-2
          text-gray-700
          dark:text-gray-300
          bg-gray-100
          dark:bg-content-bg
          rounded-xl
          focus:outline-none
          mb-3
        "
        :placeholder="$t('edit.bio')"
        rows="2"
      ></textarea>

      <div class="flex items-center justify-end">
        <vs-button danger transparent @click.prevent="$router.back()">
          {{ $t('edit.cancel') }}
        </vs-button>

        <vs-button type="submit" :loading="loading" @keyup.enter="saveChanges">
          {{ $t('edit.save') }}
        </vs-button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  layout: 'sidebars',
  computed: {
    ...mapGetters(['loggedInUser']),
    ...mapState({
      loading: (state) => state.profile.editLoading,
    }),
  },
  mounted() {
    this.isLight = localStorage.getItem('mode') === 'light' ? true : false
    this.name = this.loggedInUser.name ? this.loggedInUser.name : ''
    this.username = this.loggedInUser.username ? this.loggedInUser.username : ''
    this.email = this.loggedInUser.email ? this.loggedInUser.email : ''
    this.bio = this.loggedInUser.bio ? this.loggedInUser.bio : ''
    this.birthday = this.loggedInUser.birthday
      ? this.loggedInUser.birthday.substr(
          0,
          this.loggedInUser.birthday.indexOf(' ')
        )
      : ''
    this.website = this.loggedInUser.weblink ? this.loggedInUser.weblink : ''
    this.avatar = this.loggedInUser.avatar
      ? this.smallAvatar + this.loggedInUser.avatar + '.jpg'
      : ''
  },
  data() {
    return {
      isLight: false,
      smallAvatar: process.env.AVATAR_SMALL,
      avatar: '',
      upload_avatar: '',
      name: '',
      username: '',
      email: '',
      bio: '',
      website: '',
      birthday: '',
    }
  },
  methods: {
    ...mapActions({
      updateProfile: 'profile/updateProfile',
      updateAvatar: 'profile/updateAvatar',
      toggleEditLoading: 'profile/toggleEditLoading',
    }),
    onFileChange(e) {
      this.avatar = URL.createObjectURL(e.target.files[0])
      this.upload_avatar = e.target.files[0]
    },
    async saveChanges() {
      this.toggleEditLoading(true)
      const self = this
      const payload = {}

      if (this.name !== this.loggedInUser.name) {
        payload['name'] = this.name
      }
      if (this.username !== this.loggedInUser.username) {
        payload['username'] = this.username
      }
      if (this.email !== this.loggedInUser.email) {
        payload['email'] = this.email
      }
      if (this.website !== this.loggedInUser.weblink) {
        payload['website'] = this.website
      }
      if (this.bio !== this.loggedInUser.bio) {
        payload['bio'] = this.bio
      }
      if (
        this.loggedInUser.birthday &&
        this.birthday !==
          this.loggedInUser.birthday.substr(
            0,
            this.loggedInUser.birthday.indexOf(' ')
          )
      ) {
        payload['birthday'] = this.birthday
      }

      if (this.upload_avatar) {
        var formData = new FormData()
        formData.append('avatar', this.upload_avatar)

        setTimeout(function () {
          self.updateAvatar(formData).then(() => {
            self.upload_avatar = ''
            self.updateProfile(payload).then((res) => {
              self.$auth.setUser(res)
              self.$vs.notification({
                duration: 5000,
                progress: 'auto',
                flat: true,
                color: 'success',
                icon: `<i class='bx bx-user-check' ></i>`,
                position: 'top-right',
                title: 'Updated Successfuly',
                text: 'Your information updated successfuly.',
              })
            })
          })
        }, 2000)
      } else {
        this.updateProfile(payload).then((res) => {
          self.$auth.setUser(res)
          self.$vs.notification({
            duration: 5000,
            progress: 'auto',
            flat: true,
            color: 'success',
            icon: `<i class='bx bx-user-check' ></i>`,
            position: 'top-right',
            title: 'Updated Successfuly',
            text: 'Your information updated successfuly.',
          })
        })
      }
    },
  },
}
</script>

<style></style>
