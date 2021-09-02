export const state = () => ({
  notifications: [],
  page: 0,
  loading: false,
})

export const mutations = {
  setLoading(state, payload) {
    state.loading = payload
  },
  setPage(state, payload) {
    state.page = payload
  },
  setNotifications(state, payload) {
    state.notifications = payload
  },
  insertNotifications(state, payload) {
    state.notifications = [...state.notifications, ...payload]
  },
}

export const actions = {
  async loadMoreNotifications({ dispatch, state, commit }) {
    try {
      const response = await this.$axios.get(
        '/api/notifications?page=' + state.page
      )
      commit('setLoading', false)
      commit('insertNotifications', response.data.data.data)
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
  async toggleLoading({ commit }, payload) {
    commit('setLoading', payload)
  },
}
