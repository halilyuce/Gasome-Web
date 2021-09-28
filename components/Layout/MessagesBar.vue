<template>
  <div
    class="flex flex-col bg-white dark:bg-black w-full max-h-screen border-l border-r border-gray-200 dark:border-gray-700"
  >
    <div class="mx-5 mt-5 mb-2 flex flex-row items-center">
      <h1 class="mb-1 mr-1">Messages</h1>
      <vs-button size="small" flat>{{ messagesBadge }}</vs-button>
    </div>

    <vs-input
      color="#7d33ff"
      type="search"
      v-model="search"
      icon-after
      placeholder="Search..."
      class="w-full px-5"
    >
      <template #icon>
        <i class="bx bx-search"></i>
      </template>
    </vs-input>

    <div class="flex justify-between items-center mx-5 mt-5">
      <h3>Contacts</h3>
      <vs-button success flat>
        <i class="bx bxs-user-plus"></i>
      </vs-button>
    </div>

    <ul
      class="divide-y divide-gray-200 dark:divide-gray-700 mt-5 overflow-auto disable-scrollbars"
    >
      <li
        v-for="contact in contacts"
        :key="contact.id"
        class="flex justify-between cursor-pointer pl-5 pr-3 py-4"
        :class="{ 'bg-gray-100 dark:bg-content-bg': contact === selected }"
      >
        <div class="flex flex-row">
          <vs-avatar size="42">
            <img
              :src="`${smallAvatar + contact.user.avatar}.jpg`"
              alt="Avatar"
            />
          </vs-avatar>
          <div class="flex flex-col ml-3">
            <h4 class="truncate w-36">
              {{ contact.user.name }}
            </h4>
            <span class="text-gray-400 text-xs">
              {{ '@' + contact.user.username }}
            </span>
          </div>
        </div>
        <div class="flex flex-col">
          <span class="text-xs text-gray-500 dark:text-gray-400">{{
            $moment(contact.created_at).fromNow(true)
          }}</span>
          <vs-button v-if="contact.unread > 0" size="mini" flat>{{
            contact.unread
          }}</vs-button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState({
      selectedState: (state) => state.messages.selected,
      messagesBadge: (state) => state.messagesBadge,
      contacts: (state) => state.messages.contacts,
    }),
    selected: {
      get() {
        return this.selectedState
      },
      set(value) {
        this.setSelected(value)
      },
    },
  },
  data() {
    return {
      search: '',
      smallAvatar: process.env.AVATAR_SMALL,
    }
  },
  mounted() {
    this.getContacts().then(() => {
      this.selected = this.contacts[0]
    })
  },
  methods: {
    ...mapActions({
      getContacts: 'messages/getContacts',
      setSelected: 'messages/setSelected',
    }),
  },
}
</script>

<style></style>
