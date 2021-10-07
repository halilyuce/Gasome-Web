<template>
  <div
    class="
      flex flex-col
      bg-white
      dark:bg-black
      w-full
      max-h-screen
      border-l border-r border-gray-200
      dark:border-gray-700
    "
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
      <vs-button size="small" success flat disabled>
        <i class="bx bxs-user-plus text-base"></i>
        <span class="mx-2 text-xs">New </span>
      </vs-button>
    </div>

    <ul
      class="
        relative
        divide-y divide-gray-200
        dark:divide-gray-700
        mt-5
        overflow-auto
        disable-scrollbars
      "
      ref="contacts"
      :class="{ 'h-screen': loading }"
    >
      <li
        v-for="contact in filteredList"
        :key="contact.id"
        class="flex justify-between cursor-pointer pl-5 pr-3 py-4"
        :class="{ 'bg-gray-100 dark:bg-content-bg': contact === selected }"
        @click="selected = contact"
      >
        <div class="flex flex-row">
          <vs-avatar badge-color="danger" size="42">
            <img
              :src="`${smallAvatar + contact.user.avatar}.jpg`"
              alt="Avatar"
            />
            <template #badge v-if="contact.unread > 0">
              <span class="dark:text-white">{{ contact.unread }}</span>
            </template>
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
        <span class="text-xs text-gray-500 dark:text-gray-400">{{
          $moment(contact.created_at).fromNow(true)
        }}</span>
      </li>

      <client-only>
        <infinite-loading
          v-if="filteredList"
          spinner="spiral"
          :distance="300"
          @infinite="infiniteHandler"
          ><span slot="no-results"></span><span slot="no-more"></span
        ></infinite-loading>
      </client-only>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters(['loggedInUser']),
    ...mapState({
      loading: (state) => state.messages.loading,
      query: (state) => state.messages.query,
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
    filteredList() {
      return this.contacts.filter((contact) => {
        return (
          contact.user.name.toLowerCase().includes(this.search.toLowerCase()) ||
          contact.user.username
            .toLowerCase()
            .includes(this.search.toLowerCase())
        )
      })
    },
  },
  data() {
    return {
      search: '',
      page: 0,
      smallAvatar: process.env.AVATAR_SMALL,
    }
  },
  watch: {
    selected(newVal, oldVal) {
      const self = this
      if (newVal !== oldVal) {
        this.setMessages([])
      }
      if (newVal.user.id !== parseInt(this.$route.query.room)) {
        this.$router.replace(
          `${this.$route.path}?room=${this.selected.user.id}`
        )
      }
    },
  },
  methods: {
    ...mapActions({
      getContacts: 'messages/getContacts',
      getMessages: 'messages/getMessages',
      setSelected: 'messages/setSelected',
      setMessages: 'messages/setMessages',
      getUser: 'messages/getUser',
    }),
    checkSender(message) {
      if (message.to === this.loggedInUser.id) {
        return message.from
      }
      return message.to
    },
    infiniteHandler($state) {
      const self = this
      this.page += 1
      this.getContacts(this.page).then(function (res) {
        if (!self.selected && !self.query) {
          self.selected = self.contacts[0]
        }

        if (!self.selected && self.query && self.page === 1) {
          self
            .getUser(self.query)
            .then((user) => {
              self.selected = {
                id: +new Date(),
                from: self.loggedInUser.id,
                to: parseInt(self.query),
                unread: 0,
                created_at: new Date(),
                updated_at: new Date(),
                user: user,
              }
            })
            .catch((err) => {
              self.$vs.notification({
                duration: 5000,
                progress: 'auto',
                flat: true,
                color: 'danger',
                icon: `<i class='bx bxs-error' ></i>`,
                position: 'top-right',
                title: 'An error occured!',
                text: 'An error occurred while load the messages. Please try again.',
              })
            })
        }

        if (res.data.data.length < 10) {
          $state.complete()
        } else {
          $state.loaded()
        }
      })
    },
  },
}
</script>

<style></style>
