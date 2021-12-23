<template>
  <div>
    <div class="flex justify-between items-center">
      <div v-if="!hide" class="flex flex-row items-end leading-none">
        <span
          class="font-bold dark:text-gray-300 text-gray-600"
          :class="size === 'sm' ? 'text-md' : 'text-6xl'"
          >{{ point }}</span
        >
        <div class="flex justify-between" :class="{ 'w-56': total > 0 }">
          <span class="text-xs ml-1 text-gray-500">{{ $t('g.outOf') }}</span>
          <span v-if="total > 0" class="text-xs text-gray-500">{{
            total + ' ' + $t('startRate.rates')
          }}</span>
        </div>
      </div>
      <div v-if="size === 'sm'" class="flex flex-row">
        <i
          v-for="i in 5"
          :key="i"
          :id="i"
          class="bx text-yellow-500 text-sm cursor-pointer"
          :class="[
            parseFloat(point) >= i
              ? 'bxs-star'
              : parseFloat(point) > i - 0.5 && parseFloat(point) < i + 1
              ? 'bxs-star-half'
              : 'bx-star',
          ]"
        ></i>
      </div>
      <div class="flex flex-row w-full ml-5" v-else>
        <div class="flex flex-col items-end mr-1">
          <div class="flex flex-row">
            <i
              v-for="i in 5"
              :key="i"
              :id="i"
              class="bx text-gray-500 dark:text-gray-300 bxs-star text-xs"
            ></i>
          </div>
          <div class="flex flex-row">
            <i
              v-for="i in 4"
              :key="i"
              :id="i"
              class="bx text-gray-500 dark:text-gray-300 bxs-star text-xs"
            ></i>
          </div>
          <div class="flex flex-row">
            <i
              v-for="i in 3"
              :key="i"
              :id="i"
              class="bx text-gray-500 dark:text-gray-300 bxs-star text-xs"
            ></i>
          </div>
          <div class="flex flex-row">
            <i
              v-for="i in 2"
              :key="i"
              :id="i"
              class="bx text-gray-500 dark:text-gray-300 bxs-star text-xs"
            ></i>
          </div>
          <div class="flex flex-row">
            <i class="bx text-gray-500 dark:text-gray-300 bxs-star text-xs"></i>
          </div>
        </div>
        <ul class="flex flex-col justify-center space-y-2 w-full">
          <li class="relative w-full h-1 dark:bg-gray-700 bg-gray-200">
            <span
              :style="'width:' + (ratings.five / total) * 100 + '%'"
              class="absolute left-0 top-0 h-1 dark:bg-gray-300 bg-gray-500"
            ></span>
          </li>
          <li class="relative w-full h-1 dark:bg-gray-700 bg-gray-200">
            <span
              :style="'width:' + (ratings.four / total) * 100 + '%'"
              class="absolute left-0 top-0 h-1 dark:bg-gray-300 bg-gray-500"
            ></span>
          </li>
          <li class="relative w-full h-1 dark:bg-gray-700 bg-gray-200">
            <span
              :style="'width:' + (ratings.three / total) * 100 + '%'"
              class="absolute left-0 top-0 h-1 dark:bg-gray-300 bg-gray-500"
            ></span>
          </li>
          <li class="relative w-full h-1 dark:bg-gray-700 bg-gray-200">
            <span
              :style="'width:' + (ratings.two / total) * 100 + '%'"
              class="absolute left-0 top-0 h-1 dark:bg-gray-300 bg-gray-500"
            ></span>
          </li>
          <li class="relative w-full h-1 dark:bg-gray-700 bg-gray-200">
            <span
              :style="'width:' + (ratings.one / total) * 100 + '%'"
              class="absolute left-0 top-0 h-1 dark:bg-gray-300 bg-gray-500"
            ></span>
          </li>
        </ul>
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
      type: String,
    },
    size: {
      type: String,
    },
    total: {
      type: Number,
      default: 0,
    },
    hide: {
      type: Boolean,
      default: false,
    },
    ratings: {
      type: Object,
    },
  },
  data() {
    return {
      hover: null,
    }
  },
}
</script>
