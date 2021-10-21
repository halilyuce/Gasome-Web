const getDefaultState = () => {
  return {
    trends: null,
    loading: false,
  }
}
export const state = () => getDefaultState()
export const getters = {}
export const mutations = {
  setLoading(state, payload) {
    state.loading = payload
  },
  setTrends(state, payload) {
    state.trends = payload
  },
  resetState(state) {
    Object.assign(state, getDefaultState())
  },
}
export const actions = {
  async resetState({ commit }) {
    commit('resetState')
  },
  async getTrends({ commit, dispatch }) {
    commit('setLoading', true)
    try {
      const response = await this.$axios.get('/api/getTrends')
      commit('setTrends', response.data.data)
      commit('setLoading', false)
    } catch (error) {
      dispatch('alert/error', error.response, {
        root: true,
      })
      commit('setLoading', false)
    }
  },
}
