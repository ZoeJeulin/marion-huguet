<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <app-header />
    <div id="main">
      <nuxt />
    </div>
    <app-footer />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'

gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(MotionPathPlugin)

export default {
  beforeMount() {
    this.resize()
    window.addEventListener('resize', this.resize)
  },
  mounted() {
    window.addEventListener('resize', this.resize)
    this.resize()
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
  },
}
</script>

<style lang="scss">
html {
  width: 100%;
  min-height: 100vh;
  height: -webkit-fill-available;
  scroll-behavior: smooth;
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

  #main {
    padding: 40px;

    @include below('sm') {
      padding: 40px 20px;
    }
  }
}
</style>
