export const state = () => ({
  posts: [],
  post: null,
  quotedPost: null,
  page: 0,
  comments: [],
  loading: false,
  composer: false,
  shareLoading: false,
  detailLoading: false,
  commentsLoading: false,
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
  setPost(state, payload) {
    state.post = payload
  },
  setPostNull(state) {
    state.post = null
  },
  setCommentsNull(state) {
    state.comments = []
  },
  setComments(state, payload) {
    state.comments = payload
  },
  addPost(state, payload) {
    state.posts.unshift(payload)
  },
  addComment(state, payload) {
    state.comments.unshift(payload)
  },
  insertPosts(state, payload) {
    state.posts = [...state.posts, ...payload]
  },
  insertComments(state, payload) {
    state.comments = [...state.comments, ...payload]
  },
  setLoading(state, payload) {
    state.loading = payload
  },
  setShareLoading(state, payload) {
    state.shareLoading = payload
  },
  setDetailLoading(state, payload) {
    state.detailLoading = payload
  },
  setCommentsLoading(state, payload) {
    state.commentsLoading = payload
  },
  setPage(state, payload) {
    state.page = payload
  },
  setComposer(state, payload) {
    state.composer = payload
  },
  setQuotedPost(state, payload) {
    state.quotedPost = payload
  },
  setFavorite(state, payload) {
    const item = state.posts.find((post) => post.id === payload.id)
    Object.assign(item, payload)
    const quote = state.posts.find((post) => post.quote_id === payload.id)
    Object.assign(quote.quoted_post[0], payload)
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
  async getPostById({ dispatch, commit }, id) {
    commit('setDetailLoading', true)
    try {
      const response = await this.$axios.get('/api/getPostById?postId=' + id)
      commit('setPost', response.data.data)
      commit('setDetailLoading', false)
    } catch (error) {
      dispatch('alert/error', error.response, {
        root: true,
      })
      commit('setDetailLoading', false)
    }
  },
  async getCommentsById({ dispatch, commit }, payload) {
    try {
      const response = await this.$axios.get(
        '/api/getCommentsById?postId=' + payload.id + '&page=' + payload.page
      )
      commit('insertComments', response.data.data.data)
      commit('setCommentsLoading', false)
      return response.data.data
    } catch (error) {
      dispatch('alert/error', error.response, {
        root: true,
      })
      commit('setCommentsLoading', false)
      throw 'Unable to fetch comments'
    }
  },
  async getPostDetail({ dispatch }, slug) {
    await dispatch('getPostById', slug)
  },
  async loadMorePosts({ dispatch, state, commit }) {
    try {
      const response = await this.$axios.get('/api/getPosts?page=' + state.page)
      commit('insertPosts', response.data.data.data)
      commit('setLoading', false)
      return response.data.data
    } catch (error) {
      commit('setLoading', false)
      dispatch('alert/error', error.response, {
        root: true,
      })
      throw 'Unable to get posts'
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
  async newComment({ dispatch, commit }, payload) {
    commit('setShareLoading', true)
    try {
      const response = await this.$axios.post('/api/newPost', payload)
      commit('addComment', response.data.data)
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
  async setPostNull({ commit }) {
    commit('setPostNull')
    commit('setCommentsNull')
  },
  async toggleComposer({ commit }, payload) {
    commit('setComposer', payload)
  },
  async toggleShareLoading({ commit }, payload) {
    commit('setShareLoading', payload)
  },
  async toggleLoading({ commit }, payload) {
    commit('setLoading', payload)
  },
  async toggleCommentsLoading({ commit }, payload) {
    commit('setCommentsLoading', payload)
  },
  async setCurrentPage({ commit }, page) {
    await commit('setPage', page)
  },
  async setQuotedPost({ commit }, post) {
    await commit('setQuotedPost', post)
  },
}
