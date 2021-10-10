<template>
  <div
    class="
      flex flex-row
      lg:flex-col
      bg-white
      dark:bg-black
      w-full
      2xl:w-1/2 2xl:ml-auto
      lg:h-screen lg:border-l lg:border-r
      border-gray-200 border-b
      lg:border-b-0
      dark:border-gray-700
    "
  >
    <div class="mx-5 mt-5 mb-2 flex flex-row items-center hidden lg:flex">
      <h1 class="mb-1 mr-1">{{ $t('messagesBar.messagesTitle') }}</h1>
      <vs-button size="small" flat>{{ messagesBadge }}</vs-button>
    </div>

    <div class="hidden lg:block">
      <vs-input
        v-model="search"
        color="#7d33ff"
        type="search"
        icon-after
        :placeholder="$t('messagesBar.search')"
        class="w-full px-5"
      >
        <template #icon>
          <i class="bx bx-search"></i>
        </template>
      </vs-input>
    </div>

    <div
      class="
        hidden
        lg:flex
        justify-between
        items-center
        lg:mx-5 lg:mt-5
        px-3
        lg:px-0
      "
    >
      <h3 class="flex">{{ $t('messagesBar.contacts') }}</h3>
      <vs-button size="small" success flat disabled>
        <i class="bx bxs-user-plus text-base"></i>
        <span class="mx-2 text-xs">{{ $t('messagesBar.new') }}</span>
      </vs-button>
    </div>

    <div
      ref="contacts"
      class="
        relative
        flex flex-row
        lg:flex-col lg:divide-y lg:divide-gray-200
        dark:divide-gray-700
        pl-3
        lg:pl-0
        mt-4
        overflow-auto
        disable-scrollbars
      "
      :class="{ 'w-screen lg:h-screen': loading }"
    >
      <div
        v-for="contact in filteredList"
        :key="contact.id"
        class="
          flex
          lg:justify-between
          cursor-pointer
          p-2
          rounded-lg
          lg:rounded-none lg:pl-5 lg:pr-3 lg:py-4
        "
        :class="{ 'bg-gray-100 dark:bg-content-bg': contact === selected }"
        @click="selected = contact"
      >
        <div class="flex flex-row">
          <vs-avatar badge-color="danger" size="42">
            <img
              :src="`${smallAvatar + contact.user.avatar}.jpg`"
              alt="Avatar"
            />
            <template v-if="contact.unread > 0" #badge>
              <span class="dark:text-white">{{ contact.unread }}</span>
            </template>
          </vs-avatar>
          <div
            v-show="contact === selected || !isMobile"
            class="flex flex-col ml-3"
          >
            <h4 class="truncate lg:w-36">
              {{ contact.user.name }}
            </h4>
            <span class="text-gray-400 text-xs">
              {{ '@' + contact.user.username }}
            </span>
          </div>
        </div>
        <span
          class="
            hidden
            lg:flex
            text-xs text-right text-gray-500
            dark:text-gray-400
          "
          >{{ $moment(contact.created_at).fromNow(true) }}</span
        >
      </div>

      <client-only>
        <infinite-loading
          v-if="filteredList"
          spinner="spiral"
          :distance="300"
          @infinite="infiniteHandler"
          ><span slot="no-results"></span><span slot="no-more"></span
        ></infinite-loading>
      </client-only>
    </div>
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
    isMobile() {
      return window.innerWidth < 770
    },
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
              console.error(err)
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
