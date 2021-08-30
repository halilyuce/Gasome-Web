export const state = () => ({
  notifications: [],
  page: 1,
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
  async getNotifications({ dispatch, commit }) {
    commit('setLoading', true)
    try {
      const response = await this.$axios.get('/api/notifications')
      commit('setNotifications', response.data.data.data)
      commit('setLoading', false)
    } catch (error) {
      dispatch('alert/error', error.response, {
        root: true,
      })
      commit('setLoading', false)
    }
  },
  async loadMoreNotifications({ dispatch, state, commit }) {
    try {
      const response = await this.$axios.get(
        '/api/notifications?page=' + state.page
      )
      commit('insertNotifications', response.data.data.data)
    } catch (error) {
      dispatch('alert/error', error.response, {
        root: true,
      })
    }
  },
  async setCurrentPage({ commit }, page) {
    await commit('setPage', page)
  },
}
