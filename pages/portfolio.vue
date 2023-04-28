<template>
  <div class="portfolio">
    <h1 class="title t-h1">
      {{ page.pageTitle }}
      <ui-icon name="etoile" class="star" />
    </h1>
    <div class="categories">
      <ui-side-nav :sections="page.portfolioCategories" />
      <!-- <ui-btn-scroll class="-portfolio" /> -->
      <ul class="categories-list">
        <section-portfolio-category
          v-for="(category, index) in page.portfolioCategories"
          :id="category.title.toLowerCase().replace(/[\W_]+/g, '-')"
          :key="`category-item-${category.id}`"
          :category="category"
          :first-index="getFirstIndex(index)"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PagePortfolioQuery from '~/assets/graphql/pages/portfolio.graphql'
import head from '@/assets/js/head.js'

gsap.registerPlugin(ScrollTrigger)

export default {
  name: 'Portfolio',
  nuxtI18n: {
    paths: {
      fr: '/portfolio',
      en: '/portfolio',
    },
  },
  async asyncData(context) {
    const { page } = await context.$query(
      context.app.$axios,
      PagePortfolioQuery,
      {
        locale: context.app.i18n.locale,
      }
    )

    return { page }
  },
  head() {
    return head(this.page.seo)
  },
  mounted() {
    const mqPortoflio = gsap.matchMedia()

    const categories = this.$el.querySelectorAll('.category')
    categories.forEach((cat) => {
      setTimeout(() => {
        mqPortoflio.add('(min-width: 769px)', () => {
          this.stPortfolio1 = ScrollTrigger.create({
            trigger: cat,
            start: 'top top',
            end: 'bottom bottom',
            pin: cat.querySelector('.category-title'),
          })
        })

        mqPortoflio.add('(max-width: 768px)', () => {
          gsap.to(cat.querySelector('.category-title'), {
            x: 0,
            duration: 0.5,
            ease: 'ease-out',
            scrollTrigger: {
              trigger: cat.querySelector('.category-title'),
              start: 'top 85%',
            },
          })
        })
      }, 500)
    })

    setTimeout(() => {
      mqPortoflio.add('(min-width: 769px)', () => {
        this.stPortfolio2 = ScrollTrigger.create({
          trigger: '.categories',
          start: 'top top',
          endTrigger: 'footer',
          end: 'top bottom',
          pin: '.ui-side-nav',
        })

        this.$el.querySelectorAll('.ui-work-card').forEach((card) => {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.75,
            delay: 0.2,
            ease: 'ease-out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            },
          })
        })
      })

      mqPortoflio.add('(max-width: 768px)', () => {
        gsap.to('.title', {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'ease-out',
        })

        this.$el.querySelectorAll('.ui-work-card').forEach((card) => {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'ease-out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
            },
          })
        })
      })
    }, 500)
  },
  methods: {
    getFirstIndex(index) {
      let countWorks = 0
      for (let i = 0; i < index; i++) {
        countWorks += this.page.portfolioCategories[i].works.length
      }
      return countWorks
    },
  },
}
</script>

<style lang="scss">
.portfolio {
  .title {
    margin-top: 50vh;
    position: relative;
    z-index: 3;
    text-shadow: 2px 2px 20px rgba($blue2, 0.25);
    opacity: 0;
    animation: titlePortfolio 0.5s 1s ease-out forwards;

    @keyframes titlePortfolio {
      0% {
        opacity: 0;
        transform: translateY(80px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @include below('md') {
      margin-top: 0;
      margin-right: 25px;
      text-shadow: none;
      display: flex;
      justify-content: space-between;
      align-items: center;
      opacity: 0;

      @keyframes titlePortfolio {
        0% {
          opacity: 0;
          transform: translateY(30px);
        }
        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }
    }

    .star {
      display: none;

      @include below('md') {
        display: inline-block;
        margin-left: 20px;
      }
    }
  }

  .categories {
    position: relative;
    padding-bottom: 140px;

    @include below('md') {
      padding-bottom: 40px;
      margin-top: 60px;
    }

    .ui-btn-scroll {
      @include below('md') {
        display: none;
      }
    }

    .bird-wrapper {
      width: 90%;
      position: absolute;
      top: 20vh;
      left: 0;
      text-align: center;

      .bird {
        width: 5vw;
      }
    }

    .categories-list {
      margin-top: -15vh;

      @include below('md') {
        margin-top: 0;
      }
    }
  }
}
</style>
