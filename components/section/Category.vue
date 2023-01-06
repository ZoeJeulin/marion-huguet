<template>
  <div class="home-category">
    <div class="category-img" :class="{ right: index % 2 == 1 }">
      <img src="https://source.unsplash.com/random" alt="category image" />
    </div>
    <div class="category-wrapper">
      <ui-icon name="etoile" class="star" />
      <div class="category-content">
        <h2 class="category-title t-h2">{{ section.title }}</h2>
        <div class="category-desc t-body-1">
          {{ section.description }}
        </div>
        <ui-link :label="section.btnLabel" />
      </div>

      <ui-icon name="etoile" class="star" />
    </div>
    <ui-frame :desktop-corners="[2, 3]" :mobile-corners="[1, 2, 3, 4]" />
  </div>
</template>

<script>
export default {
  props: {
    index: {
      type: Number,
      default: 1,
    },
    section: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style lang="scss">
.home-category {
  position: relative;
  padding: 40px;
  min-height: calc(100vh - 30px);
  display: flex;
  justify-content: space-between;

  @include below('sm') {
    flex-direction: column;
    padding: 0 10px;
  }

  .category-img {
    width: 30%;
    align-self: center;

    &.right {
      order: 2;
    }

    @include below('sm') {
      width: 50%;
    }
  }

  .category-wrapper {
    width: 50%;

    @include below('sm') {
      width: 100%;
    }

    .category-content {
      padding: 100px 0;

      .category-title {
        margin-bottom: 20px;
      }

      .category-desc {
        margin-bottom: 40px;
      }
    }

    .star {
      display: block;
      margin: auto;
    }
  }
}
</style>
