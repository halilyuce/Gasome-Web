export const state = () => ({
  posts: [],
  post: null,
  tagPage: 0,
  loading: false,
  tagLoading: false,
})
export const getters = {}
export const mutations = {
  setPosts(state, payload) {
    state.posts = payload
  },
  setPost(state, payload) {
    state.post = payload
  },
  setPostNull(state) {
    state.post = null
  },
  addPost(state, payload) {
    state.posts.unshift(payload)
  },
  insertPosts(state, payload) {
    state.posts = [...state.posts, ...payload]
  },
  setTagLoading(state, payload) {
    state.tagLoading = payload
  },
  setTagPage(state, payload) {
    state.tagPage = payload
  },
  setFavorite(state, payload) {
    const item = state.posts.find((post) => post.id === payload.id)
    Object.assign(item, payload)
    const quote = state.posts.find((post) => post.quote_id === payload.id)
    if (quote) {
      Object.assign(quote.quoted_post[0], payload)
    }
  },
  setBoost(state, payload) {
    if (payload.response.success) {
      const index = state.posts.findIndex(
        (post) =>
          post.quote_id === payload.sent.id &&
          post.user_id === this.state.auth.user.id
      )
      state.posts.splice(index, 1)

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
      state.posts.unshift(payload.response)

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
  async getTagPosts({ dispatch, commit }, payload) {
    commit('setTagLoading', true)
    try {
      const response = await this.$axios.get(
        '/api/getPostsByTag?tag=' + payload.tag + '&top=' + payload.top
      )
      commit('setPosts', response.data.data.data)
      commit('setTagLoading', false)
      return response.data.data
    } catch (error) {
      dispatch('alert/error', error.response, {
        root: true,
      })
      commit('setTagLoading', false)
      throw 'Unable to fetch tag posts'
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
  async setTagCurrentPage({ commit }, page) {
    await commit('setTagPage', page)
  },
  async toggleTagLoading({ commit }, payload) {
    commit('setTagLoading', payload)
  },
}