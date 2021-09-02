<template>
  <div>
    <!-- User Breadcrumb -->

    <div
      class="flex items-center py-3 px-5 border-b border-gray-200 dark:border-gray-700"
    >
      <vs-button active @click="$router.back()" size="small" transparent>
        <i class="bx bxs-chevron-left text-xl"></i>
      </vs-button>
      <div class="flex flex-col ml-9">
        <h5>{{ user.name }}</h5>
        <span class="text-gray-400 text-sm mr-1">{{
          user.postcount + ' Posts'
        }}</span>
      </div>
    </div>

    <!-- Image Viewer -->

    <CoolLightBox
      :items="avatar"
      :index="index"
      :useZoomBar="true"
      :fullScreen="true"
      :closeOnClickOutsideMobile="true"
      @close="closeAvatar"
    />

    <!-- User Avatar & Info -->

    <div class="px-5 pb-3">
      <div class="flex items-center w-full justify-between">
        <div class="flex flex-row items-center mt-3">
          <vs-avatar @click="showAvatar" size="72">
            <img
              class="cursor-pointer"
              :src="`${smallAvatar + user.avatar}.jpg`"
              alt="Avatar"
            />
          </vs-avatar>
          <div class="ml-4">
            <h4>{{ user.name }}</h4>
            <div class="flex items-center">
              <span class="text-gray-400 mr-1">{{ '@' + user.username }}</span>
              <vs-button
                v-if="user.isFollowsYou"
                size="mini"
                transparent
                active
              >
                Follows You
              </vs-button>
            </div>
          </div>
        </div>
        <vs-button>
          <i class="bx bxs-user-plus"></i>
          <b class="mx-5">{{ user.isFollow ? 'Unfollow' : 'Follow' }}</b>
        </vs-button>
      </div>

      <!-- User Bio -->

      <p class="mt-2 mb-1 text-sm" v-if="user.bio" v-html="user.bio" />

      <!-- User Links & Dates -->

      <div
        class="flex flex-col text-gray-600 dark:text-gray-400 md:flex-row text-sm"
      >
        <div v-if="user.weblink" class="flex items-center mb-1 md:mr-3">
          <i class="bx bx-link"></i>
          <a
            :href="
              user.weblink.includes('http')
                ? user.weblink
                : `https://${user.weblink}`
            "
            target="_blank"
            class="ml-1 text-purple-500"
          >
            {{ user.weblink }}
          </a>
        </div>
        <div v-if="user.birthday" class="flex items-center mb-1 md:mr-3">
          <i class="bx bx-cake"></i>
          <span class="ml-1">{{ $moment(user.birthday).format('LL') }}</span>
        </div>
        <div v-if="user.created_at" class="flex items-center mb-1 md:mr-3">
          <i class="bx bx-calendar"></i>
          <span class="ml-1">{{ $moment(user.created_at).format('LL') }}</span>
        </div>
      </div>

      <!-- User Follower - Follows Count -->

      <div class="flex items-center text-sm">
        <div class="flex items-center mr-5">
          <b>{{ user.follows }}</b>
          <span class="text-gray-400 ml-1">Following</span>
        </div>
        <div class="flex items-center">
          <b>{{ user.followers }}</b>
          <span class="text-gray-400 ml-1">Followers</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: null,
  },
  data() {
    return {
      largeAvatar: process.env.AVATAR_LARGE,
      smallAvatar: process.env.AVATAR_SMALL,
      avatar: [],
      index: null,
    }
  },
  methods: {
    showAvatar() {
      this.avatar.push(`${this.largeAvatar + this.user.avatar}.jpg`)
      this.index = 0
    },
    closeAvatar() {
      this.avatar = []
      this.index = null
    },
  },
}
</script>
