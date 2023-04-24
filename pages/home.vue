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
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import PageHomeQuery from '~/assets/graphql/pages/home.graphql'

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)

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
    /* console.log(this.tlBird && this.tlBird.progress())
    this.tlBird = gsap.timeline()
    this.tlBird.scrollTrigger && this.tlBird.scrollTrigger.kill()
    console.log(this.tlBird.progress()) */

    const catSections = this.$el.querySelectorAll('.sections .home-category')

    const mq = gsap.matchMedia()

    mq.add('(min-width: 641px)', () => {
      // PIN NAV + SCROLL BTN
      setTimeout(() => {
        this.stHome = ScrollTrigger.create({
          trigger: '.sections',
          start: 'top top',
          endTrigger: 'footer',
          end: 'top bottom',
          pin: '.ui-side-nav',
        })
      }, 500)

      // BIRD PATH
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
          [0.8, 1]
        )
      )

      for (let i = 0; i < catSections.length; i++) {
        anchorPoints.push(
          MotionPathPlugin.getRelativePosition(
            i === 0 ? introSection : catSections[i - 1],
            blobs[i],
            i === 0 ? [0.8, 1] : [0.5, 1],
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
          [0.8, 0.5]
        )
      )

      gsap.to(bird, {
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
        },
        transformOrigin: '50% 50%',
        ease: 'none',
      })

      catSections.forEach((cat) => {
        gsap.to(cat.querySelector('.category-img'), {
          y: 0,
          duration: 3,
          ease: 'ease-out',
          scrollTrigger: {
            trigger: cat.querySelector('.category-title'),
            start: 'top 85%',
          },
        })

        gsap.fromTo(
          cat.querySelector('.category-img'),
          {
            x: 0,
          },
          {
            x: Math.PI * 3,
            duration: 3,
            modifiers: {
              x(x) {
                return Math.sin(parseFloat(x)) * 5 + 'px'
              },
            },
            scrollTrigger: {
              trigger: cat.querySelector('.category-title'),
              start: 'top 85%',
            },
          }
        )
      })
    })

    // ANIMS
    catSections.forEach((cat) => {
      // const catTitle = cat.querySelector('.category-title')
      cat.querySelectorAll('.ui-frame .frame-corner').forEach((corner) => {
        gsap.to(corner.querySelector('.corner-vertical'), {
          scaleY: 1,
          duration: 0.2,
          ease: 'ease-out',
          scrollTrigger: cat,
        })
        gsap.to(corner.querySelector('.corner-horizontal'), {
          scaleX: 1,
          duration: 0.2,
          ease: 'ease-out',
          scrollTrigger: cat,
        })
      })

      gsap.to(cat.querySelector('.category-title'), {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'ease-out',
        scrollTrigger: {
          trigger: cat.querySelector('.category-title'),
          start: 'top 85%',
          markers: true,
        },
      })

      gsap.to(cat.querySelector('.category-desc'), {
        opacity: 1,
        y: 0,
        duration: 0.5,
        delay: 0.2,
        ease: 'ease-out',
        scrollTrigger: {
          trigger: cat.querySelector('.category-title'),
          start: 'top 85%',
        },
      })

      gsap.to(cat.querySelector('.category-link'), {
        opacity: 1,
        y: 0,
        duration: 0.3,
        delay: 0.5,
        ease: 'ease-out',
        scrollTrigger: {
          trigger: cat.querySelector('.category-title'),
          start: 'top 85%',
        },
      })

      gsap.to(cat.querySelector('.category-img'), {
        opacity: 1,
        duration: 0.5,
        ease: 'ease-out',
        scrollTrigger: {
          trigger: cat.querySelector('.category-title'),
          start: 'top 85%',
        },
      })
    })

    setTimeout(() => {
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
          rotate: -230,
          scrollTrigger: {
            trigger: '.section-intro',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })

        gsap.to(bird2, {
          rotate: 165,
          scrollTrigger: {
            trigger: '.section-intro',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })

        gsap.to(bird3, {
          rotate: -240,
          scrollTrigger: {
            trigger: '.section-intro',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })

        catSections.forEach((cat) => {
          gsap.to(cat.querySelector('.category-img'), {
            yPercent: 20,
            ease: 'none',
            scrollTrigger: {
              trigger: cat,
              start: 'top center',
              end: 'bottom center',
              scrub: true,
            },
          })

          gsap.to(cat.querySelector('.category-img img'), {
            filter: 'brightness(0.5) blur(1px)',
            ease: 'none',
            scrollTrigger: {
              trigger: cat,
              start: 'top 25%',
              end: 'bottom center',
              scrub: true,
            },
          })
        })
      })
    }, 500)
  },
  beforeDestroy() {
    this.stHome.kill(false)
    // this.tlBird.pause().kill(false)
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
