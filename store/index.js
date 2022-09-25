import globalQuery from '@/assets/graphql/global.graphql'

export const state = () => ({
  global: undefined,
})

export const mutations = {
  SET_GLOBAL(state, data) {
    state.global = data
  },
}

export const actions = {
  nuxtServerInit({ dispatch }) {
    return dispatch('loadInitData')
  },
  async loadInitData({ commit }) {
    return await this.$query(this.$axios, globalQuery, {
      // locale: this.$i18n.locale,
    }).then((data) => {
      commit('SET_GLOBAL', data.global)

      return true
    })
  },
}

export const getters = {}
