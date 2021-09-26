<template>
  <div
    class="relative bg-white dark:bg-black container overflow-y-auto disable-scrollbars"
  >
    <p>hashtag: {{ this.$route.params.id }}</p>
  </div>
</template>

<script>
export default {
  layout: 'sidebars',
}
</script>

<style></style>
