<template>
  <li class="category">
    <h2
      class="category-title t-h1"
      :class="firstIndex % 2 == 0 ? '-left' : '-right'"
    >
      {{ category.title }}
    </h2>
    <ul
      class="category-works"
      :class="firstIndex % 2 == 0 ? '-right' : '-left'"
    >
      <ui-work-card
        v-for="(work, index) in category.works"
        :key="`work-item-${work.id}`"
        :work="work"
        :category="category.title"
        :index="firstIndex + index"
      />
    </ul>
  </li>
</template>

<script>
import { gsap } from 'gsap'

export default {
  props: {
    category: {
      type: Object,
      default: () => {},
    },
    firstIndex: {
      type: Number,
      default: 0,
    },
  },
  mounted() {
    const mqCategory = gsap.matchMedia()

    const works = this.$el.querySelectorAll('.ui-work-card')
    works.forEach((work) => {
      mqCategory.add('(max-width: 640px)', () => {
        gsap.to(work.querySelector('.work-overlay'), {
          y: '20px',
          ease: 'none',
          scrollTrigger: {
            trigger: work,
            scrub: true,
          },
        })
      })
    })
  },
}
</script>

<style lang="scss">
.category {
  position: relative;
  display: flex;

  &:first-of-type .category-works .ui-work-card:first-of-type {
    margin-top: 0;
  }

  + .category {
    margin-top: 160px;

    @include below('sm') {
      margin-top: 80px;
    }
  }

  .category-title {
    display: inline-flex;
    order: 2;
    width: 10%;
    max-height: 100vh;
    z-index: 3;
    word-wrap: break-word;
    writing-mode: vertical-rl;
    -webkit-writing-mode: vertical-rl;
    white-space: normal;
    margin: 5vh 0;
    @include fluid-type($xs, $xl, 36px, 90px);

    @include below('sm') {
      position: absolute;
      top: 0;
      margin: 0;
    }

    &.-left {
      @include below('sm') {
        text-align: right;
        transform: translateX(-50%) rotate(180deg);
      }
    }

    &.-right {
      @include below('sm') {
        right: 0;
        transform: translateX(50%);
      }
    }
  }

  .category-works {
    order: 1;
    width: 90%;
    position: relative;

    @include below('sm') {
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    &:before {
      content: '';
      position: absolute;
      top: 20vh;
      bottom: 20vh;
      left: 0;
      right: 0;
      margin: auto;
      height: 100%;
      width: 1px;
      background: $white;

      @include below('sm') {
        display: none;
      }
    }
  }
}
</style>
