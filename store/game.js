const getDefaultState = () => {
  return {
    game: null,
    comments: null,
  }
}
export const state = () => getDefaultState()
export const getters = {}
export const mutations = {
  setGame(state, payload) {
    state.game = payload
  },
  setComments(state, payload) {
    state.comments = payload
  },
  resetState(state) {
    Object.assign(state, getDefaultState())
  },
}
export const actions = {
  async resetState({ commit }) {
    commit('resetState')
  },
  async getGameById({ commit }, id) {
    commit('setLoading', true, { root: true })
    try {
      const response = await this.$axios.get('/api/game?id=' + id)
      await commit('setGame', response.data.data)
      commit('setLoading', false, { root: true })
    } catch (error) {
      await dispatch('alert/error', error.response, {
        root: true,
      })
      commit('setLoading', false, { root: true })
    }
  },
  async getGameComments({ commit }, id, page = 1) {
    commit('setLoading', true, { root: true })
    try {
      const response = await this.$axios.get(
        '/api/gamecomment?id=' + id + '&page=' + page
      )
      await commit('setComments', response.data.data)
      commit('setLoading', false, { root: true })
    } catch (error) {
      await dispatch('alert/error', error.response, {
        root: true,
      })
      commit('setLoading', false, { root: true })
    }
  },
}
