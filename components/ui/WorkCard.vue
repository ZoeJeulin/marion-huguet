<template>
  <li class="ui-work-card" :class="index % 2 == 1 ? '-left' : '-right'">
    <div class="work-img-wrapper">
      <img
        class="work-img"
        :src="work.workImages[0].responsiveImage.src"
        :alt="work.workTitle"
      />
      <ui-frame
        :desktop-corners="index % 2 == 0 ? [3] : [4]"
        :mobile-corners="index % 2 == 0 ? [3] : [4]"
      />
    </div>
    <div class="work-overlay">
      <div class="work-content">
        <div class="work-title t-h3">{{ work.workTitle }}</div>
        <div class="work-desc t-body-2">{{ work.workDescription }}</div>
      </div>
      <div class="work-cta">
        <ui-icon name="arrow" class="arrow" />
        <!-- <span class="t-cta-2">En savoir plus</span> -->
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    work: {
      type: Object,
      default: () => {},
    },
    index: {
      type: Number,
      default: 1,
    },
  },
}
</script>

<style lang="scss">
.ui-work-card {
  position: relative;
  width: 35%;
  margin: -10% auto;

  @include below('sm') {
    width: 100%;
    margin: 0;
    display: flex;
  }

  + .ui-work-card {
    margin-top: 80px;
  }

  &:hover {
    .work-img-wrapper:before {
      opacity: 1;
    }

    .work-overlay {
      opacity: 1;
    }
  }

  &:first-of-type {
    margin-top: 0;

    @include below('sm') {
      margin-top: 80px;
    }
  }

  &:last-of-type {
    margin-bottom: 0;
  }

  &.-left {
    transform: translateX(-60%);

    @include below('sm') {
      transform: none;
      align-self: flex-end;
    }

    .work-img-wrapper {
      padding-left: 50px;

      &:before {
        left: 50px;
      }

      @include below('sm') {
        padding-left: 20px;
        order: 2;
      }
    }

    .work-overlay {
      padding-left: 70px;

      @include below('sm') {
        padding-left: 0;
        order: 1;
      }
    }
  }

  &.-right {
    transform: translateX(60%);

    @include below('sm') {
      transform: none;
    }

    .work-img-wrapper {
      padding-right: 50px;

      &:before {
        right: 50px;
      }

      @include below('sm') {
        padding-right: 20px;
      }
    }

    .work-overlay {
      padding-right: 70px;

      @include below('sm') {
        padding-right: 0;
      }
    }
  }

  .work-img-wrapper {
    position: relative;
    padding-bottom: 50px;

    @include below('sm') {
      width: 75%;
      padding-bottom: 20px;
    }

    &:before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 50px;
      left: 0;
      right: 0;
      background: linear-gradient(
        180deg,
        rgba($blue2, 0.25) 0%,
        rgba($blue2, 0.9) 100%
      );
      opacity: 0;
      transition: opacity 0.3s ease-out;

      @include below('sm') {
        display: none;
      }
    }
  }

  .work-overlay {
    display: flex;
    justify-content: space-between;
    position: absolute;
    bottom: 50px;
    padding: 20px;
    opacity: 0;
    transition: opacity 0.3s ease-out;
    z-index: 2;

    @include below('sm') {
      position: relative;
      width: 25%;
      justify-content: start;
      flex-direction: column;
      bottom: auto;
      padding: 0;
      opacity: 1;
      transition: none;
    }

    .work-content {
      width: 70%;

      @include below('sm') {
        width: 100%;
      }

      .work-desc {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        line-clamp: 3;
        -webkit-box-orient: vertical;
      }
    }

    .work-cta {
      width: 28%;
      align-self: flex-end;

      @include below('sm') {
        width: 100%;
        align-self: flex-start;
      }
    }
  }
}
</style>
