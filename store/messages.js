export const state = () => ({
  loading: false,
  sendLoading: false,
  messagesLoading: false,
  contacts: [],
  messages: [],
  page: 0,
  enough: false,
  selected: null,
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
  },
  setMessagesVal(state, payload) {
    state.messages = payload
  },
  setSelected(state, payload) {
    state.page = 0
    state.enough = false
    state.selected = payload
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
  async setSelected({ commit }, payload) {
    commit('setSelected', payload)
  },
  async setMessages({ commit }, payload) {
    commit('setMessagesVal', payload)
  },
  async setPage({ commit }, payload) {
    commit('setPage', payload)
  },
  async toggleLoading({ commit }, payload) {
    commit('setLoading', payload)
  },
  async toggleMessagesLoading({ commit }, payload) {
    commit('setMessagesLoading', payload)
  },
}
