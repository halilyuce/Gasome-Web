export const state = () => ({
  loading: false,
  contacts: [],
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
  setSelected(state, payload) {
    state.selected = payload
  },
}
export const actions = {
  async getContacts({ dispatch, commit }, payload) {
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
  async setSelected({ commit }, payload) {
    commit('setSelected', payload)
  },
}
