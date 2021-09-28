export const state = () => ({
  passwordLoading: false,
})
export const getters = {}
export const mutations = {
  setPasswordLoading(state, payload) {
    state.passwordLoading = payload
  },
}
export const actions = {
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
