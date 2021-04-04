export const state = () => ({
  recommendedUsers: null,
  loading: false,
})
export const getters = {}
export const mutations = {
  setLoading(state, payload) {
    state.loading = payload
  },
  setRecommendedUsers(state, payload) {
    state.recommendedUsers = payload
  },
}
export const actions = {
  async getRecommendedUsers({ commit }) {
    try {
      const response = await this.$axios.get('/api/recommendedUsers')
      await commit('setRecommendedUsers', response.data.data)
    } catch (error) {
      await dispatch('alert/error', error.response, {
        root: true,
      })
    }
  },
}
