const getDefaultState = () => {
  return {
    game: null,
    comments: null,
    commentsLoading: false,
    commentsPage: 1,
    commentsEnough: false,
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
    addLibraryLoading: false,
    deleteLoading: null,
    commentComposer: false,
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
  setCommentsLoading(state, payload) {
    state.commentsLoading = payload
  },
  setCommentsPage(state, payload) {
    state.commentsPage = payload
  },
  setCommentsEnough(state, payload) {
    state.commentsEnough = payload
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
  setAddLibraryLoading(state, payload) {
    state.addLibraryLoading = payload
  },
  setWishPlatformsLoading(state, payload) {
    state.wishPlatformsLoading = payload
  },
  setCommentComposer(state, payload) {
    state.commentComposer = payload
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
  async toggleCommentComposer({ commit }, payload) {
    commit('setCommentComposer', payload)
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
  async getGameComments({ dispatch, state, commit }, id) {
    try {
      const response = await this.$axios.get(
        '/api/gamecomment?id=' + id + '&page=' + state.commentsPage
      )
      await commit('setComments', response.data.data)
      commit('setCommentsLoading', false)
      return response.data.data
    } catch (error) {
      await dispatch('alert/error', error.response, {
        root: true,
      })
      commit('setCommentsLoading', false, { root: true })
      throw 'Unable to load comments'
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
  async toggleCommentsEnough({ commit }, payload) {
    commit('setCommentsEnough', payload)
  },
  async setCommentsPage({ commit }, payload) {
    commit('setCommentsPage', payload)
  },
  async toggleCommentsLoading({ commit }, payload) {
    commit('setCommentsLoading', payload)
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
  async addToSwapList({ dispatch, commit }, payload) {
    commit('setAddLibraryLoading', true)
    try {
      const response = await this.$axios.post('/api/postSwapList', {
        gameId: payload.id,
        platform: payload.platform,
      })
      commit('setAddLibraryLoading', false)
      return response.data.data
    } catch (error) {
      dispatch('alert/error', error.response.data.errorMessage[0], {
        root: true,
      })
      commit('setAddLibraryLoading', false)
      throw error.response.data.errorMessage[0]
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
  async postGameComment({ dispatch, commit }, payload) {
    commit('setCommentsLoading', true)
    try {
      const response = await this.$axios.post('/api/postgamecomment', payload)
      dispatch('getGameComments', payload.id)
      commit('setCommentsLoading', false)
      commit('setCommentComposer', false)
      return response.data
    } catch (error) {
      dispatch('alert/error', error.response, {
        root: true,
      })
      commit('setCommentsLoading', false)
      throw 'Unable to make comment right now, please try again later.'
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
