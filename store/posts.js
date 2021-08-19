export const state = () => ({
  posts: [],
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
  setFavorite(state, payload) {
    const item = state.posts.find((post) => post.id === payload.id)
    Object.assign(item, payload)
    const quote = state.posts.find((post) => post.quote_id === payload.id)
    Object.assign(quote.quoted_post[0], payload)
  },
}
export const actions = {
  async getPosts({ dispatch, commit }) {
    commit('setLoading', true)
    try {
      const response = await this.$axios.get('/api/getPosts')
      commit('setPosts', response.data.data.data)
      commit('setLoading', false)
    } catch (error) {
      dispatch('alert/error', error.response, {
        root: true,
      })
      commit('setLoading', false)
    }
  },
  async loadMorePosts({ dispatch, commit }, page) {
    try {
      const response = await this.$axios.get('/api/getPosts?page=' + page)
      commit('insertPosts', response.data.data.data)
    } catch (error) {
      dispatch('alert/error', error.response, {
        root: true,
      })
    }
  },
  async newPost({ dispatch, commit }, payload) {
    commit('setShareLoading', true)
    try {
      const response = await this.$axios.post('/api/newPost', payload)
      commit('addPost', response.data.data)
      commit('setShareLoading', false)
    } catch (error) {
      dispatch('alert/error', error.response, {
        root: true,
      })
      commit('setShareLoading', false)
    }
  },
  async favoritePost({ dispatch, commit }, id) {
    try {
      const response = await this.$axios.post('/api/postLike', {
        postId: id,
      })
      commit('setFavorite', response.data.data)
      return response.data.data
    } catch (error) {
      dispatch('alert/error', error.response, {
        root: true,
      })
      throw 'Unable to favorite this post'
    }
  },
  async toggleComposer({ commit }, payload) {
    commit('setComposer', payload)
  },
  async toggleShareLoading({ commit }, payload) {
    commit('setShareLoading', payload)
  },
}
