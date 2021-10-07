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
}
</script>
