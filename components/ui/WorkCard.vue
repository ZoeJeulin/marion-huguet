<template>
  <li class="ui-work-card" :class="index % 2 == 1 ? '-left' : '-right'">
    <div class="work-img-wrapper">
      <img
        class="work-img"
        :src="work.workImages[0].responsiveImage.src"
        :alt="work.workTitle"
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

    <ui-frame
      :desktop-corners="index % 2 == 0 ? [3] : [4]"
      :mobile-corners="index % 2 == 0 ? [3] : [4]"
    />
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
  padding-bottom: 50px;

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
  }

  &:last-of-type {
    margin-bottom: 0;
  }

  &.-left {
    transform: translateX(-60%);
    padding-left: 50px;
  }

  &.-right {
    transform: translateX(60%);
    padding-right: 50px;

    .work-overlay {
      padding-right: 70px;
    }
  }

  .work-img-wrapper {
    position: relative;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(
        180deg,
        rgba($blue2, 0.25) 0%,
        rgba($blue2, 0.9) 100%
      );
      opacity: 0;
      transition: opacity 0.3s ease-out;
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

    .work-content {
      width: 70%;

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
    }
  }
}
</style>
