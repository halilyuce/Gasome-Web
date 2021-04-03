<template>
  <register />
</template>

<script>
import Register from '~/components/Auth/Register.vue'
export default {
  auth: 'guest',
  components: {
    Register,
  },
}
</script>
