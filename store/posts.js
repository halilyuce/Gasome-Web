export const state = () => ({
  posts: null,
  loading: false,
  composer: false,
  shareLoading: false,
})
export const getters = {
  composer: (state) => {
    return state.composer
  },
}
export const mutations = {
  setPosts(state, payload) {
    state.posts = payload
  },
  addPost(state, payload) {
    state.posts.unshift(payload)
  },
  insertPosts(state, payload) {
    state.posts = [...state.posts, ...payload]
  },
  setLoading(state, payload) {
    state.loading = payload
  },
  setShareLoading(state, payload) {
    state.shareLoading = payload
  },
  setComposer(state, payload) {
    state.composer = payload
  },
}
export const actions = {
  async getPosts({ commit }) {
    commit('setLoading', true)
    try {
      const response = await this.$axios.get('/api/getPosts')
      await commit('setPosts', response.data.data.data)
      commit('setLoading', false)
    } catch (error) {
      await dispatch('alert/error', error.response, {
        root: true,
      })
      commit('setLoading', false)
    }
  },
  async loadMorePosts({ commit }, page) {
    try {
      const response = await this.$axios.get('/api/getPosts?page=' + page)
      await commit('insertPosts', response.data.data.data)
    } catch (error) {
      await dispatch('alert/error', error.response, {
        root: true,
      })
    }
  },
  async newPost({ commit }, payload) {
    commit('setShareLoading', true)
    try {
      const response = await this.$axios.post('/api/newPost', payload)
      await commit('addPost', response.data.data)
      commit('setShareLoading', false)
    } catch (error) {
      await dispatch('alert/error', error.response, {
        root: true,
      })
      commit('setShareLoading', false)
    }
  },
  async toggleComposer({ commit }, payload) {
    await commit('setComposer', payload)
  },
  async toggleShareLoading({ commit }, payload) {
    await commit('setShareLoading', payload)
  },
}
