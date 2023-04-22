<template>
  <div class="home-category">
    <ui-blob
      class="category-img"
      :class="{ '-right': index % 2 == 1 }"
      :index="index"
      :path-name="section.image.responsiveImage.src"
      :scale-mobile="0.45"
    />
    <div class="category-wrapper" :class="{ '-right': index % 2 == 1 }">
      <ui-icon name="etoile" class="star -desktop" />
      <div class="category-content">
        <h2 class="category-title t-h2">{{ section.title }}</h2>
        <div class="category-desc t-body-1">
          {{ section.description }}
        </div>
        <ui-link
          class="category-link"
          :label="section.btnLabel"
          path="portfolio"
          :hash="`#${section.title.toLowerCase().replace(/[\W_]+/g, '-')}`"
        />
      </div>

      <ui-icon name="etoile" class="star -desktop" />
    </div>
    <ui-icon name="etoile" class="star -mobile" />
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
    padding: 60px 10px;
    min-height: auto;
    justify-content: center;
  }

  .category-img {
    width: 40%;
    opacity: 0;
    transform: translateX(0px) translateY(150px);

    &.-right {
      order: 2;

      @include below('sm') {
        left: -10%;
      }
    }

    @include below('sm') {
      width: 68%;
      position: absolute;
      top: 0 !important;
      right: -5%;
      transform: translateY(0%);
    }

    img {
      @include below('sm') {
        filter: brightness(1) blur(0px);
      }
    }
  }

  .category-wrapper {
    width: 55%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 2;

    &.-right {
      @include below('sm') {
        text-align: right;
      }
    }

    @include below('sm') {
      width: 100%;
    }

    .category-content {
      padding: 100px 0;

      .category-title {
        margin-bottom: 20px;
        opacity: 0;
        transform: translateY(30px);

        @include below('sm') {
          transform: translateY(15px);
        }
      }

      .category-desc {
        margin-bottom: 80px;
        opacity: 0;
        transform: translateY(30px);

        @include below('sm') {
          margin-bottom: 40px;
          transform: translateY(15px);
        }
      }

      .category-link {
        opacity: 0;
        transform: translateY(10px);
      }
    }
  }

  .star {
    margin: auto;

    &.-desktop {
      display: block;

      @include below('sm') {
        display: none;
      }
    }

    &.-mobile {
      display: none;

      @include below('sm') {
        display: block;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        transform: translateY(100%);
      }
    }
  }
}
</style>
