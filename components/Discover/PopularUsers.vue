<template>
  <div class="bg-white dark:bg-black py-3 px-5 rounded-xl">
    <h3 v-if="userData.title">
      {{ userData.title }}
    </h3>
    <div
      v-if="userData.list.length > 0"
      class="py-4 overflow-x-auto disable-scrollbars"
      :class="isRow ? 'grid grid-cols-2 gap-2' : 'flex space-x-2'"
    >
      <n-link
        v-for="item in userData.list"
        :key="item.user.id"
        :to="'/u/' + item.user.username"
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
        :class="isRow ? 'col-span-2 md:col-span-1' : ''"
      >
        <img
          :src="smallAvatar + item.user.avatar + '.jpg'"
          :alt="'avatar'"
          class="w-12 h-12 object-cover rounded-2xl"
        />
        <div class="flex flex-col text-sm ml-2">
          <b class="overflow-ellipsis truncate">{{ item.user.name }}</b>
          <span>@{{ item.user.username }}</span>
        </div>
      </n-link>
    </div>
    <NoData v-else />
  </div>
</template>

<script>
import NoData from '@/components/UI/NoData'
export default {
  name: 'PopularUsers',
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
