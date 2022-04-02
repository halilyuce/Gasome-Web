<template>
  <div
    class="
      flex flex-col
      space-y-4
      justify-center
      py-5
      bg-gray-100
      dark:bg-content-bg
      rounded-xl
      items-center
    "
  >
    <i class="bx bxs-sad text-yellow-500 text-4xl"></i>
    <h5>{{ $t('socialCon.message') }}</h5>
  </div>
</template>

<script>
export default {
  name: 'SocialConnections',
  props: {
    twitch: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Boolean,
      default: false,
    },
  },
  methods: {},
}
</script>
