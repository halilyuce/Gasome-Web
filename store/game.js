export const state = () => ({
  game: null,
  comments: null,
})
export const getters = {}
export const mutations = {
  setGame(state, payload) {
    state.game = payload
  },
  setComments(state, payload) {
    state.comments = payload
  },
}
export const actions = {
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
