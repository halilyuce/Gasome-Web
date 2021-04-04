export const state = () => ({
  posts: null,
  loading: false,
})
export const getters = {}
export const mutations = {
  setLoading(state, payload) {
    state.loading = payload
  },
  setPosts(state, payload) {
    state.posts = payload
  },
}
export const actions = {
  async getPosts({ commit }) {
    try {
      const response = await this.$axios.get('/api/getPosts')
      await commit('setPosts', response.data.data.data)
    } catch (error) {
      await dispatch('alert/error', error.response, {
        root: true,
      })
    }
  },
}
