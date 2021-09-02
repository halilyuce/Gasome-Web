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
  insertPosts(state, payload) {
    state.posts = [...state.posts, ...payload]
  },
  setUserInfo(state, payload) {
    state.user = payload
  },
  setFavorite(state, payload) {
    const item = state.posts.find((post) => post.id === payload.id)
    Object.assign(item, payload)
    const quote = state.posts.find((post) => post.quote_id === payload.id)
    Object.assign(quote.quoted_post[0], payload)
  },
  setBoost(state, payload) {
    if (payload.response.success) {
      const posts = state.posts.filter(
        (post) =>
          post.quote_id ===
            (payload.sent.quoted_post.length > 0
              ? payload.sent.quote_id
              : payload.sent.id) ||
          post.id ===
            (payload.sent.quoted_post.length > 0
              ? payload.sent.quote_id
              : payload.sent.id)
      )
      posts.forEach((postItem) => {
        const item = state.posts.find((post) => post.id === postItem.id)
        if (item.id === payload.sent.id) {
          item.is_boosted_count = false
          item.boosts_count -= 1
        } else {
          item.quoted_post[0].is_boosted_count = false
          item.quoted_post[0].boosts_count -= 1
        }
      })
    } else {
      const posts = state.posts.filter(
        (post) =>
          (post.quote_id === payload.response.quote_id && post.only_boost) ||
          post.id === payload.response.quote_id
      )

      posts.forEach((postItem) => {
        const item = state.posts.find((post) => post.id === postItem.id)
        if (item.id === payload.response.quote_id) {
          Object.assign(item, payload.response.quoted_post[0])
        } else {
          Object.assign(item.quoted_post[0], payload.response.quoted_post[0])
        }
      })
    }
  },
}
export const actions = {
  async getUserProfile({ commit, dispatch }, username) {
    commit('setLoading', true)
    try {
      const response = await this.$axios.get('/api/info', {
        params: { selected_user: username },
      })
      commit('setUserInfo', response.data)
      commit('setLoading', false)
    } catch (error) {
      dispatch('alert/error', error.response, {
        root: true,
      })
      commit('setLoading', false)
    }
  },
  async getPosts({ dispatch, commit }, payload) {
    try {
      const response = await this.$axios.get(
        '/api/getPostsByUser?username=' +
          payload.username +
          '&page=' +
          payload.page
      )
      commit('insertPosts', response.data.data.data)
      commit('setPostLoading', false)
      return response.data.data
    } catch (error) {
      dispatch('alert/error', error.response, {
        root: true,
      })
      commit('setPostLoading', false)
      throw 'Unable to fetch posts'
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
  async boostPost({ dispatch, commit }, payload) {
    try {
      const response = await this.$axios.post('/api/newPost', {
        quoteId: payload.id,
        toUser: payload.user_id,
      })
      commit('setBoost', {
        response: response.data.data,
        sent: payload,
      })
      return response.data.data
    } catch (error) {
      dispatch('alert/error', error.response, {
        root: true,
      })
      throw 'Unable to boost this post'
    }
  },
  async togglePostLoading({ commit }, payload) {
    commit('setPostLoading', payload)
  },
}
