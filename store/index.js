import globalQuery from '@/assets/graphql/global.graphql'

export const state = () => ({
  global: undefined,
  seo: {},
})

export const mutations = {
  SET_GLOBAL(state, data) {
    state.global = data
  },
  SET_DEFAULT_SEO(state, seo) {
    state.seo = seo
  },
}

export const actions = {
  nuxtServerInit({ dispatch }) {
    return dispatch('loadInitData')
  },
  async loadInitData({ commit }) {
    return await this.$query(this.$axios, globalQuery, {
      locale: this.$i18n.locale,
    }).then((data) => {
      commit('SET_GLOBAL', data.global)
      commit('SET_DEFAULT_SEO', {
        seo: data.seo.globalSeo,
      })

      return true
    })
  },
}

export const getters = {}
