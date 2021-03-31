<template>
  <div class="con-user-example">
    <header>
      <vs-avatar-group max="7">
        <vs-avatar size="36">
          <img src="https://vuesax.com/avatars/avatar-1.png" alt="" />
        </vs-avatar>
        <vs-avatar size="36">
          <img src="https://vuesax.com/avatars/avatar-6.png" alt="" />
        </vs-avatar>
        <vs-avatar size="36">
          <img src="https://vuesax.com/avatars/avatar-2.png" alt="" />
        </vs-avatar>
        <vs-avatar size="36">
          <img src="https://vuesax.com/avatars/avatar-7.png" alt="" />
        </vs-avatar>
        <vs-avatar size="36">
          <img src="https://vuesax.com/avatars/avatar-3.png" alt="" />
        </vs-avatar>
        <vs-avatar size="36">
          <img src="https://vuesax.com/avatars/avatar-8.png" alt="" />
        </vs-avatar>
        <vs-avatar size="36">
          <img src="https://vuesax.com/avatars/avatar-4.png" alt="" />
        </vs-avatar>
        <vs-avatar size="36">
          <img src="https://vuesax.com/avatars/avatar-9.png" alt="" />
        </vs-avatar>
        <vs-avatar size="36">
          <img src="https://vuesax.com/avatars/avatar-5.png" alt="" />
        </vs-avatar>
        <vs-avatar size="36">
          <img src="https://vuesax.com/avatars/avatar-10.png" alt="" />
        </vs-avatar>
      </vs-avatar-group>
    </header>

    <div class="content-user">
      <p><b>Esila Su</b> and <b>9 other users</b> liked your post</p>
      <vs-button dark transparent icon>
        <i class="bx bx-chevron-right"></i>
      </vs-button>
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style lang="scss" scoped>
.con-user-example {
  header {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    p {
      margin-left: 10px;
      font-size: 0.9rem;
    }
  }

  .content-user {
    display: flex;
    align-items: center;
    justify-content: space-between;
    p {
      font-size: 0.7rem;
      padding: 0px;
      margin: 0px;
    }
  }
}
</style>
