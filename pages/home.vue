<template>
  <div class="home">
    <client-only>
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
        /></div
    ></client-only>
  </div>
</template>

<script>
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import PageHomeQuery from '~/assets/graphql/pages/home.graphql'

if (process.client) {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)
}

export default {
  name: 'Home',
  async asyncData(context) {
    const { page } = await context.$query(context.app.$axios, PageHomeQuery, {
      locale: context.app.i18n.locale,
    })

    return { page }
  },
  mounted() {
    document.body.style.overflowX = 'hidden'
    document.body.style.overflowY = ''
    /* const appId = '711878503910367'
    const redUri = 'https://httpstat.us/200'
    const url = `https://api.instagram.com/oauth/authorize?client_id=${appId}&redirect_uri=${redUri}&scope=user_profile,user_media&response_type=code`
    window.open(url, '_blank').focus() */
    // const w = window.innerWidth

    this.$nextTick(() => {
      const catSections = this.$el.querySelectorAll('.sections .home-category')

      const mq = gsap.matchMedia()

      mq.add('(min-width: 641px)', () => {
        // PIN NAV + SCROLL BTN
        ScrollTrigger.create({
          trigger: '.sections',
          start: 'top top',
          endTrigger: 'footer',
          end: 'top bottom',
          pin: '.ui-side-nav',
        })

        // BIRD PATH
        const bird = this.$el.querySelector(
          '.section-intro .intro-birds .bird:last-of-type'
        )
        const blobs = this.$el.querySelectorAll('.category-img .img-wrapper')

        const introSection = this.$el.querySelector('.section-intro')
        // const shopSection = this.$el.querySelector('.sections .home-shop')
        const supportSection = this.$el.querySelector('.sections .home-support')

        const anchorPoints = []
        console.log(introSection)
        setTimeout(() => {
          anchorPoints.push(
            MotionPathPlugin.getRelativePosition(
              bird,
              introSection,
              [0.5, 0.5],
              [0.8, 1]
            )
          )

          for (let i = 0; i < catSections.length; i++) {
            anchorPoints.push(
              MotionPathPlugin.getRelativePosition(
                i === 0 ? introSection : catSections[i - 1],
                blobs[i],
                i === 0 ? [0.8, 1] : [0.5, 1],
                [0.5, 0]
              )
            )
            anchorPoints.push(
              MotionPathPlugin.getRelativePosition(
                blobs[i],
                catSections[i],
                [0.5, 0],
                i === catSections.length - 1 ? [0.7, 1] : [0.5, 1]
              )
            )
          }

          /* anchorPoints.push(
          MotionPathPlugin.getRelativePosition(
            catSections[catSections.length - 1],
            shopSection,
            [0.7, 1],
            [0.95, 0.5]
          )
        )

        anchorPoints.push(
          MotionPathPlugin.getRelativePosition(
            shopSection,
            shopSection,
            [0.95, 0.5],
            [0.75, 1]
          )
        )

        anchorPoints.push(
          MotionPathPlugin.getRelativePosition(
            shopSection,
            supportSection,
            [0.75, 1],
            [0.82, 0.25]
          )
        ) */
          console.log(anchorPoints)
          this.tlHome = gsap.timeline()
          this.tlHome.to(bird, {
            motionPath: {
              path: anchorPoints,
              alignOrigin: [0.5, 0.5],
              autoRotate: 55,
              curviness: 1,
              relative: true,
            },
            scrollTrigger: {
              trigger: introSection,
              start: 'center center',
              end: 'top 60%',
              scrub: 3,
              endTrigger: supportSection,
              once: true,
              onUpdate: (self) => console.log('progress:', self.progress),
            },
            transformOrigin: '50% 50%',
            ease: 'none',
          })
        }, 2000)
      })
    })
  },
  beforeDestroy() {
    if (this.tlHome) this.tlHome.kill()
  },
  methods: {
    getComponent(section) {
      return section
        .toString()
        .replace('_', '-')
        .replace('section', 'section-home')
    },
  },
  nuxtI18n: {
    paths: {
      fr: '/accueil',
      en: '/home',
    },
  },
}
</script>

<style lang="scss">
.home {
  .sections {
    position: relative;

    .section {
      margin-top: 80px;

      @include below('sm') {
        margin-top: 30px;
        min-height: 75vh;
      }
    }

    .ui-btn-scroll {
      @include below('sm') {
        display: none;
      }
    }
  }
}
</style>
