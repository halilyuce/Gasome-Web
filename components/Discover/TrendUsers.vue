<template>
  <div class="bg-white dark:bg-black py-3 px-5 rounded-xl">
    <h3 v-if="userData.title">
      {{ userData.title }}
    </h3>
    <div
      v-if="userData.list.length > 0"
      class="py-4"
      :class="isRow ? 'grid grid-cols-2 gap-2' : 'flex overflow-x-scroll '"
    >
      <n-link
        v-for="user in userData.list"
        :key="user.id"
        :to="'/u/' + user.username"
        class="
          flex flex-shrink-0
          items-center
          pl-2
          py-2
          pr-4
          rounded-2xl
          dark:bg-content-bg
          bg-gray-200 bg-opacity-25
          hover:bg-opacity-40
        "
        :class="isRow ? 'col-span-2 md:col-span-1' : 'mr-2'"
      >
        <img
          :src="smallAvatar + user.avatar + '.jpg'"
          :alt="user.name + 's avatar'"
          class="w-12 h-12 object-cover rounded-2xl"
        />
        <div class="flex flex-col text-sm ml-2">
          <b class="overflow-ellipsis truncate">{{ user.name }}</b>
          <span>@{{ user.username }}</span>
        </div>
      </n-link>
    </div>
    <NoData v-else />
  </div>
</template>

<script>
import NoData from '@/components/UI/NoData'
export default {
  name: 'TrendUsers',
  components: { NoData },
  props: {
    userData: {
      type: Object,
      required: true,
    },
    isRow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      smallAvatar: process.env.AVATAR_SMALL,
    }
  },
}
</script>
