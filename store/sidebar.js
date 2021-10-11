const getDefaultState = () => {
  return {
    recommendedUsers: [],
    trends: [],
    loading: false,
    trendsLoading: false,
    recommendsLoading: false,
    followLoading: false,
  }
}
export const state = () => getDefaultState()
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
  setFollowLoading(state, payload) {
    state.followLoading = payload
  },
  resetState(state) {
    Object.assign(state, getDefaultState())
  },
}
export const actions = {
  async resetState({ commit }) {
    commit('resetState')
  },
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
  async follow({ dispatch, commit }, username) {
    commit('setFollowLoading', true)
    try {
      const response = await this.$axios.post('/api/follow', {
        selected_user: username,
      })
      commit('setFollowLoading', false)
      return response.data.data
    } catch (error) {
      dispatch('alert/error', error.response, {
        root: true,
      })
      commit('setFollowLoading', false)
      throw 'Unable to follow/unfollow'
    }
  },
}
