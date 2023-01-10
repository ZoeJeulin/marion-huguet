<template>
  <li class="category">
    <h2 class="category-title t-h1">{{ category.title }}</h2>
    <ul class="category-works">
      <ui-work-card
        v-for="(work, index) in category.works"
        :key="`work-item-${work.id}`"
        :work="work"
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
}
</script>

<style lang="scss">
.category {
  display: flex;

  .category-title {
    order: 2;
    width: 10%;
    max-height: 100vh;
    word-wrap: break-word;
    white-space: normal;
    writing-mode: vertical-rl;
    -webkit-writing-mode: vertical-rl;
    margin: 5vh 0;
    @include fluid-type($xs, $xl, 44px, 90px);
  }

  .category-works {
    order: 1;
    width: 90%;
    position: relative;

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
    }
  }
}
</style>
