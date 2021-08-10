export const state = () => ({
    user: null,
    loading: false,
  })
  export const getters = {}
  export const mutations = {
    setLoading(state, payload) {
      state.loading = payload
    },
    setUserInfo(state, payload) {
      state.user = payload
    },
  }
  export const actions = {
    async getUserProfile({ commit, dispatch }, id) {
      try {
        const response = await this.$axios.get('/api/info', { params: { selected_user: id } });
        await commit('setUserInfo', response.data)
      } catch (error) {
        await dispatch('alert/error', error.response, {
          root: true,
        })
      }
    }
  }
  