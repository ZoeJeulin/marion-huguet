let api, apiToken, ssr

if (process.env.BRANCH) {
  api =
    process.env.BRANCH === 'staging'
      ? process.env.API_URL_STAGING
      : process.env.API_URL_PROD
  apiToken =
    process.env.BRANCH === 'staging'
      ? process.env.GRAPHQL_TOKEN_STAGING
      : process.env.GRAPHQL_TOKEN_PROD
  ssr = !(process.env.BRANCH === 'preview') // csr on preview for live preview
} else {
  api = process.env.API_URL_STAGING
  apiToken = process.env.GRAPHQL_TOKEN_STAGING
  ssr = true
}

console.log('BRANCH : ', process.env.BRANCH)
console.log('SSR : ', ssr)
console.log('API : ', api)

export default {
  target: 'static',
  ssr,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'marion-huguet',
    htmlAttrs: {
      lang: 'fr',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon/favicon.ico' },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        type: 'image/png',
        href: '/favicon/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        sizes: '32x32',
        type: 'image/png',
        href: '/favicon/favicon-32x32.png',
      },
      {
        rel: 'icon',
        sizes: '16x16',
        type: 'image/png',
        href: '/favicon/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/favicon/manifest.json' },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/scss/main.scss'],

  styleResources: {
    scss: ['@/assets/scss/main.scss'],
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/query.js', '@/plugins/particles.vue.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxt/image',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    '@nuxtjs/i18n',
    '@nuxtjs/svg',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseUrl: api,
    headers: {
      Authorization: apiToken,
    },
  },

  // https://i18n.nuxtjs.org/
  i18n: {
    locales: ['fr', 'en'],
    defaultLocale: 'fr',
    vueI18n: {
      fallbackLocale: 'fr',
      messages: {
        fr: {
          welcome: 'Bienvenue',
        },
        en: {
          welcome: 'Welcome',
        },
      },
    },
  },

  image: {
    provider: 'imgix',
    imgix: {
      baseURL: '',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true,
    transpile: ['gsap'],
    extend(config) {
      config.module.rules.push({
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      })
    },
  },

  server: {
    host: '0.0.0.0',
  },
}
