export const state = () => ({
  loading: false,
  sendLoading: false,
  messagesLoading: false,
  contacts: [],
  messages: [],
  page: 0,
  enough: false,
  selected: null,
  query: null,
  socket: false,
})
export const getters = {}
export const mutations = {
  setLoading(state, payload) {
    state.loading = payload
  },
  setSendLoading(state, payload) {
    state.sendLoading = payload
  },
  setPage(state, payload) {
    state.page = payload
  },
  setEnough(state, payload) {
    state.enough = payload
  },
  setSocket(state, payload) {
    state.socket = payload
  },
  setContacts(state, payload) {
    state.contacts = [...state.contacts, ...payload]
  },
  setMessages(state, payload) {
    // state.messages = [...payload.reverse(), ...state.messages]
    state.messages.unshift(...payload.reverse())
    if (payload.length < 10) {
      state.enough = true
    }
  },
  insertMessage(state, payload) {
    state.messages.push(payload)
    state.selected.created_at = payload.created_at
  },
  setMessagesVal(state, payload) {
    state.messages = payload
  },
  messageFromAnother(state, payload) {
    var index = state.contacts.findIndex(
      (contact) => contact.user.id === payload.user.id
    )
    if (index > -1) {
      state.contacts[index].unread += 1
    } else {
      const selected = {
        id: +new Date(),
        from: payload.from,
        to: payload.to,
        unread: 1,
        created_at: payload.created_at,
        updated_at: payload.updated_at,
        user: payload.user,
      }
      state.contacts.unshift(selected)
    }
  },
  setSelected(state, payload) {
    state.page = 0
    if (state.selected && payload.user.id !== state.selected.user.id) {
      state.enough = false
    }
    state.query = null
    state.selected = payload
    state.selected.unread = 0
    var index = state.contacts.findIndex(
      (contact) => contact.user.id === payload.user.id
    )
    if (index === -1) {
      state.contacts.unshift(payload)
    }
  },
  setQuery(state, payload) {
    state.query = payload
  },
  selectQueryUser(state, payload) {
    let query = parseInt(state.query)
    var index = payload.findIndex((contact) => contact.user.id === query)
    if (index > -1) {
      state.selected = payload[index]
    }
  },
  setMessagesLoading(state, payload) {
    state.messagesLoading = payload
  },
}
export const actions = {
  async getContacts({ dispatch, commit }, page) {
    try {
      const response = await this.$axios.get('/api/messagebox?page=' + page)
      commit('setLoading', false)
      commit('setContacts', response.data.data.data)
      if (page === 1) {
        commit('selectQueryUser', response.data.data.data)
      }
      return response.data
    } catch (error) {
      dispatch('alert/error', error.response, {
        root: true,
      })
      commit('setLoading', false)
      throw 'Unable to load contacts'
    }
  },
  async getMessages({ state, dispatch, commit }, id) {
    if (!state.enough) {
      commit('setPage', state.page + 1)
      try {
        const response = await this.$axios.get(
          '/api/conversation/' + id + '?page=' + state.page
        )
        commit('setMessages', response.data.data.data)
        commit('setMessagesLoading', false)
        return response.data.data.data
      } catch (error) {
        dispatch('alert/error', error.response, {
          root: true,
        })
        commit('setMessagesLoading', false)
        throw 'Unable to load messages'
      }
    } else {
      return []
    }
  },
  async sendMessage({ dispatch, commit }, payload) {
    commit('setSendLoading', true)
    try {
      const response = await this.$axios.post('/api/conversation/send', payload)
      commit('insertMessage', response.data.data)
      commit('setSendLoading', false)
      return response.data
    } catch (error) {
      dispatch('alert/error', error.response, {
        root: true,
      })
      commit('setSendLoading', false)
      throw 'Unable to send message'
    }
  },
  async getUser({ dispatch }, id) {
    try {
      const response = await this.$axios.get('/api/info', {
        params: { selected_user_id: id },
      })
      return response.data.data
    } catch (error) {
      dispatch('alert/error', error.response, {
        root: true,
      })
      throw 'Unable to get user'
    }
  },
  async setSelected({ commit }, payload) {
    commit('setSelected', payload)
  },
  async setMessages({ commit }, payload) {
    commit('setMessagesVal', payload)
  },
  async setPage({ commit }, payload) {
    commit('setPage', payload)
  },
  async setQuery({ commit }, payload) {
    commit('setQuery', payload)
  },
  async insertMessage({ commit }, payload) {
    commit('insertMessage', payload)
  },
  async toggleLoading({ commit }, payload) {
    commit('setLoading', payload)
  },
  async toggleMessagesLoading({ commit }, payload) {
    commit('setMessagesLoading', payload)
  },
  async messageFromAnother({ commit }, payload) {
    commit('messageFromAnother', payload)
  },
  async setSocket({ commit }, payload) {
    commit('setSocket', payload)
  },
}
