export const state = () => ({
  loading: false,
  messagesLoading: false,
  contacts: [],
  messages: [],
  selected: null,
})
export const getters = {}
export const mutations = {
  setLoading(state, payload) {
    state.loading = payload
  },
  setContacts(state, payload) {
    state.contacts = [...state.contacts, ...payload]
  },
  setMessages(state, payload) {
    state.messages = [...state.messages, ...payload].reverse()
  },
  setMessagesVal(state, payload) {
    state.messages = payload
  },
  setSelected(state, payload) {
    state.selected = payload
    const index = state.contacts.findIndex((item) => item === payload)
    if (index > -1) {
      var element = state.contacts[index]
      state.contacts.splice(index, 1)
      state.contacts.splice(0, 0, element)
    }
  },
  setMessagesLoading(state, payload) {
    state.messagesLoading = payload
  },
}
export const actions = {
  async getContacts({ dispatch, commit }) {
    await commit('setLoading', true)
    try {
      const response = await this.$axios.get('/api/messagebox')
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
  async getMessages({ dispatch, commit }, payload) {
    await commit('setMessagesLoading', true)
    try {
      const response = await this.$axios.get(
        '/api/conversation/' + payload.id + '?page=' + payload.page
      )
      commit('setMessages', response.data.data.data)
      commit('setMessagesLoading', false)
      return response.data.data
    } catch (error) {
      dispatch('alert/error', error.response, {
        root: true,
      })
      commit('setMessagesLoading', false)
      throw 'Unable to load messages'
    }
  },
  async setSelected({ commit }, payload) {
    commit('setSelected', payload)
  },
  async setMessages({ commit }, payload) {
    commit('setMessagesVal', payload)
  },
}
