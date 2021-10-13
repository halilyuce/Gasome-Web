<template>
  <Login />
</template>

<script>
import Login from '~/components/Auth/Login.vue'
export default {
  auth: 'guest',
  components: {
    Login,
  },
  layout: 'blank',
  head() {
    return {
      title: this.$t('pageHead.loginTitle'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('pageHead.registerDesc'),
        },
      ],
    }
  },
}
</script>
