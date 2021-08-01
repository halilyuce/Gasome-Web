<template>
  <div>
    <div v-if="user">
      <UserHeader :user="user.data" />
    </div>
    <div v-else ref="boxwaves" class="box-loading"></div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import UserHeader from '~/components/UserProfile/UserProfileHeader.vue'
export default {
  components: { UserHeader },
  layout: 'sidebars',
  computed: {
    ...mapState({
      user: (state) => state.user.user,
      loading: (state) => state.user.loading,
    }),
  },
  asyncData({ params }) {
    return {
      slug: params.id,
    }
  },
  mounted() {
    this.getUserProfile(this.slug)
  },
  methods: {
    ...mapActions({
      getUserProfile: 'user/getUserProfile',
    }),
  },
}
</script>

<style scoped lang='scss'>
.box-loading {
  width: 120px;
  height: 120px;
  position: relative;
  margin: 5px;
  border-radius: 20px;
  box-shadow: 0px 10px 20px -10px rgba(0, 0, 0, 0.07);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.25s ease;
  &:hover {
    transform: translate(0, -5px);
    box-shadow: 0px 15px 20px -10px rgba(0, 0, 0, 0.09);
  }
}
</style>