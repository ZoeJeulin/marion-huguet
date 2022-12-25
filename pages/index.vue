<template>
  <div class="home">
    <section-intro :intro-text="page.introText" class="section" />
    <component
      :is="getComponent(section._modelApiKey)"
      v-for="(section, index) in page.sections"
      :key="`section-${section.id}`"
      :index="index"
      :section="section"
      class="section"
    />
  </div>
</template>

<script>
import PageHomeQuery from '~/assets/graphql/pages/home.graphql'

export default {
  name: 'Home',
  nuxtI18n: {
    paths: {
      fr: '/',
      en: '/',
    },
  },
  async asyncData(context) {
    const { page } = await context.$query(context.app.$axios, PageHomeQuery, {
      locale: context.app.i18n.locale,
    })

    return { page }
  },
  methods: {
    getComponent(section) {
      return section.toString().replace('_', '-')
    },
  },
}
</script>

<style lang="scss">
.home {
  .section {
    + .section {
      margin-top: 80px;

      @include below('sm') {
        margin-top: 10px;
      }
    }
  }
}
</style>
