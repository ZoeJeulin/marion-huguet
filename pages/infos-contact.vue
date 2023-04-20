<template>
  <div class="infos-contact">
    <nuxt-picture
      :src="global.bgImg.url"
      :alt="global.bgImg.alt"
      class="whale-img"
    />
    <section-infos
      :infos-title="page.infosTitle"
      :infos-text="page.infosText"
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

gsap.registerPlugin(ScrollTrigger)

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
  computed: {
    ...mapState({
      global: (state) => state.global,
    }),
  },
  mounted() {
    document.body.style.overflowX = 'hidden'
    document.querySelector('#main-default').style.padding = 0
    const mqInfosContact = gsap.matchMedia()

    mqInfosContact.add('(min-width: 641px)', () => {
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
    this.stInfos.kill()
  },
}
</script>

<style lang="scss">
.infos-contact {
  position: relative;
  padding: 0 40px 80px;

  @include below('sm') {
    padding: 0 0 40px;
  }

  .whale-img {
    position: absolute;
    right: 0;
    height: 100vh !important;

    @include below('sm') {
      display: none;
    }

    img {
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
