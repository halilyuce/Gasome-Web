const getDefaultState = () => {
  return {
    swaps: [],
    page: 0,
    enough: false,
    loading: false,
    swapDeals: [],
    dealsPage: 1,
    dealsEnough: false,
    dealsLoading: false,
    activeTab: 'incoming',
  }
}
export const state = () => getDefaultState()

export const mutations = {
  setActiveTab(state, payload) {
    state.activeTab = payload
  },
  setLoading(state, payload) {
    state.loading = payload
  },
  setPage(state, payload) {
    state.page = payload
  },
  setEnough(state, payload) {
    state.enough = payload
  },
  insertSwaps(state, payload) {
    state.swaps = [...state.swaps, ...payload]
  },
  setSwapDeals(state, payload) {
    state.swapDeals = payload
  },
  setDealsLoading(state, payload) {
    state.dealsLoading = payload
  },
  setDealsPage(state, payload) {
    state.dealsPage = payload
  },
  setDealsEnough(state, payload) {
    state.dealsEnough = payload
  },
  insertSwapDeals(state, payload) {
    state.swapDeals = [...state.swapDeals, ...payload]
  },
  resetState(state) {
    Object.assign(state, getDefaultState())
  },
}

export const actions = {
  async resetState({ commit }) {
    commit('resetState')
  },
  async getSwapDeals({ dispatch, state, commit }, type) {
    try {
      const response = await this.$axios.get(
        '/api/getSwapsDeals?page=' + state.dealsPage + '&swapType=' + type
      )
      commit('setDealsLoading', false)
      commit('insertSwapDeals', response.data.data.data)
      return response.data.data
    } catch (error) {
      dispatch('alert/error', error.response, {
        root: true,
      })
      commit('setDealsLoading', false)
      throw 'Unable to fetch swap deals'
    }
  },
  async getSwaps({ dispatch, state, commit }, payload) {
    try {
      const response = await this.$axios.get(
        '/api/swapsuggestions?page=' +
          state.page +
          '&latitude=' +
          payload.latitude +
          '&longitude=' +
          payload.longitude
      )
      commit('setLoading', false)
      commit('insertSwaps', response.data.data)
      return response.data.data
    } catch (error) {
      dispatch('alert/error', error.response, {
        root: true,
      })
      commit('setLoading', false)
      throw 'Unable to fetch swaps'
    }
  },
  async setCurrentPage({ commit }, page) {
    await commit('setPage', page)
  },
  async setSwapsEnough({ commit }, payload) {
    await commit('setEnough', payload)
  },
  async toggleLoading({ commit }, payload) {
    commit('setLoading', payload)
  },
  async setDealsPage({ commit }, page) {
    await commit('setDealsPage', page)
  },
  async setSwapDeals({ commit }, payload) {
    await commit('setSwapDeals', payload)
  },
  async setDealsEnough({ commit }, payload) {
    await commit('setDealsEnough', payload)
  },
  async toggleDealsLoading({ commit }, payload) {
    commit('setDealsLoading', payload)
  },
  async setActiveTab({ commit }, payload) {
    await commit('setActiveTab', payload)
  },
}
