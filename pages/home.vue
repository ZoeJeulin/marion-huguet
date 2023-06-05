<template>
  <div class="home">
    <client-only>
      <section-home-intro
        :intro-text="page.introText"
        class="section"
        @hook:mounted="
          () => {
            sectionsMounted += 1
          }
        " />
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
          @hook:mounted="
            () => {
              sectionsMounted += 1
            }
          "
        /></div
    ></client-only>
  </div>
</template>

<script>
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import PageHomeQuery from '~/assets/graphql/pages/home.graphql'
import head from '@/assets/js/head.js'

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
  data() {
    return {
      sectionsMounted: 0,
    }
  },
  head() {
    return head(this.page.seo)
  },
  computed: {
    totalSections() {
      return this.page.sections.length + 1
    },
  },
  mounted() {
    document.body.style.overflowX = 'hidden'
    document.body.style.overflowY = ''
  },
  beforeDestroy() {
    if (this.tlHome) this.tlHome.kill()
  },
  updated() {
    if (this.sectionsMounted === this.totalSections) {
      this.$nextTick(() => {
        this.$nextTick(() => {
          this.initBirdAnim()
        })
      })
    }
  },
  methods: {
    getComponent(section) {
      return section
        .toString()
        .replace('_', '-')
        .replace('section', 'section-home')
    },
    initBirdAnim() {
      const catSections = this.$el.querySelectorAll('.sections .home-category')

      const mq = gsap.matchMedia()

      mq.add('(min-width: 769px)', () => {
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

        const introSection = this.$el.querySelector('.section-intro')
        const shopSection = this.$el.querySelector('.sections .home-shop')
        const supportSection = this.$el.querySelector('.sections .home-support')

        const anchorPoints = []

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
              catSections[i],
              i === 0 ? [0.8, 1] : [0.5, 1],
              i % 2 === 0 ? [0.25, 0.5] : [0.75, 0.5]
            )
          )

          anchorPoints.push(
            MotionPathPlugin.getRelativePosition(
              catSections[i],
              i === catSections.length - 1 ? shopSection : catSections[i],
              i % 2 === 0 ? [0.25, 0.5] : [0.75, 0.5],
              i === catSections.length - 1 ? [0.8, 0.1] : [0.5, 1]
            )
          )
        }

        anchorPoints.push(
          MotionPathPlugin.getRelativePosition(
            shopSection,
            shopSection,
            [0.8, 0.1],
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
        )

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
            end: 'top 80%',
            scrub: 3,
            endTrigger: supportSection,
            once: true,
          },
          transformOrigin: '50% 50%',
          ease: 'none',
        })
      })
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

      @include below('md') {
        margin-top: 30px;
        min-height: 75vh;
      }
    }

    .ui-btn-scroll {
      @include below('md') {
        display: none;
      }
    }
  }
}
</style>
