<template>
  <div class="home">
    <section-home-intro :intro-text="page.introText" class="section" />
    <div class="sections">
      <ui-side-nav :sections="page.sections" />
      <component
        :is="getComponent(section._modelApiKey)"
        v-for="(section, index) in page.sections"
        :id="section.title.toLowerCase().replace(/[\W_]+/g, '-')"
        :key="`section-${section.id}`"
        :index="index"
        :section="section"
        class="section"
      />
    </div>
  </div>
</template>

<script>
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
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
  mounted() {
    /* const appId = '711878503910367'
    const redUri = 'https://httpstat.us/200'
    const url = `https://api.instagram.com/oauth/authorize?client_id=${appId}&redirect_uri=${redUri}&scope=user_profile,user_media&response_type=code`
    window.open(url, '_blank').focus() */

    const mq = gsap.matchMedia()
    mq.add('(min-width: 641px)', () => {
      ScrollTrigger.create({
        trigger: '.sections',
        start: 'top top',
        endTrigger: 'footer',
        end: 'top bottom',
        pin: '.ui-side-nav',
      })
    })
  },
  methods: {
    getComponent(section) {
      return section
        .toString()
        .replace('_', '-')
        .replace('section', 'section-home')
    },
  },
}
</script>

<style lang="scss">
.home {
  .sections {
    position: relative;

    .section {
      + .section {
        margin-top: 80px;

        @include below('sm') {
          margin-top: 10px;
        }
      }
    }
  }
}
</style>
