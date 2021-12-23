const getDefaultState = () => {
  return {
    game: null,
    comments: null,
    loading: false,
    activeTab: 'info',
    swaps: [],
    swapsLoading: false,
    swapsPage: 0,
    swapsEnough: false,
    wishes: [],
    wishesLoading: false,
    wishesPage: 0,
    wishesEnough: false,
    wishPlatforms: [],
    wishPlatformsLoading: false,
    addWishLoading: false,
    deleteLoading: null,
  }
}
export const state = () => getDefaultState()
export const getters = {}
export const mutations = {
  setTab(state, payload) {
    state.activeTab = payload
  },
  setLoading(state, payload) {
    state.loading = payload
  },
  setDeleteLoading(state, payload) {
    state.deleteLoading = payload
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
  deleteSwap(state, payload) {
    const index = state.swaps.findIndex((swap) => swap.id === payload)
    if (index > -1) {
      state.swaps.splice(index, 1)
    }
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
  setAddWishLoading(state, payload) {
    state.addWishLoading = payload
  },
  setWishPlatformsLoading(state, payload) {
    state.wishPlatformsLoading = payload
  },
  insertWishPlatforms(state, payload) {
    state.wishPlatforms = [...state.wishPlatforms, ...payload]
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
  async setTab({ commit }, payload) {
    commit('setTab', payload)
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
  async getGameComments({ dispatch, commit }, id, page = 1) {
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
  async getWishPlatforms({ dispatch, commit }, id) {
    commit('setWishPlatformsLoading', true)
    try {
      const response = await this.$axios.get(
        '/api/getPlatformsByGame?gameId=' + id
      )
      commit('insertWishPlatforms', response.data.data)
      commit('setWishPlatformsLoading', false)
      return response.data.data
    } catch (error) {
      dispatch('alert/error', error.response, {
        root: true,
      })
      commit('setWishPlatformsLoading', false)
      throw 'Unable to fetch wish platforms'
    }
  },
  async addGameWishList({ dispatch, commit }, payload) {
    commit('setAddWishLoading', true)
    try {
      const response = await this.$axios.post(
        '/api/postWishList?gameId=' +
          payload.game +
          '&platform=' +
          payload.platform
      )
      commit('setAddWishLoading', false)
      return true
    } catch (error) {
      await dispatch('alert/error', error.response, {
        root: true,
      })
      commit('setAddWishLoading', false)
      return error.response.data
    }
  },
  async deleteFromSwapList({ dispatch, commit }, id) {
    commit('setDeleteLoading', id)
    try {
      const response = await this.$axios.post('/api/postDeleteFromSwapList', {
        swapId: id,
      })
      commit('deleteSwap', id)
      commit('setDeleteLoading', null)
      return response.data.data
    } catch (error) {
      dispatch('alert/error', error.response, {
        root: true,
      })
      commit('setDeleteLoading', null)
      throw 'Unable to delete Swaps Process'
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
