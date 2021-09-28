<template>
  <div class="flex flex-col items-center 2xl:items-end w-full my-5">
    <div class="flex flex-col mx-7 h-full">
      <div class="flex flex-col bg-white dark:bg-black py-4 px-4 rounded-xl">
        <div class="flex flex-row mb-3 items-center">
          <n-link :to="`/u/${loggedInUser.username}`">
            <vs-avatar size="48" badge badge-color="success">
              <img
                v-if="loggedInUser"
                :src="`${smallAvatar + loggedInUser.avatar}.jpg`"
                alt="Avatar"
              />
            </vs-avatar>
          </n-link>
          <div class="flex flex-col ml-3">
            <h3>
              {{ loggedInUser ? loggedInUser.name : '' }}
            </h3>
            <span class="text-gray-400 text-sm">
              {{ loggedInUser ? '@' + loggedInUser.username : '' }}
            </span>
          </div>
        </div>

        <vs-button :to="'/edit-profile'"> Edit Profile </vs-button>
      </div>

      <h2 class="mt-8 text-center">Statistics</h2>
      <div class="grid grid-cols-6 gap-0">
        <vs-button shadow size="xl" animation-type="scale" class="col-span-3">
          <div class="flex flex-col items-center">
            <h2>{{ loggedInUser ? loggedInUser.follows : '' }}</h2>
            <span class="text-gray-400 text-xs">Follows</span>
          </div>
          <template #animate>
            <i class="bx bxs-user-plus text-3xl"></i>
          </template>
        </vs-button>
        <vs-button shadow size="xl" animation-type="scale" class="col-span-3">
          <div class="flex flex-col items-center">
            <h2>{{ loggedInUser ? loggedInUser.followers : '' }}</h2>
            <span class="text-gray-400 text-xs">Followers</span>
          </div>
          <template #animate>
            <i class="bx bxs-user-plus text-3xl"></i>
          </template>
        </vs-button>
        <vs-button shadow size="xl" animation-type="scale" class="col-span-6">
          <div class="flex flex-col items-center">
            <h2>{{ loggedInUser ? loggedInUser.swapsCount : '' }}</h2>
            <span class="text-gray-400 text-xs">Swaps</span>
          </div>
          <template #animate>
            <i class="bx bx-shuffle text-3xl"></i>
          </template>
        </vs-button>
      </div>

      <div class="bg-white dark:bg-black py-3 px-5 rounded-xl mt-auto">
        <h3>Give Feedback</h3>
        <div class="flex flex-col mt-2">
          <p class="text-sm text-gray-800 dark:text-gray-200 mb-2">
            We're in beta and we're waiting for your feedbacks :)
          </p>
          <vs-button
            @click.stop.prevent="
              openWindow(
                'mailto:support@gasome.com?subject=Gasome Beta Feedback'
              )
            "
            danger
            gradient
          >
            Send Feedback <i class="bx bxs-flag-checkered ml-2"></i>
          </vs-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
  },
  data() {
    return {
      smallAvatar: process.env.AVATAR_SMALL,
    }
  },
  methods: {
    openWindow(link) {
      window && window.open(link, '_blank')
    },
  },
}
</script>
