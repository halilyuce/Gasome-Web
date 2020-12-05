export const state = () => ({
  user: null,
  loading: false,
  mode: 'dark',
})
export const getters = {}
export const mutations = {
  setLoading(state, payload) {
    state.loading = payload
  },
  setMode(state, payload) {
    state.mode = payload
  },
}
export const actions = {
  async getSettings({ commit }) {
    const mode = localStorage.getItem('mode') || null
    if (mode) {
      await commit('setMode', mode)
    }
  },
}
