<template>
  <div class="infos-contact">
    <nuxt-picture
      :src="global.bgImg.url"
      :alt="global.bgImg.alt"
      class="whale-img"
      provider="imgix"
      :modifiers="{ auto: 'format,compress' }"
    />
    <section-infos
      :infos-title="page.infosTitle"
      :infos-text="page.infosText"
      :infos-photo="page.infosPhoto"
    />
    <section-contact
      :contact-title="page.contactTitle"
      :contact-text="page.contactText"
      :contact-confirmation-text="page.contactConfirmationText"
      :contact-confirmation-subtext="page.contactConfirmationSubtext"
    />
  </div>
</template>

<script>
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { mapState } from 'vuex'
import PageInfosContactQuery from '~/assets/graphql/pages/infosContact.graphql'
import head from '@/assets/js/head.js'

if (process.client) {
  gsap.registerPlugin(ScrollTrigger)
}

export default {
  name: 'InfosContact',
  nuxtI18n: {
    paths: {
      fr: '/infos-contact',
      en: '/infos-contact',
    },
  },
  async asyncData(context) {
    const { page } = await context.$query(
      context.app.$axios,
      PageInfosContactQuery,
      {
        locale: context.app.i18n.locale,
      }
    )

    return { page }
  },
  head() {
    return head(this.page.seo)
  },
  computed: {
    ...mapState({
      global: (state) => state.global,
    }),
  },
  mounted() {
    document.body.style.overflowX = 'hidden'
    if (window.innerWidth > 768) {
      document.querySelector('#main-default').style.padding = 0
      window.dispatchEvent(new Event('resize'))
    }

    const mqInfosContact = gsap.matchMedia()

    mqInfosContact.add('(min-width: 769px)', () => {
      setTimeout(() => {
        this.stInfos = ScrollTrigger.create({
          trigger: this.$el,
          start: 'top top',
          endTrigger: 'footer',
          end: 'top bottom',
          pin: '.whale-img',
        })
      }, 500)
    })
  },
  beforeDestroy() {
    if (this.stInfos) this.stInfos.kill()
    if (window.innerWidth > 768)
      document.querySelector('#main-default').style.padding =
        '160px 40px 40px 40px'
  },
}
</script>

<style lang="scss">
.infos-contact {
  position: relative;
  padding: 0 40px 80px;

  @include below('md') {
    padding: 0 0 40px;
  }

  .whale-img {
    position: absolute;
    right: 0;
    height: 100vh !important;

    @include below('lg') {
      display: none;
    }

    img {
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
