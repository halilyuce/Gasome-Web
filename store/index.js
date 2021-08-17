export const state = () => ({
  user: null,
  loading: false,
  mode: 'dark',
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
  setRegisterLoading(state, payload) {
    state.registerLoading = payload
  },
  setMode(state, payload) {
    state.mode = payload
  },
}
export const actions = {
  async getSettings({ commit }) {
    const mode = localStorage.getItem('mode') || null
    if (mode) {
      await commit('setMode', mode)
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
}
