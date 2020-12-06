<template>
  <login />
</template>

<script>
import Login from '~/components/Auth/Login.vue'
export default {
  middleware: 'guest',
  components: {
    Login,
  },
}
</script>
