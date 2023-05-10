<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="default-wrapper">
    <ui-transition ref="transition" />
    <app-header />
    <div id="main-default">
      <Particles
        id="tsparticles"
        :options="options"
        :particles-init="particlesInit"
      />
      <nuxt />
    </div>
    <app-footer />
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
  props: ['error'],
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
    console.log(this.error)
    window.addEventListener('resize', this.resize)
    this.resize()

    gsap.to(document.querySelector('.header-desktop'), {
      top: 0,
      ease: 'ease-out',
      duration: 1,
    })

    gsap.to(document.querySelector('.header-nav'), {
      top: 0,
      ease: 'ease-out',
      duration: 1,
    })

    const shouldIgnoreTransition = (from, to) => {
      const fromName = from.name
      const toName = to.name

      if (!fromName || !toName) {
        return false
      }

      return fromName.startsWith(toName) || toName.startsWith(fromName)
    }

    this.$router.beforeEach((to, from, callback) => {
      if (shouldIgnoreTransition(from, to)) {
        callback()
      } else {
        this.$refs.transition.show().then(callback)
      }
    })

    this.$router.afterEach((to, from, callback) => {
      this.$refs.transition.hide()
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

<style lang="scss">
html {
  width: 100%;
  min-height: -webkit-fill-available;
  scroll-behavior: smooth;

  .page-enter-active,
  .page-leave-active {
    transition: opacity 0.3s ease-out;
  }
  .page-enter,
  .page-leave-to {
    opacity: 0;
  }
}

body {
  position: relative;
  min-height: -webkit-fill-available;
  -webkit-overflow-scrolling: touch;
  overflow-y: scroll;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: Inter, Arial, sans-serif;
  background: $blue1;

  .default-wrapper {
    @include below('md') {
      overflow: hidden;
    }

    #main-default {
      padding: 160px 40px 40px 40px;

      @include below('md') {
        padding: 100px 20px 40px;
      }
    }
  }

  #main-splash {
    overflow: hidden;
  }
}
</style>
