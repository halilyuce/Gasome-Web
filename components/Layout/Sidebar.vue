<template>
  <div>
    <vs-sidebar
      relative
      reduce
      v-model="active"
      :textWhite="false"
      open
      class="min-h-screen"
    >
      <template #logo>
        <Logo />
      </template>
      <vs-sidebar-item id="home">
        <template #icon>
          <i class="bx bxs-home-circle"></i>
        </template>
        Home
      </vs-sidebar-item>
      <vs-sidebar-item id="swaps">
        <template #icon>
          <i class="bx bxs-hand-up"></i>
        </template>
        Swaps
      </vs-sidebar-item>
      <vs-sidebar-item id="discover">
        <template #icon>
          <i class="bx bxs-game"></i>
        </template>
        Discover
      </vs-sidebar-item>
      <vs-sidebar-item id="chat">
        <template #icon>
          <i class="bx bxs-chat"></i>
        </template>
        Messages
      </vs-sidebar-item>

      <template #footer>
        <vs-avatar
          badge-color="danger"
          badge-position="top-right"
          class="ml-1"
          @click="openNotificationUser"
        >
          <i class="bx bx-bell"></i>

          <template #badge>
            <span class="dark:text-white">28</span>
          </template>
        </vs-avatar>
      </template>
    </vs-sidebar>
  </div>
</template>
<script>
import Logo from '../Logo.vue'
import likeNotification from '../Notifications/Like.vue'
export default {
  components: { Logo, likeNotification },
  data: () => ({
    active: 'home',
  }),
  methods: {
    openNotificationUser() {
      const noti = this.$vs.notification({
        duration: 'none',
        width: 'auto',
        content: likeNotification,
      })
    },
  },
}
</script>
