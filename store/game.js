const getDefaultState = () => {
  return {
    game: null,
    comments: null,
    loading: false,
    swaps: [],
    swapsLoading: false,
    swapsPage: 0,
    swapsEnough: false,
    wishes: [],
    wishesLoading: false,
    wishesPage: 0,
    wishesEnough: false,
  }
}
export const state = () => getDefaultState()
export const getters = {}
export const mutations = {
  setLoading(state, payload) {
    state.loading = payload
  },
  setGame(state, payload) {
    state.game = payload
  },
  setComments(state, payload) {
    state.comments = payload
  },
  setSwapsPage(state, payload) {
    state.swapsPage = payload
  },
  setSwapsEnough(state, payload) {
    state.swapsEnough = payload
  },
  setSwapsLoading(state, payload) {
    state.swapsLoading = payload
  },
  insertSwaps(state, payload) {
    state.swaps = [...state.swaps, ...payload]
  },
  setWishesPage(state, payload) {
    state.wishesPage = payload
  },
  setWishesEnough(state, payload) {
    state.wishesEnough = payload
  },
  setWishesLoading(state, payload) {
    state.wishesLoading = payload
  },
  insertWishes(state, payload) {
    state.wishes = [...state.wishes, ...payload]
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
    commit('setLoading', true)
    try {
      const response = await this.$axios.get('/api/game?id=' + id)
      await commit('setGame', response.data.data)
      commit('setLoading', false)
    } catch (error) {
      await dispatch('alert/error', error.response, {
        root: true,
      })
      commit('setLoading', false)
    }
  },
  async getGameComments({ commit }, id, page = 1) {
    commit('setLoading', true)
    try {
      const response = await this.$axios.get(
        '/api/gamecomment?id=' + id + '&page=' + page
      )
      await commit('setComments', response.data.data)
      commit('setLoading', false)
    } catch (error) {
      await dispatch('alert/error', error.response, {
        root: true,
      })
      commit('setLoading', false, { root: true })
    }
  },
  async getSwaps({ dispatch, state, commit }, id) {
    try {
      const response = await this.$axios.get(
        '/api/getGameSwapList?gameId=' + id + '&page=' + state.swapsPage
      )
      commit('insertSwaps', response.data.data.data)
      commit('setSwapsLoading', false)
      return response.data.data
    } catch (error) {
      dispatch('alert/error', error.response, {
        root: true,
      })
      commit('setSwapsLoading', false)
      throw 'Unable to fetch swaps'
    }
  },
  async toggleSwapsEnough({ commit }, payload) {
    commit('setSwapsEnough', payload)
  },
  async setSwapsPage({ commit }, payload) {
    commit('setSwapsPage', payload)
  },
  async toggleSwapsLoading({ commit }, payload) {
    commit('setSwapsLoading', payload)
  },
  async getWishes({ dispatch, state, commit }, id) {
    try {
      const response = await this.$axios.get(
        '/api/getGameWishList?gameId=' + id + '&page=' + state.wishesPage
      )
      commit('insertWishes', response.data.data.data)
      commit('setWishesLoading', false)
      return response.data.data
    } catch (error) {
      dispatch('alert/error', error.response, {
        root: true,
      })
      commit('setWishesLoading', false)
      throw 'Unable to fetch wishes'
    }
  },
  async toggleWishesEnough({ commit }, payload) {
    commit('setWishesEnough', payload)
  },
  async setWishesPage({ commit }, payload) {
    commit('setWishesPage', payload)
  },
  async toggleWishesLoading({ commit }, payload) {
    commit('setWishesLoading', payload)
  },
}
