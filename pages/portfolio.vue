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
  mounted() {
    const mqPortoflio = gsap.matchMedia()

    const categories = this.$el.querySelectorAll('.category')
    categories.forEach((cat) => {
      mqPortoflio.add('(min-width: 641px)', () => {
        ScrollTrigger.create({
          trigger: cat,
          start: 'top top',
          end: 'bottom bottom',
          pin: cat.querySelector('.category-title'),
        })
      })

      mqPortoflio.add('(max-width: 640px)', () => {
        gsap.from(cat.querySelector('.category-title'), {
          x: -50,
          duration: 0.5,
          ease: 'ease-out',
          scrollTrigger: {
            trigger: cat.querySelector('.category-title'),
            start: 'top 85%',
          },
        })
      })
    })

    mqPortoflio.add('(min-width: 641px)', () => {
      ScrollTrigger.create({
        trigger: '.categories',
        start: 'top top',
        endTrigger: 'footer',
        end: 'top bottom',
        pin: '.ui-side-nav',
      })

      gsap.from('.title', {
        opacity: 0,
        y: 80,
        duration: 0.5,
        ease: 'ease-out',
      })

      this.$el.querySelectorAll('.ui-work-card').forEach((card) => {
        gsap.from(card, {
          opacity: 0,
          y: 100,
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

    mqPortoflio.add('(max-width: 640px)', () => {
      gsap.from('.title', {
        opacity: 0,
        y: 30,
        duration: 0.5,
        ease: 'ease-out',
      })

      this.$el.querySelectorAll('.ui-work-card').forEach((card) => {
        gsap.from(card, {
          opacity: 0,
          y: 30,
          duration: 0.5,
          ease: 'ease-out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
          },
        })
      })
    })
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

    @include below('sm') {
      margin-top: 0;
      margin-right: 25px;
      text-shadow: none;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .star {
      display: none;

      @include below('sm') {
        display: inline-block;
        margin-left: 20px;
      }
    }
  }

  .categories {
    position: relative;
    padding-bottom: 140px;

    @include below('sm') {
      padding-bottom: 40px;
      margin-top: 60px;
    }

    .ui-btn-scroll {
      @include below('sm') {
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

      @include below('sm') {
        margin-top: 0;
      }
    }
  }
}
</style>
