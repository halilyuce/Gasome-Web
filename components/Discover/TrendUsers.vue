<template>
  <div class="bg-white dark:bg-black py-3 px-5 rounded-xl">
    <h3 v-if="userData.title">
      {{ userData.title }}
    </h3>
    <div
      v-if="userData.list.length > 0"
      class="flex py-4"
      :class="isRow ? 'grid grid-cols-2 gap-2' : 'overflow-x-auto'"
    >
      <n-link
        v-for="user in userData.list"
        :key="user.id"
        :to="'/u/' + user.username"
        class="
          flex
          items-center
          p-2
          rounded-xl
          bg-gray-200 bg-opacity-25
          hover:bg-opacity-40
        "
        :class="isRow ? 'col-span-2 md:col-span-1' : 'mr-2'"
      >
        <vs-avatar
          size="60"
          badge
          :badge-color="user.online ? 'success' : 'danger'"
          class="mr-2 w-full"
        >
          <img
            :src="smallAvatar + user.avatar + '.jpg'"
            :alt="user.name + 's avatar'"
          />
        </vs-avatar>
        <div class="flex flex-col text-sm">
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
