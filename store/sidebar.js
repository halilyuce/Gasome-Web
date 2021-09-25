export const state = () => ({
  recommendedUsers: [],
  trends: [],
  loading: false,
  trendsLoading: false,
  recommendsLoading: false,
})
export const getters = {}
export const mutations = {
  setLoading(state, payload) {
    state.loading = payload
  },
  setTrendsLoading(state, payload) {
    state.trendsLoading = payload
  },
  setRecommendsLoading(state, payload) {
    state.recommendsLoading = payload
  },
  setTrends(state, payload) {
    state.trends = payload
  },
  setRecommendedUsers(state, payload) {
    state.recommendedUsers = payload
  },
}
export const actions = {
  async getRecommendedUsers({ commit, dispatch }) {
    commit('setRecommendsLoading', true)
    try {
      const response = await this.$axios.get('/api/recommendedUsers')
      commit('setRecommendedUsers', response.data.data)
      commit('setRecommendsLoading', false)
    } catch (error) {
      dispatch('alert/error', error.response, {
        root: true,
      })
      commit('setRecommendsLoading', false)
    }
  },
  async getTrends({ commit, dispatch }) {
    commit('setTrendsLoading', true)
    try {
      const response = await this.$axios.get('/api/getTrendTopics?weekly=true')
      commit('setTrends', response.data.data.data)
      commit('setTrendsLoading', false)
    } catch (error) {
      dispatch('alert/error', error.response, {
        root: true,
      })
      commit('setTrendsLoading', false)
    }
  },
}
