<template>
  <div class="ui-transition">
    <div v-for="i in 4" :key="`wave-${i}`" ref="wave" class="wave"></div>
  </div>
</template>

<script>
import { gsap } from 'gsap'

export default {
  data() {
    return {}
  },
  mounted() {
    gsap.set(this.$el, {
      autoAlpha: 0,
    })
  },
  methods: {
    show() {
      gsap.set(this.$el, {
        autoAlpha: 1,
      })
      return gsap.fromTo(
        this.$refs.wave,
        { scaleY: 0, transformOrigin: '50% 100%' },
        {
          scaleY: 1,
          stagger: { amount: 0.3 },
          duration: 0.5,
          ease: 'power2.out',
        }
      )
    },
    hide() {
      gsap.set(this.$refs.wave, { transformOrigin: '50% 0' })

      return gsap
        .to(this.$refs.wave, {
          scaleY: 0,
          stagger: { amount: 0.3, from: 'end' },
          ease: 'power2.in',
          duration: 0.5,
        })
        .then(() => {
          gsap.set(this.$el, {
            autoAlpha: 0,
          })
        })
    },
  },
}
</script>

<style lang="scss">
.ui-transition {
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 100;

  .wave {
    position: absolute;
    width: 100%;
    height: 100%;
    transform-origin: 50% 100%;
    transform: scaleY(0);

    &:nth-of-type(1) {
      z-index: 101;
      background-color: $beige;
    }

    &:nth-of-type(2) {
      z-index: 102;
      background-color: $blue1;
    }

    &:nth-of-type(3) {
      z-index: 103;
      background-color: $blue2;
    }

    &:nth-of-type(4) {
      z-index: 104;
      background-color: $blue3;
    }
  }
}
</style>
