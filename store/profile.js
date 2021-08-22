export const state = () => ({
  user: null,
  posts: [],
  loading: false,
  postLoading: false,
})
export const getters = {}
export const mutations = {
  setLoading(state, payload) {
    state.loading = payload
  },
  setPostLoading(state, payload) {
    state.postLoading = payload
  },
  setPosts(state, payload) {
    state.posts = payload
  },
  setUserInfo(state, payload) {
    state.user = payload
  },
}
export const actions = {
  async getUserProfile({ commit, dispatch }, username) {
    commit('setLoading', true)
    try {
      const response = await this.$axios.get('/api/info', {
        params: { selected_user: username },
      })
      await dispatch('getPosts', response.data.data.id)
      commit('setUserInfo', response.data)
      commit('setLoading', false)
    } catch (error) {
      dispatch('alert/error', error.response, {
        root: true,
      })
      commit('setLoading', false)
    }
  },
  async getPosts({ dispatch, commit }, id) {
    commit('setPostLoading', true)
    try {
      const response = await this.$axios.get('/api/getPostsByUser?userId=' + id)
      commit('setPosts', response.data.data.data)
      commit('setPostLoading', false)
    } catch (error) {
      dispatch('alert/error', error.response, {
        root: true,
      })
      commit('setPostLoading', false)
    }
  },
}
