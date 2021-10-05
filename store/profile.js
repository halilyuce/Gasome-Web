export const state = () => ({
  user: null,
  posts: [],
  wishes: [],
  swaps: [],
  loading: false,
  editLoading: false,
  postLoading: false,
  followLoading: false,
  swapsLoading: false,
  wishesLoading: false,
  swapListLoading: false,
  wishListLoading: false,
  removeLoading: false,
  swapsPage: 0,
  swapsEnough: false,
  wishesPage: 0,
  wishesEnough: false,
  followers: [],
  following: [],
  followersLoading: null,
  followingLoading: null
})
export const getters = {}
export const mutations = {
  setLoading(state, payload) {
    state.loading = payload
  },
  setEditLoading(state, payload) {
    state.editLoading = payload
  },
  setRemoveLoading(state, payload) {
    state.removeLoading = payload
  },
  setSwapListLoading(state, payload) {
    state.swapListLoading = payload
  },
  setWishListLoading(state, payload) {
    state.wishListLoading = payload
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
  setFollowLoading(state, payload) {
    state.followLoading = payload
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
  setWishesPage(state, payload) {
    state.wishesPage = payload
  },
  setWishesEnough(state, payload) {
    state.wishesEnough = payload
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
  setUserFollowers(state, payload) {
    state.followers = [...state.followers, ...payload]
  },
  setUserFollowing(state, payload) {
    state.following = [...state.following, ...payload]
  },
  setFollow(state, payload) {
    state.user.isFollow = payload.state
  },
  setFollowerListFollow(state, payload) {
    state.followers.find(follower => follower.user.username === state.followersLoading).isAuthFollow = payload.state
    state.followersLoading = null
  },
  setFollowingListFollow(state, payload) {
    state.following.find(follower => follower.user.username === state.followingLoading).isAuthFollow = payload.state
    state.followingLoading = null
  },
  setFollowersLoading(state, payload) {
    state.followersLoading = payload
  },
  setFollowingLoading(state, payload) {
    state.followingLoading = payload
  },
  clearState(state) {
    state.user = null
    state.posts = []
    state.wishes = []
    state.swaps = []
    state.swapsPage = 0
    state.swapsEnough = false
    state.wishesPage = 0
    state.wishesEnough = false
    state.followers = []
    state.following = []
  },
  removeFromSwapList(state, payload) {
    const index = state.swaps.findIndex((swap) => swap.id === payload)
    state.swaps.splice(index, 1)
  },
  removeFromWishList(state, payload) {
    const index = state.wishes.findIndex((wish) => wish.id === payload)
    state.wishes.splice(index, 1)
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
  async getWishes({ dispatch, state, commit }, id) {
    try {
      const response = await this.$axios.get(
        '/api/getUserWishList?userId=' + id + '&page=' + state.wishesPage
      )
      commit('insertWishes', response.data.data.data)
      commit('setWishesLoading', false)
      return response.data.data
    } catch (error) {
      dispatch('alert/error', error.response, {
        root: true,
      })
      commit('setWishesLoading', false)
      throw 'Unable to fetch wishes'
    }
  },
  async follow({ dispatch, commit }, username) {
    commit('setFollowLoading', true)
    try {
      const response = await this.$axios.post('/api/follow', {
        selected_user: username,
      })
      commit('setFollow', response.data.data)
      commit('setFollowLoading', false)
      return response.data.data
    } catch (error) {
      dispatch('alert/error', error.response, {
        root: true,
      })
      commit('setFollowLoading', false)
      throw 'Unable to follow/unfollow'
    }
  },
  async followFromFollower({ dispatch, commit }, username) {
    commit('setFollowersLoading', username)
    try {
      const response = await this.$axios.post('/api/follow', {
        selected_user: username,
      })
      commit('setFollowerListFollow', response.data.data)
      return response.data.data
    } catch (error) {
      dispatch('alert/error', error.response, {
        root: true,
      })
      commit('setFollowersLoading', null)
      throw 'Unable to follow/unfollow'
    }
  },
  async followFromFollowing({ dispatch, commit }, username) {
    commit('setFollowingLoading', username)
    try {
      const response = await this.$axios.post('/api/follow', {
        selected_user: username,
      })
      commit('setFollowingListFollow', response.data.data)
      return response.data.data
    } catch (error) {
      dispatch('alert/error', error.response, {
        root: true,
      })
      commit('setFollowingLoading', null)
      throw 'Unable to follow/unfollow'
    }
  },
  async removeFromSwapList({ dispatch, commit }, id) {
    commit('setRemoveLoading', true)
    try {
      const response = await this.$axios.post('/api/postDeleteFromSwapList', {
        swapId: id,
      })
      commit('setRemoveLoading', false)
      commit('removeFromSwapList', id)
      return response.data.data
    } catch (error) {
      dispatch('alert/error', error.response.data.errorMessage[0], {
        root: true,
      })
      commit('setRemoveLoading', false)
      throw error.response.data.errorMessage[0]
    }
  },
  async removeFromWishList({ dispatch, commit }, id) {
    commit('setRemoveLoading', true)
    try {
      const response = await this.$axios.post('/api/postDeleteFromWishList', {
        wishId: id,
      })
      commit('setRemoveLoading', false)
      commit('removeFromWishList', id)
      return response.data.data
    } catch (error) {
      dispatch('alert/error', error.response.data.errorMessage[0], {
        root: true,
      })
      commit('setRemoveLoading', false)
      throw error.response.data.errorMessage[0]
    }
  },
  async addToSwapList({ dispatch, commit }, payload) {
    commit('setSwapListLoading', true)
    try {
      const response = await this.$axios.post('/api/postSwapList', {
        gameId: payload.id,
        platform: payload.platform,
      })
      commit('setSwapListLoading', false)
      return response.data.data
    } catch (error) {
      dispatch('alert/error', error.response.data.errorMessage[0], {
        root: true,
      })
      commit('setSwapListLoading', false)
      throw error.response.data.errorMessage[0]
    }
  },
  async addToWishList({ dispatch, commit }, payload) {
    commit('setWishListLoading', true)
    try {
      const response = await this.$axios.post('/api/postWishList', {
        gameId: payload.id,
        platform: payload.platform,
      })
      commit('setWishListLoading', false)
      return response.data.data
    } catch (error) {
      dispatch('alert/error', error.response.data.errorMessage[0], {
        root: true,
      })
      commit('setWishListLoading', false)
      throw error.response.data.errorMessage[0]
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
  async updateProfile({ dispatch, commit }, payload) {
    try {
      const response = await this.$axios.post('/api/postUpdateProfile', {
        name: payload.name,
        username: payload.username,
        email: payload.email,
        birthday: payload.birthday,
        website: payload.website,
        bio: payload.bio,
      })
      commit('setEditLoading', false)
      return response.data.data
    } catch (error) {
      dispatch('alert/error', error.response.data.errorMessage[0], {
        root: true,
      })
      commit('setEditLoading', false)
      throw error.response.data.errorMessage[0]
    }
  },
  async updateAvatar({ dispatch, commit }, payload) {
    try {
      const response = await this.$axios.post('/api/postUpdateAvatar', payload)
      return response.data.data
    } catch (error) {
      dispatch('alert/error', error.response.data.errorMessage[0], {
        root: true,
      })
      commit('setEditLoading', false)
      throw error.response.data.errorMessage[0]
    }
  },
  async toggleEditLoading({ commit }, payload) {
    commit('setEditLoading', payload)
  },
  async togglePostLoading({ commit }, payload) {
    commit('setPostLoading', payload)
  },
  async toggleSwapsLoading({ commit }, payload) {
    commit('setSwapsLoading', payload)
  },
  async toggleWishesLoading({ commit }, payload) {
    commit('setWishesLoading', payload)
  },
  async toggleSwapsEnough({ commit }, payload) {
    commit('setSwapsEnough', payload)
  },
  async toggleFollowersLoading({ commit }, payload) {
    commit('setFollowersLoading', payload)
  },
  async setSwapsPage({ commit }, payload) {
    commit('setSwapsPage', payload)
  },
  async toggleWishesEnough({ commit }, payload) {
    commit('setWishesEnough', payload)
  },
  async setWishesPage({ commit }, payload) {
    commit('setWishesPage', payload)
  },
  async clearState({ commit }) {
    commit('clearState')
  },
  async getUserFollowers({ commit, dispatch }, payload) {
    commit('setLoading', true)
    try {
      const response = await this.$axios.get(
        '/api/getFollowers?userName=' + payload.userName + '&page=' + payload.page
      )
      commit('setUserFollowers', response.data.data.data)
      commit('setLoading', false)
      return response.data.data
    } catch (error) {
      dispatch('alert/error', error.response, {
        root: true,
      })
      commit('setLoading', false)
    }
  },
  async getUserFollowing({ commit, dispatch }, payload) {
    commit('setLoading', true)
    try {
      const response = await this.$axios.get(
        '/api/getFollowing?userName=' + payload.userName + '&page=' + payload.page
      )
      commit('setUserFollowing', response.data.data.data)
      commit('setLoading', false)
      return response.data.data
    } catch (error) {
      dispatch('alert/error', error.response, {
        root: true,
      })
      commit('setLoading', false)
    }
  },
}