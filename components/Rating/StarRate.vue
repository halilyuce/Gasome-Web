<template>
  <div>
    <div class="flex justify-between">
      <span class="font-bold" :class="size === 'sm' ? 'text-md' : 'text-2xl'"
        >{{ point }}/5</span
      >
      <div class="flex flex-row">
        <i
          v-for="i in 5"
          :key="i"
          :id="i"
          class="bx text-yellow-500 cursor-pointer"
          :class="[
            point > i || point === 5
              ? 'bxs-star'
              : point > i - 0.5 && point < i + 1
              ? 'bxs-star-half'
              : 'bx-star',
            size === 'sm' ? 'text-md' : 'text-3xl mx-2',
          ]"
          :disabled="disabled"
        ></i>
      </div>
    </div>
    <div
      class="
        flex flex-col
        justify-center
        items-center
        bg-gray-100
        dark:bg-content-bg
        rounded-xl
        p-5
        mt-3
      "
      v-if="point === 0"
    >
      <p class="mb-3">{{ $t('startRate.nobody') }}</p>
      <vs-button class="m-0">{{ $t('startRate.beFirst') }}</vs-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StarRate',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    point: {
      type: Number,
    },
    size: {
      type: String,
    },
  },
  data() {
    return {
      hover: null,
    }
  },
}
</script>
