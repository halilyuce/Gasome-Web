<template>
  <login />
</template>

<script>
import Login from '~/components/Auth/Login.vue'
export default {
  auth: 'guest',
  components: {
    Login,
  },
}
</script>
