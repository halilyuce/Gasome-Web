<template>
  <div>
    <div class="flex flex-row space-x-2">
      <i
        v-for="i in 5"
        :id="i"
        :key="i"
        class="bx text-yellow-500 text-sm cursor-pointer"
        :class="[
          hover && hoverRate >= i
            ? 'bxs-star'
            : rate >= i
            ? 'bxs-star'
            : 'bx-star',
          `text-${size}`,
        ]"
        @click="rateStar(i)"
        @mouseover="hoverRate = i"
        @mouseleave="hoverRate = 0"
      ></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StarRateSingle',
  props: {
    size: {
      type: String,
      default: 'md',
    },
  },
  data() {
    return {
      rate: 0,
      hoverRate: 0,
    }
  },
  computed: {
    hover() {
      return this.rate === 0 && this.hoverRate > 0
    },
  },
  methods: {
    rateStar(rate) {
      this.rate = rate
      this.$emit('rating', rate)
    },
  },
}
</script>
