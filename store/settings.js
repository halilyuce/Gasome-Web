const getDefaultState = () => {
  return {
    passwordLoading: false,
  }
}
export const state = () => getDefaultState()
export const getters = {}
export const mutations = {
  setPasswordLoading(state, payload) {
    state.passwordLoading = payload
  },
  resetState(state) {
    Object.assign(state, getDefaultState())
  },
}
export const actions = {
  async resetState({ commit }) {
    commit('resetState')
  },
  async updatePassword({ dispatch, commit }, payload) {
    await commit('setPasswordLoading', true)
    try {
      const response = await this.$axios.post('/api/updatePassword', {
        password: payload.password,
        newPassword: payload.newPassword,
      })
      await commit('setPasswordLoading', false)
      return response.data
    } catch (error) {
      await dispatch('alert/error', error.response, {
        root: true,
      })
      await commit('setPasswordLoading', false)
      throw 'Unable to update your password'
    }
  },
}
