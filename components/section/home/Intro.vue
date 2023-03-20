<template>
  <div class="section-intro">
    <div class="intro-content">
      <client-only>
        <div class="intro-lottie">
          <div ref="anim"></div>
        </div>
      </client-only>
      <h1 class="sr-only">Marion Huguet</h1>
      <div class="intro-desc t-body-1">
        {{ introText }}
      </div>
    </div>
    <div class="intro-birds">
      <ui-icon
        v-for="i in 3"
        :key="`bird-intro-${i}`"
        name="bird"
        class="bird"
      />
    </div>
    <ui-icon name="etoile" class="star -mobile" />
    <ui-frame :desktop-corners="[1, 2, 3, 4]" />
  </div>
</template>

<script>
import lottie from 'lottie-web'

export default {
  props: {
    introText: {
      type: String,
      default: '',
    },
  },
  mounted() {
    setTimeout(async () => {
      if (this.$refs.anim) {
        const { default: data } = await import('@/assets/lottie/typo.json')
        this.lottie = lottie.loadAnimation({
          container: this.$refs.anim,
          renderer: 'svg',
          loop: false,
          autoplay: true,
          animationData: data,
        })
      }
    }, 0)
  },
}
</script>

<style lang="scss">
.section-intro {
  width: 100%;
  position: relative;
  padding: 40px;
  display: flex;

  @include below('sm') {
    padding: 0;
    flex-direction: column;
  }

  .intro-content {
    width: 70%;

    @include below('sm') {
      width: 100%;
    }

    .intro-desc {
      margin-top: 60px;

      @include below('sm') {
        margin-top: 20px;
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
      height: fit-content;

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
