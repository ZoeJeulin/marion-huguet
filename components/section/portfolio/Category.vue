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
        v-for="(work, index) in worksByDate"
        :key="`work-item-${work.id}`"
        :work="work"
        :category="category.title"
        :index="firstIndex + index"
      />
    </ul>
  </li>
</template>

<script>
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
  computed: {
    worksByDate() {
      let sortedWorks = this.category.works
      sortedWorks = sortedWorks.sort(
        (a, b) => new Date(b.workDate) - new Date(a.workDate)
      )
      return sortedWorks
    },
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

    @include below('lg') {
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
    margin: calc(90px + 5vh) 0 5vh;
    @include fluid-type($xs, $xl, 36px, 72px);

    @include below('md') {
      position: absolute;
      top: 0;
      margin: 0;
    }

    &.-left {
      @include below('md') {
        text-align: right;
        transform-origin: 25% center;
        transform: translateX(-100px) rotate(180deg);
      }
    }

    &.-right {
      @include below('md') {
        right: -17px;
        transform: translateX(100px) rotate(0deg);
      }
    }
  }

  .category-works {
    order: 1;
    width: 90%;
    position: relative;

    @include below('md') {
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
      transform-origin: center top;
      transform: scaleY(0);
      animation: line 3s 1s ease-out forwards;

      @keyframes line {
        0% {
          transform: scaleY(0);
        }
        100% {
          transform: scaleY(1);
        }
      }

      @include below('md') {
        display: none;
      }
    }
  }
}
</style>
