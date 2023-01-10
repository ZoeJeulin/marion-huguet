<template>
  <div class="portfolio">
    <h1 class="title t-h1">{{ page.pageTitle }}</h1>
    <div class="categories">
      <ui-side-nav :sections="page.portfolioCategories" />
      <!-- <div class="bird-wrapper">
        <ui-icon name="bird" class="bird" />
      </div> -->
      <ul class="categories-list">
        <section-portfolio-category
          v-for="(category, index) in page.portfolioCategories"
          :id="category.title.toLowerCase().replace(/[\W_]+/g, '-')"
          :key="`category-item-${category.id}`"
          :category="category"
          :first-index="getFirstIndex(index)"
        >
        </section-portfolio-category>
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
    const categories = this.$el.querySelectorAll('.category')
    categories.forEach((cat) => {
      ScrollTrigger.create({
        trigger: cat,
        start: 'top top',
        end: 'bottom bottom',
        pin: cat.querySelector('.category-title'),
        markers: true,
      })
    })

    const mq = gsap.matchMedia()
    mq.add('(min-width: 641px)', () => {
      ScrollTrigger.create({
        trigger: '.categories',
        start: 'top top',
        endTrigger: 'footer',
        end: 'top bottom',
        pin: '.ui-side-nav',
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
  }

  .categories {
    position: relative;
    padding-bottom: 140px;

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
    }
  }
}
</style>
