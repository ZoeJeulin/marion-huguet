<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div id="main-splash">
    <Particles
      id="tsparticles"
      :options="options"
      :particles-init="particlesInit"
    />
    <nuxt />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { loadFull } from 'tsparticles'

if (process.client) {
  gsap.registerPlugin(ScrollTrigger)
}

export default {
  data() {
    return {
      options: {
        fullScreen: {
          enable: true,
          zIndex: -1,
        },
        particles: {
          color: {
            value: '#fff',
          },
          move: {
            enable: true,
            speed: 0.5,
            direction: 'top',
          },
          opacity: {
            value: 0.05,
          },
          shadow: {
            blur: 4,
            color: {
              value: '#ffffff',
            },
            enable: true,
            offset: {
              x: 0,
              y: 0,
            },
          },
          size: {
            value: 2,
          },
          wobble: {
            enable: true,
            speed: {
              angle: 20,
              move: 5,
            },
          },
        },
      },
    }
  },
  beforeMount() {
    this.resize()
    window.addEventListener('resize', this.resize)
  },
  mounted() {
    window.addEventListener('resize', this.resize)
    this.resize()

    this.$router.beforeEach((to, from, callback) => {
      if (document.querySelector('.splash')) {
        gsap
          .to('.splash', { y: '-100vh', duration: 0.75, ease: 'ease-out' })
          .then(callback)
      } else {
        callback()
      }
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize)
  },
  methods: {
    ...mapMutations('layout', ['SET_WINDOW_SIZE']),
    resize() {
      clearTimeout(this.resizeDebounce)
      this.resizeDebounce = setTimeout(() => {
        this.SET_WINDOW_SIZE()
        this.$nuxt.$emit('WINDOW:RESIZE')
      }, 100)
    },
    particlesInit: async (engine) => {
      await loadFull(engine)
    },
  },
}
</script>

<style lang="scss"></style>
