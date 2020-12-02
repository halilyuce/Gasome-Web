<template>
  <div class="hidden">
    <vs-sidebar absolute v-model="active" open>
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
      <vs-sidebar-item id="notifications">
        <template #icon>
          <i class="bx bxs-bell"></i>
        </template>
        Notifications
      </vs-sidebar-item>
      <vs-sidebar-item id="chat">
        <template #icon>
          <i class="bx bxs-chat"></i>
        </template>
        Messages
      </vs-sidebar-item>

      <template #footer>
        <vs-row justify="space-between">
          <vs-avatar>
            <img src="~assets/img/avatar.jpeg" alt="Avatar" />
          </vs-avatar>

          <vs-avatar badge-color="danger" badge-position="top-right">
            <i class="bx bx-bell"></i>

            <template #badge> 28 </template>
          </vs-avatar>
        </vs-row>
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
}
</script>
