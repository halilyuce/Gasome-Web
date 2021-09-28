<template>
  <div
    class="bg-white dark:bg-black col-span-12 md:col-span-8 max-h-screen relative overflow-auto"
  >
    <!-- Breadcrumb -->

    <div
      class="flex items-center justify-between py-3 px-5 border-b border-gray-200 dark:border-gray-700"
    >
      <div v-if="selected" class="flex flex-row items-center">
        <vs-avatar size="36">
          <img
            :src="`${smallAvatar + selected.user.avatar}.jpg`"
            alt="Avatar"
          />
        </vs-avatar>
        <div class="flex flex-col ml-3">
          <h5>{{ selected.user.name }}</h5>
          <span class="text-gray-400 text-sm mr-1">{{
            '@' + selected.user.username
          }}</span>
        </div>
      </div>
      <div class="flex flex-row space-x-4">
        <vs-button icon color="#666" flat
          ><i class="bx bx-block"></i
        ></vs-button>
        <vs-button icon color="#666" flat
          ><i class="bx bx-trash"></i
        ></vs-button>
      </div>
    </div>

    <ul v-if="messages" class="px-5">
      <li class="flex my-2" v-for="message in messages" :key="message.id">
        <div
          class="flex rounded-2xl px-5 py-2 text-sm"
          :class="
            message.from === loggedInUser.id
              ? 'bg-purple-500 text-white ml-auto'
              : 'bg-gray-100 dark:bg-content-bg'
          "
        >
          {{ message.text }}
        </div>
      </li>
    </ul>

    <div class="absolute bottom-0 left-0 p-5 w-full">
      <div
        class="flex justify-between items-center py-2 px-3 text-gray-400 border border-white dark:border-gray-800 text-sm bg-gray-100 dark:bg-content-bg rounded-2xl shadow-2xl h-14"
      >
        <div class="flex flex-row items-center">
          <vs-avatar size="28">
            <img
              :src="`${smallAvatar + loggedInUser.avatar}.jpg`"
              alt="Avatar"
            />
          </vs-avatar>
          <span class="ml-3">Type something...</span>
        </div>
        <div class="flex flex-row space-x-2">
          <vs-button icon color="#666" transparent
            ><i class="bx bx-images"></i
          ></vs-button>
          <vs-button icon floating
            ><i class="bx bxs-paper-plane"></i
          ></vs-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  layout: 'messages',
  computed: {
    ...mapGetters(['loggedInUser']),
    ...mapState({
      selected: (state) => state.messages.selected,
      messagesState: (state) => state.messages.messages,
    }),
    messages: {
      get() {
        return this.messagesState
      },
      set(value) {
        this.setMessages(value)
      },
    },
  },
  data() {
    return {
      smallAvatar: process.env.AVATAR_SMALL,
    }
  },
}
</script>

<style></style>
