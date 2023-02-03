<template>
  <div class="section-intro">
    <div class="intro-content">
      <h1 class="intro-title t-h1">Marion Huguet</h1>
      <div class="intro-desc t-body-1">
        {{ introText }}
      </div>
    </div>
    <div class="intro-birds">
      <ui-icon v-for="i in 3" :key="`bird-img-${i}`" name="bird" class="bird" />
    </div>
    <ui-icon name="etoile" class="star -mobile" />
    <ui-frame :desktop-corners="[1, 2, 3, 4]" />
  </div>
</template>

<script>
export default {
  props: {
    introText: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss">
.section-intro {
  width: 100%;
  position: relative;
  padding: 40px;
  display: flex;
  overflow: hidden;

  @include below('sm') {
    padding: 0;
    flex-direction: column;
    overflow: visible;
  }

  .intro-content {
    width: 70%;

    @include below('sm') {
      width: 100%;
    }

    .intro-title {
      margin-bottom: 60px;

      @include below('sm') {
        margin-bottom: 20px;
      }
    }
  }

  .intro-birds {
    width: 30%;
    position: relative;

    @include below('sm') {
      width: 100%;
      padding: 140px 0;
    }

    .bird {
      position: absolute;
      width: 20%;

      &:nth-of-type(1) {
        top: 20%;
        left: 20%;
        transform: rotate(180deg);

        @include below('sm') {
          left: 30%;
          transform: rotate(70deg);
        }
      }

      &:nth-of-type(2) {
        top: 0;
        bottom: 0;
        right: 20%;
        margin: auto;
        transform: rotate(45deg);

        @include below('sm') {
          right: 30%;
          transform: rotate(0deg);
        }
      }

      &:nth-of-type(3) {
        bottom: 20%;
        left: 20%;
        transform: rotate(150deg);

        @include below('sm') {
          left: 30%;
          transform: rotate(180deg);
        }
      }
    }
  }

  .star {
    display: none;

    @include below('sm') {
      display: block;
      margin: auto;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      transform: translateY(200%);
    }
  }
}
</style>
