const getDefaultState = () => {
  return {
    swaps: [],
    page: 0,
    enough: false,
    loading: false,
  }
}
export const state = () => getDefaultState()

export const mutations = {
  setLoading(state, payload) {
    state.loading = payload
  },
  setPage(state, payload) {
    state.page = payload
  },
  setSwaps(state, payload) {
    state.swaps = payload
  },
  setEnough(state, payload) {
    state.enough = payload
  },
  insertSwaps(state, payload) {
    state.swaps = [...state.swaps, ...payload]
  },
  resetState(state) {
    Object.assign(state, getDefaultState())
  },
}

export const actions = {
  async resetState({ commit }) {
    commit('resetState')
  },
  async getSwaps({ dispatch, state, commit }, type) {
    try {
      const response = await this.$axios.get(
        '/api/getSwapsDeals?page=' + state.page + '&swapType=' + type
      )
      commit('setLoading', false)
      commit('insertSwaps', response.data.data.data)
      return response.data.data
    } catch (error) {
      dispatch('alert/error', error.response, {
        root: true,
      })
      commit('setLoading', false)
      throw 'Unable to fetch notifications'
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
}
