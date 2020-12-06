<template>
  <register />
</template>

<script>
import Register from '~/components/Auth/Register.vue'
export default {
  middleware: 'guest',
  components: {
    Register,
  },
}
</script>
