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
      <vs-button size="small" success flat>
        <i class="bx bxs-user-plus text-base"></i>
        <span class="mx-2 text-xs">New </span>
      </vs-button>
    </div>

    <ul
      class="relative divide-y divide-gray-200 dark:divide-gray-700 mt-5 overflow-auto disable-scrollbars"
      ref="contacts"
      :class="{ 'h-screen': loading }"
      v-infinite-scroll="loadMoreContacts"
      infinite-scroll-distance="500"
      infinite-scroll-throttle-delay="1000"
    >
      <li
        v-for="contact in contacts"
        :key="contact.id"
        class="flex justify-between cursor-pointer pl-5 pr-3 py-4"
        :class="{ 'bg-gray-100 dark:bg-content-bg': contact === selected }"
        @click="selected = contact"
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
import { mapState, mapGetters, mapActions } from 'vuex'
import infiniteScroll from 'vue-infinite-scroll'
export default {
  computed: {
    ...mapGetters(['loggedInUser']),
    ...mapState({
      loading: (state) => state.messages.loading,
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
      page: 0,
      messagesPage: 0,
      enough: false,
      smallAvatar: process.env.AVATAR_SMALL,
    }
  },
  watch: {
    selected(newVal, oldVal) {
      const self = this
      if (newVal !== oldVal) {
        this.setMessages([])
        this.getMessages({
          id: this.checkSender(newVal),
          page: this.messagesPage,
        }).then(res =>{
           self.getMessages({
          id: this.checkSender(newVal),
          page: 2,
        })
        })
      }
    },
    loading(newVal, oldVal) {
      if (newVal !== oldVal) {
        if (!newVal) {
          this.contactsLoading.close()
        } else {
          this.contactsLoading = this.$vs.loading({
            target: this.$refs.contacts,
          })
        }
      }
    },
  },
  methods: {
    ...mapActions({
      getContacts: 'messages/getContacts',
      getMessages: 'messages/getMessages',
      setSelected: 'messages/setSelected',
      setMessages: 'messages/setMessages',
      toggleLoading: 'messages/toggleLoading',
    }),
    checkSender(message) {
      if (message.to === this.loggedInUser.id) {
        return message.from
      }
      return message.to
    },
    async loadMoreContacts() {
      const self = this
      if (this.page === 0) {
        await this.toggleLoading(true)
      }
      if (!this.enough) {
        this.page += 1
        this.getContacts(this.page).then(function (res) {
          if (!self.selected) {
            self.selected = self.contacts[0]
          }
          if (res.data.data.length < 10) {
            self.enough = true
          } else {
            if (self.page === 1) {
              self.loadMoreContacts()
            }
          }
        })
      }
    },
  },
  directives: {
    infiniteScroll,
  },
}
</script>

<style></style>
