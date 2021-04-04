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
        <vs-button @click="logOut" danger icon>
          <i class="bx bx-power-off"></i>
        </vs-button>
      </template>
    </vs-sidebar>
  </div>
</template>
<script>
import Logo from '../Logo.vue'
export default {
  components: { Logo },
  data: () => ({
    active: 'home',
  }),
  methods: {
    async logOut() {
      await this.$auth.logout()
    },
  },
}
</script>
