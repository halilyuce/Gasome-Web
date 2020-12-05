<template>
  <div>
    <sidebar />
    <Nuxt />
  </div>
</template>
<script>
import Sidebar from '../components/Layout/Sidebar.vue'
export default {
  name: 'sidebars',
  components: { Sidebar },
}
</script>
