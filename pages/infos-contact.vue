<template>
  <div class="infos-contact">
    <nuxt-picture
      :src="global.bgImg.url"
      :alt="global.bgImg.alt"
      class="whale"
    />
    <section-infos
      :infos-title="page.infosTitle"
      :infos-text="page.infosText"
    />
    <section-contact
      :contact-title="page.contactTitle"
      :contact-text="page.contactText"
    />
  </div>
</template>

<script>
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { mapState } from 'vuex'
import PageInfosContactQuery from '~/assets/graphql/pages/infosContact.graphql'

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
    const mqInfosContact = gsap.matchMedia()

    mqInfosContact.add('(min-width: 641px)', () => {
      ScrollTrigger.create({
        trigger: '.infos-contact',
        start: 'top top',
        endTrigger: 'footer',
        end: 'top bottom',
        pin: '.whale',
      })
    })
  },
}
</script>

<style lang="scss">
.infos-contact {
  position: relative;
  padding: 80px 40px;

  @include below('sm') {
    padding: 40px 20px;
  }

  .whale {
    position: absolute;
    top: -40px;
    right: -50%;

    @include below('sm') {
      display: none;
    }

    img {
      height: 105vh;
      max-width: fit-content;
    }
  }
}
</style>
