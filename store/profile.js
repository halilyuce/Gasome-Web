export const state = () => ({
  user: null,
  posts: [],
  wishes: [],
  swaps: [],
  loading: false,
  postLoading: false,
  swapsLoading: false,
  wishesLoading: false,
  swapsPage: 0,
  swapsEnough: false,
})
export const getters = {}
export const mutations = {
  setLoading(state, payload) {
    state.loading = payload
  },
  setPostLoading(state, payload) {
    state.postLoading = payload
  },
  setSwapsLoading(state, payload) {
    state.swapsLoading = payload
  },
  setWishesLoading(state, payload) {
    state.wishesLoading = payload
  },
  setPosts(state, payload) {
    state.posts = payload
  },
  setSwapsPage(state, payload) {
    state.swapsPage = payload
  },
  setSwapsEnough(state, payload) {
    state.swapsEnough = payload
  },
  insertPosts(state, payload) {
    state.posts = [...state.posts, ...payload]
  },
  insertSwaps(state, payload) {
    state.swaps = [...state.swaps, ...payload]
  },
  insertWishes(state, payload) {
    state.wishes = [...state.wishes, ...payload]
  },
  setUserInfo(state, payload) {
    state.user = payload
  },
  setFollow(state, payload) {
    state.user.isFollow = payload.state
  },
  clearState(state) {
    state.user = null
    state.posts = []
    state.wishes = []
    state.swaps = []
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
      commit('setUserInfo', response.data.data)
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
  async getSwaps({ dispatch, state, commit }, id) {
    try {
      const response = await this.$axios.get(
        '/api/getUserSwapList?userId=' + id + '&page=' + state.swapsPage
      )
      commit('insertSwaps', response.data.data.data)
      commit('setSwapsLoading', false)
      return response.data.data
    } catch (error) {
      dispatch('alert/error', error.response, {
        root: true,
      })
      commit('setSwapsLoading', false)
      throw 'Unable to fetch swaps'
    }
  },
  async follow({ dispatch, commit }, username) {
    try {
      const response = await this.$axios.post('/api/follow', {
        selected_user: username,
      })
      commit('setFollow', response.data.data)
      return response.data.data
    } catch (error) {
      dispatch('alert/error', error.response, {
        root: true,
      })
      throw 'Unable to follow/unfollow'
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
  async toggleSwapsLoading({ commit }, payload) {
    commit('setSwapsLoading', payload)
  },
  async toggleSwapsEnough({ commit }, payload) {
    commit('setSwapsEnough', payload)
  },
  async setSwapsPage({ commit }, payload) {
    commit('setSwapsPage', payload)
  },
  async clearState({ commit }) {
    commit('clearState')
  },
}
