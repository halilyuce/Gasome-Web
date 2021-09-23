<template>
  <div
    class="bg-white dark:bg-black col-span-12 md:col-span-8 min-h-screen overflow-auto"
  >
    <!-- Breadcrumb -->

    <div
      class="flex items-center py-3 px-5 border-b border-gray-200 dark:border-gray-700"
    >
      <vs-button active @click="$router.back()" size="small" transparent>
        <i class="bx bxs-chevron-left text-xl"></i>
      </vs-button>
      <div class="flex flex-col ml-9">
        <h5>Edit Profile</h5>
        <span class="text-gray-400 text-sm mr-1">Update your information</span>
      </div>
    </div>
    <form class="mx-6" autocomplete="on" v-on:submit.prevent="saveChanges">
      <input type="file" ref="avatar_upload" @change="onFileChange" hidden />
      <div class="flex flex-row mt-5">
        <div class="w-32 mr-3 relative">
          <div
            class="absolute w-full h-full bg-black bg-opacity-40 rounded-3xl flex justify-center items-center"
          >
            <vs-button
              @click.prevent="$refs.avatar_upload.click()"
              color="#fff"
              flat
            >
              <i class="bx bx-photo-album text-lg"></i>
            </vs-button>
          </div>
          <img
            class="h-24 w-28 cursor-pointer rounded-3xl object-cover border dark:border-gray-700 border-gray-300"
            :src="avatar"
          />
        </div>

        <div class="flex flex-col items-center justify-center w-full">
          <vs-input
            :color="isLight ? '#6e00ff' : '#7850ff'"
            v-model="name"
            placeholder="Full Name"
            class="mb-3 w-full"
          >
            <template #icon>
              <i class="bx bxs-face"></i>
            </template>
          </vs-input>

          <vs-input
            :color="isLight ? '#6e00ff' : '#7850ff'"
            v-model="username"
            placeholder="Username"
            name="username"
            class="w-full"
          >
            <template #icon>
              <i class="bx bx-user"></i>
            </template>
          </vs-input>
        </div>
      </div>

      <vs-input
        :color="isLight ? '#6e00ff' : '#7850ff'"
        v-model="email"
        name="email"
        placeholder="E-mail Adress"
        class="my-4"
      >
        <template #icon>
          <i class="bx bx-mail-send"></i>
        </template>
      </vs-input>

      <vs-input
        type="date"
        :color="isLight ? '#6e00ff' : '#7850ff'"
        v-model="birthday"
        name="birthday"
        placeholder="Birthday"
        class="my-4"
      >
        <template #icon>
          <i class="bx bx-cake"></i>
        </template>
      </vs-input>

      <vs-input
        :color="isLight ? '#6e00ff' : '#7850ff'"
        v-model="website"
        name="website"
        placeholder="Website URL"
        class="my-4"
      >
        <template #icon>
          <i class="bx bx-world"></i>
        </template>
      </vs-input>

      <textarea
        class="w-full px-3 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-content-bg rounded-xl focus:outline-none mb-3"
        v-model="bio"
        placeholder="Biography"
        rows="2"
      ></textarea>

      <div class="flex items-center justify-end">
        <vs-button @click="$router.back()" danger transparent>
          Cancel
        </vs-button>

        <vs-button
          type="submit"
          :loading="loading"
          v-on:keyup.enter="saveChanges"
        >
          Save Changes
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
            })
          })
        }, 2000)
      } else {
        this.updateProfile(payload).then((res) => {
          self.$auth.setUser(res)
        })
      }
    },
  },
}
</script>

<style></style>
