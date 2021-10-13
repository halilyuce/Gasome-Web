<template>
  <Register />
</template>

<script>
import Register from '~/components/Auth/Register.vue'
export default {
  auth: 'guest',
  components: {
    Register,
  },
  layout: 'blank',
  head() {
    return {
      title: this.$t('pageHead.registerTitle'),
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
