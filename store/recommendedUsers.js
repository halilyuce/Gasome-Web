const getDefaultState = () => {
  return {
    users: [],
    loading: false,
    followLoading: false,
  }
}
export const state = () => getDefaultState()
export const getters = {}
export const mutations = {
  setLoading(state, payload) {
    state.loading = payload
  },
  setRecommendedUsers(state, payload) {
    state.users = payload
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
    commit('setLoading', true)
    try {
      const response = await this.$axios.get('/api/recommendedUsers')
      commit('setRecommendedUsers', response.data.data)
      commit('setLoading', false)
    } catch (error) {
      dispatch('alert/error', error.response, {
        root: true,
      })
      commit('setLoading', false)
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
      // throw 'Unable to follow/unfollow'
    }
  },
}
