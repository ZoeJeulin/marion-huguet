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
      <img
        src="~/assets/img/bird1.png"
        alt="Pictogramme d'oiseau"
        class="bird"
      />
      <img
        src="~/assets/img/bird2.png"
        alt="Pictogramme d'oiseau"
        class="bird"
      />
      <img
        src="~/assets/img/bird3.png"
        alt="Pictogramme d'oiseau"
        class="bird"
      />
    </div>
    <ui-icon name="etoile" class="star -mobile" />
    <ui-frame :desktop-corners="[1, 2, 3, 4]" />
  </div>
</template>

<script>
import lottie from 'lottie-web'
import { gsap } from 'gsap'

export default {
  props: {
    introText: {
      type: String,
      default: '',
    },
  },
  mounted() {
    const tlIntro = gsap.timeline()

    this.$el.querySelectorAll('.ui-frame .frame-corner').forEach((corner) => {
      tlIntro.to(corner.querySelector('.corner-vertical'), {
        scaleY: 1,
        duration: 0.2,
        ease: 'ease-out',
      })
      tlIntro.to(corner.querySelector('.corner-horizontal'), {
        scaleX: 1,
        duration: 0.2,
        ease: 'ease-out',
      })
    })

    tlIntro.to('.intro-desc', {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'ease-out',
    })

    const bird1 = this.$el.querySelector('.bird:nth-of-type(1)')
    const bird2 = this.$el.querySelector('.bird:nth-of-type(2)')
    const bird3 = this.$el.querySelector('.bird:nth-of-type(3)')

    tlIntro.to(bird1, {
      opacity: 1,
      y: 0,
      x: 0,
      duration: 0.5,
    })

    tlIntro.to(
      bird2,
      {
        opacity: 1,
        y: 0,
        x: 0,
        duration: 0.5,
      },
      '<'
    )

    tlIntro.to(
      bird3,
      {
        opacity: 1,
        y: 0,
        x: 0,
        duration: 0.5,
      },
      '<'
    )

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

    .intro-lottie {
      width: 100%;
      height: calc((100vw - 160px) * 0.7 * (510 / 1473));

      @include below('sm') {
        height: auto;
      }
    }

    .intro-desc {
      margin-top: 60px;
      opacity: 0;
      transform: translateY(10px);

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
      width: 18%;
      height: auto;
      opacity: 0;

      &:nth-of-type(1) {
        top: 25%;
        left: 35%;
        transform: translate(10px, 15px) rotate(-70deg);

        @include below('sm') {
          left: 30%;
          transform: translate(0) rotate(190deg);
        }
      }

      &:nth-of-type(2) {
        top: 0;
        bottom: 0;
        right: 15%;
        margin: auto;
        transform: translate(-12px, -5px) rotate(80deg);

        @include below('sm') {
          right: 25%;
          transform: translate(0) rotate(95deg);
        }
      }

      &:nth-of-type(3) {
        bottom: 25%;
        left: 35%;
        transform: translate(-2px, -15px) rotate(10deg);

        @include below('sm') {
          bottom: 15%;
          left: 35%;
          transform: translate(0) rotate(-65deg);
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
