<template>
  <div ref="user" class="relative" :class="{ 'h-72': loading }">
    <!-- User Breadcrumb -->

    <div
      v-if="user"
      class="
        relative
        flex
        items-center
        py-3
        px-5
        border-b border-gray-200
        dark:border-gray-700
      "
    >
      <vs-button active size="small" transparent @click="$router.back()">
        <i class="bx bxs-chevron-left text-xl"></i>
      </vs-button>
      <div class="flex flex-col ml-9">
        <h5>{{ user.name }}</h5>
        <span class="text-gray-400 text-sm mr-1">{{
          user.postcount + ' ' + $t('userProfileHeader.post')
        }}</span>
      </div>
    </div>

    <!-- Image Viewer -->

    <CoolLightBox
      :items="avatar"
      :index="index"
      :use-zoom-bar="true"
      :full-screen="true"
      :close-on-click-outside-mobile="true"
      @close="closeAvatar"
    />

    <!-- User Avatar & Info -->

    <div v-if="user" class="px-5 pb-3">
      <div class="flex items-center w-full justify-between mt-3">
        <div class="flex flex-row items-center">
          <vs-avatar size="72" @click="showAvatar">
            <img
              class="cursor-pointer"
              :src="`${smallAvatar + user.avatar}.jpg`"
              alt="Avatar"
            />
          </vs-avatar>
          <div class="ml-2 md:ml-4">
            <h3 class="leading-4 truncate">{{ user.name }}</h3>
            <div class="flex flex-col items-start md:flex-row md:items-center">
              <span class="text-gray-400 mr-1">{{ '@' + user.username }}</span>
              <vs-button v-if="user.isFollowsYou" size="mini" flat>
                {{ $t('userProfileHeader.followsYou') }}
              </vs-button>
            </div>
          </div>
        </div>
        <div class="flex flex-col items-end md:flex-row md:items-center">
          <vs-button
            v-if="user.id !== loggedInUser.id"
            :to="`/messages?room=${user.id}`"
            icon
            ><i class="bx bxs-envelope"></i
          ></vs-button>
          <vs-button
            :shadow="user.isFollow"
            :border="user.isFollow"
            :loading="followLoading"
            :danger="user.isFollow"
            @click="followAction()"
          >
            <i
              class="bx text-lg"
              :class="
                user.id === loggedInUser.id
                  ? 'bxs-edit'
                  : user.isFollow
                  ? 'bxs-user-minus'
                  : 'bxs-user-plus'
              "
            ></i>
            <span class="mx-1">{{
              user.id === loggedInUser.id
                ? $t('userProfileHeader.edit')
                : user.isFollow
                ? $t('userProfileHeader.unfollow')
                : $t('userProfileHeader.follow')
            }}</span>
          </vs-button>
        </div>
      </div>

      <!-- User Bio -->

      <div class="flex flex-col mt-3 space-y-1">
        <p v-if="user.bio" class="text-sm" v-html="user.bio" />

        <!-- User Links & Dates -->

        <div
          class="
            flex flex-col
            text-gray-600
            dark:text-gray-400
            md:flex-row
            text-sm
          "
        >
          <div v-if="user.weblink" class="flex items-center md:mr-3">
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
          <div v-if="user.birthday" class="flex items-center md:mr-3">
            <i class="bx bx-cake"></i>
            <span class="ml-1">{{ $moment(user.birthday).format('LL') }}</span>
          </div>
          <div v-if="user.created_at" class="flex items-center md:mr-3">
            <i class="bx bx-calendar"></i>
            <span class="ml-1">{{
              $moment(user.created_at).format('LL')
            }}</span>
          </div>
        </div>

        <!-- User Follower - Follows Count -->

        <div class="flex items-center space-x-8 text-sm">
          <n-link :to="`${user.username}/follow?tab=following`">
            <div class="flex items-center">
              <b class="text-black mr-1 dark:text-white">{{ user.follows }}</b>
              <span class="text-gray-400 ml-1">{{
                $t('userProfileHeader.followNumber')
              }}</span>
            </div>
          </n-link>
          <n-link :to="`${user.username}/follow?tab=followers`">
            <div class="flex items-center">
              <b class="text-black mr-1 dark:text-white">{{
                user.followers
              }}</b>
              <span class="text-gray-400 ml-1">{{
                $t('userProfileHeader.followersNumber')
              }}</span>
            </div>
          </n-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  props: {
    user: null,
  },
  computed: {
    ...mapState({
      followLoading: (state) => state.profile.followLoading,
      loading: (state) => state.profile.loading,
    }),
    ...mapGetters(['loggedInUser']),
  },
  data() {
    return {
      largeAvatar: process.env.AVATAR_LARGE,
      smallAvatar: process.env.AVATAR_SMALL,
      avatar: [],
      index: null,
    }
  },
  watch: {
    loading(newVal, oldVal) {
      if (newVal != oldVal) {
        if (!newVal) {
          this.userLoading.close()
        } else {
          this.userLoading = this.$vs.loading({
            target: this.$refs.user,
          })
        }
      }
    },
  },
  methods: {
    ...mapActions({
      follow: 'profile/follow',
    }),
    followAction() {
      if (this.user.id != this.loggedInUser.id) {
        this.follow(this.user.username)
      } else {
        this.$router.push('/edit-profile')
      }
    },
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
