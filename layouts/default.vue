<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <ui-transition v-if="$route.path !== '/'" ref="transition" />
    <app-header v-if="$route.path !== '/'" />
    <div id="main-default">
      <Particles
        id="tsparticles"
        :options="options"
        :particles-init="particlesInit"
      />
      <nuxt />
    </div>
    <app-footer v-if="$route.path !== '/'" />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { loadFull } from 'tsparticles'

gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(MotionPathPlugin)

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
            value: 0.15,
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

    const shouldIgnoreTransition = (from, to) => {
      const fromName = from.name
      const toName = to.name

      if (!fromName || !toName) {
        return false
      }

      return fromName.startsWith(toName) || toName.startsWith(fromName)
    }

    this.$router.beforeEach((to, from, callback) => {
      if (shouldIgnoreTransition(from, to) || this.$route.path === '/') {
        callback()
      } else {
        this.$refs.transition.show().then(callback)
      }
    })

    this.$router.afterEach((to, from, callback) => {
      if (from.path !== '/') {
        this.$refs.transition.hide()
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

<style lang="scss">
html {
  width: 100%;
  min-height: 100vh;
  height: -webkit-fill-available;
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
  min-height: 100vh;
  min-height: -webkit-fill-available;
  -webkit-overflow-scrolling: touch;
  overflow-y: scroll;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: Inter, Arial, sans-serif;
  background: $blue1;

  #main-default {
    padding: 160px 40px 40px 40px;
    overflow: hidden;

    @include below('sm') {
      padding: 100px 20px 40px;
    }
  }
}
</style>
