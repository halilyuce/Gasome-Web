<template>
  <div
    class="flex flex-col items-center xl:w-3/4 2xl:w-2/3 xl:ml-auto w-full my-5"
  >
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
          <n-link
            :to="`/u/${loggedInUser.username}`"
            class="flex flex-col ml-3"
          >
            <h3>
              {{ loggedInUser ? loggedInUser.name : '' }}
            </h3>
            <span class="text-gray-400 text-sm">
              {{ loggedInUser ? '@' + loggedInUser.username : '' }}
            </span>
          </n-link>
        </div>

        <vs-button :to="'/edit-profile'">
          {{ $t('userBar.editProfile') }}
        </vs-button>
      </div>

      <h2 class="mt-8 text-center">{{ $t('userBar.statistics') }}</h2>
      <div class="grid grid-cols-6 gap-0">
        <vs-button
          :to="
            '/u/' +
            (loggedInUser ? loggedInUser.username : '') +
            '/follow?tab=following'
          "
          shadow
          size="xl"
          animation-type="scale"
          class="col-span-3"
        >
          <div class="flex flex-col items-center">
            <h2>{{ loggedInUser ? loggedInUser.follows : '' }}</h2>
            <span class="text-gray-400 text-xs">{{
              $t('userBar.follows')
            }}</span>
          </div>
          <template #animate>
            <i class="bx bxs-user-plus text-3xl"></i>
          </template>
        </vs-button>
        <vs-button
          :to="
            '/u/' +
            (loggedInUser ? loggedInUser.username : '') +
            '/follow?tab=followers'
          "
          shadow
          size="xl"
          animation-type="scale"
          class="col-span-3"
        >
          <div class="flex flex-col items-center">
            <h2>{{ loggedInUser ? loggedInUser.followers : '' }}</h2>
            <span class="text-gray-400 text-xs">{{
              $t('userBar.followers')
            }}</span>
          </div>
          <template #animate>
            <i class="bx bxs-user-plus text-3xl"></i>
          </template>
        </vs-button>
        <vs-button
          :to="'/u/' + (loggedInUser ? loggedInUser.username : '')"
          shadow
          size="xl"
          animation-type="scale"
          class="col-span-6"
        >
          <div class="flex flex-col items-center">
            <h2>{{ loggedInUser ? loggedInUser.swapsCount : '' }}</h2>
            <span class="text-gray-400 text-xs">{{ $t('userBar.swaps') }}</span>
          </div>
          <template #animate>
            <i class="bx bx-shuffle text-3xl"></i>
          </template>
        </vs-button>
      </div>

      <div class="bg-white dark:bg-black py-3 px-5 rounded-xl mt-auto">
        <h3>{{ $t('userBar.feedback') }}</h3>
        <div class="flex flex-col mt-2">
          <p class="text-sm text-gray-800 dark:text-gray-200 mb-2">
            {{ $t('userBar.textPart') }}
          </p>
          <vs-button
            danger
            gradient
            @click.stop.prevent="
              openWindow(
                'mailto:support@gasome.com?subject=Gasome Beta Feedback'
              )
            "
          >
            {{ $t('userBar.sendPhase')
            }}<i class="bx bxs-flag-checkered ml-2"></i>
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
