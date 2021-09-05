<template>
  <div>
    <div v-if="point > 0" class="grid grid-cols-12">
      <span
        class="font-bold col-span-3 flex items-center"
        :class="size === 'sm' ? 'text-md' : 'text-2xl'"
        >{{ point }}/5</span
      >
      <vs-button-group class="col-span-9 items-center" dark>
        <vs-button
          v-for="i in 5"
          :key="i"
          transparent
          :active-disabled="disabled"
          :size="size === 'sm' ? 'small' : 'default'"
        >
          <i
            class="bx"
            :class="[
              point > i || point === 5
                ? 'bxs-star'
                : point > i - 0.5 && point < i + 1
                ? 'bxs-star-half'
                : 'bx-star',
              size === 'sm' ? 'text-md' : 'text-3xl',
            ]"
            :id="i"
          ></i>
        </vs-button>
      </vs-button-group>
    </div>
    <div v-else>
      <p>Nobody rated this game yet.</p>
      <vs-button class="m-0">Be first!</vs-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StarRate',
  data() {
    return {
      hover: null,
    }
  },
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
}
</script>

<style scoped></style>
