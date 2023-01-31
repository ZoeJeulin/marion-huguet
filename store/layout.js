export const state = () => ({
  w: null,
})

export const mutations = {
  SET_WINDOW_SIZE(state) {
    if (process.client) {
      state.w = window.innerWidth
    }
  },
}

export const actions = {}

export const getters = {}

export default {
  // namespaced: true,
  state,
  // actions,
  mutations,
  // getters,
}
