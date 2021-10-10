<template>
  <div>
    <div v-if="point > 0" class="flex flex-row justify-between">
      <span
        class="font-bold flex items-center"
        :class="size === 'sm' ? 'text-md' : 'text-2xl'"
        >{{ point }}/5</span
      >
      <vs-button-group dark>
        <vs-button
          v-for="i in 5"
          :key="i"
          transparent
          warn
          :active-disabled="disabled"
          :size="size === 'sm' ? 'small' : 'default'"
        >
          <i
            :id="i"
            class="bx"
            :class="[
              point > i || point === 5
                ? 'bxs-star'
                : point > i - 0.5 && point < i + 1
                ? 'bxs-star-half'
                : 'bx-star',
              size === 'sm' ? 'text-md' : 'text-3xl',
            ]"
          ></i>
        </vs-button>
      </vs-button-group>
    </div>
    <div v-else>
      <p>{{ $t('startRate.nobody') }}</p>
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
