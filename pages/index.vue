<template>
  <div class="home">
    <section-home-intro :intro-text="page.introText" class="section" />
    <div class="sections">
      <ui-side-nav :sections="page.sections" />
      <ui-btn-scroll class="-home" />
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
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import PageHomeQuery from '~/assets/graphql/pages/home.graphql'

export default {
  name: 'Home',
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
    // const w = window.innerWidth

    const tl = gsap.timeline()

    const catSections = this.$el.querySelectorAll('.sections .home-category')

    const mq = gsap.matchMedia()
    mq.add('(min-width: 641px)', () => {
      ScrollTrigger.create({
        trigger: '.sections',
        start: 'top top',
        endTrigger: 'footer',
        end: 'top bottom',
        pin: '.ui-side-nav',
      })

      ScrollTrigger.create({
        trigger: '.sections',
        start: 'top top',
        endTrigger: 'footer',
        end: 'top bottom',
        pin: '.ui-btn-scroll.-home',
      })

      const bird = this.$el.querySelector(
        '.section-intro .intro-birds .bird:last-of-type'
      )
      const blobs = this.$el.querySelectorAll('.category-img .img-wrapper')

      const introSection = this.$el.querySelector('.section-intro')
      const shopSection = this.$el.querySelector('.sections .home-shop')
      const supportSection = this.$el.querySelector('.sections .home-support')

      const anchorPoints = []

      anchorPoints.push(
        MotionPathPlugin.getRelativePosition(
          bird,
          introSection,
          [0.5, 0.5],
          [0.75, 1]
        )
      )

      for (let i = 0; i < catSections.length; i++) {
        anchorPoints.push(
          MotionPathPlugin.getRelativePosition(
            i === 0 ? introSection : catSections[i - 1],
            blobs[i],
            i === 0 ? [0.75, 1] : [0.5, 1],
            [0.5, 0.5]
          )
        )
        anchorPoints.push(
          MotionPathPlugin.getRelativePosition(
            blobs[i],
            catSections[i],
            [0.5, 0.5],
            i === catSections.length - 1 ? [0.6, 1] : [0.5, 1]
          )
        )
      }

      anchorPoints.push(
        MotionPathPlugin.getRelativePosition(
          catSections[catSections.length - 1],
          shopSection,
          [0.6, 1],
          [0.65, 0.5]
        )
      )

      anchorPoints.push(
        MotionPathPlugin.getRelativePosition(
          shopSection,
          shopSection,
          [0.65, 0.5],
          [0.6, 1]
        )
      )

      anchorPoints.push(
        MotionPathPlugin.getRelativePosition(
          shopSection,
          supportSection,
          [0.6, 1],
          [0.8, 0.3]
        )
      )

      tl.to(bird, {
        motionPath: {
          path: anchorPoints,
          alignOrigin: [0.5, 0.5],
          autoRotate: 295,
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
        },
        transformOrigin: '50% 50%',
        ease: 'none',
      })
    })

    mq.add('(max-width: 640px)', () => {
      const bird1 = this.$el.querySelector(
        '.section-intro .intro-birds .bird:nth-of-type(1)'
      )
      const bird2 = this.$el.querySelector(
        '.section-intro .intro-birds .bird:nth-of-type(2)'
      )
      const bird3 = this.$el.querySelector(
        '.section-intro .intro-birds .bird:nth-of-type(3)'
      )

      gsap.to(bird1, {
        rotate: 20,
        scrollTrigger: {
          trigger: '.section-intro',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.to(bird2, {
        rotate: 45,
        scrollTrigger: {
          trigger: '.section-intro',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.to(bird3, {
        rotate: 15,
        scrollTrigger: {
          trigger: '.section-intro',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      catSections.forEach((cat) => {
        gsap.to(cat.querySelector('.img-wrapper'), {
          yPercent: 25,
          ease: 'none',
          scrollTrigger: {
            trigger: cat,
            start: 'top center',
            end: 'bottom center',
            scrub: true,
          },
        })
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
  nuxtI18n: {
    paths: {
      fr: '/',
      en: '/',
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
