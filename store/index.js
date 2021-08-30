export const state = () => ({
  user: null,
  loading: false,
  mode: 'dark',
  tab: 'home',
  notificationBadge: 0,
  messagesBadge: 0,
  registerLoading: false,
})
export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn
  },

  loggedInUser(state) {
    return state.auth.user
  },
}
export const mutations = {
  setLoading(state, payload) {
    state.loading = payload
  },
  setTab(state, payload) {
    state.tab = payload
  },
  setRegisterLoading(state, payload) {
    state.registerLoading = payload
  },
  setMode(state, payload) {
    state.mode = payload
  },
  setBadges(state, payload) {
    state.notificationBadge = payload.notifications
    state.messagesBadge = payload.messages
  },
}
export const actions = {
  async getSettings({ commit }) {
    const mode = localStorage.getItem('mode') || null
    if (mode) {
      await commit('setMode', mode)
    }
  },
  async getBadges({ commit }) {
    try {
      const response = await this.$axios.get('/api/getBadgeCount')
      await commit('setBadges', response.data.data)
    } catch (error) {
      await dispatch('alert/error', error.response, {
        root: true,
      })
    }
  },
  async register({ dispatch, commit }, payload) {
    await commit('setRegisterLoading', true)
    try {
      const response = await this.$axios.post('/api/users/signup', payload)
      await commit('setRegisterLoading', false)
      return response.data.access_token
    } catch (error) {
      await dispatch('alert/error', error.response, {
        root: true,
      })
      await commit('setRegisterLoading', false)
      throw 'Unable to register'
    }
  },
  async toggleRegisterLoading({ commit }, payload) {
    await commit('setRegisterLoading', payload)
  },
  async setTab({ commit }, payload) {
    await commit('setTab', payload)
  },
}
