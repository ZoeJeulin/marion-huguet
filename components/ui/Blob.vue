<template>
  <div class="ui-blob">
    <svg
      class="img-blob"
      viewBox="0 0 480 480"
      xmlns="http://www.w3.org/2000/svg"
    >
      <clipPath :id="pathName">
        <!-- https://10015.io/tools/svg-blob-generator -->
        <path
          v-if="index % 3 == 0"
          class="path-1"
          d="M450.5,316.5Q422,393,351,430.5Q280,468,203,453Q126,438,72.5,379.5Q19,321,27,243Q35,165,78.5,100Q122,35,201.5,22.5Q281,10,348.5,51.5Q416,93,447.5,166.5Q479,240,450.5,316.5Z"
        />

        <path
          v-else-if="index % 3 == 1"
          class="path-2"
          d="M448.5,306Q421,372,365,412.5Q309,453,238.5,457Q168,461,114,415.5Q60,370,36.5,305Q13,240,31,170.5Q49,101,110,65Q171,29,241.5,24Q312,19,369.5,61.5Q427,104,451.5,172Q476,240,448.5,306Z"
        />

        <path
          v-else
          class="path-3"
          d="M453.5,308Q428,376,369.5,417Q311,458,240,458Q169,458,115.5,413.5Q62,369,33,304.5Q4,240,32.5,175Q61,110,116.5,70Q172,30,239.5,31.5Q307,33,368.5,67.5Q430,102,454.5,171Q479,240,453.5,308Z"
        />
      </clipPath>
    </svg>

    <img
      class="img-wrapper"
      :style="`clip-path: url('#${pathName}');`"
      src="https://source.unsplash.com/random/480x480"
      alt="category image"
    />
  </div>
</template>

<script>
import { gsap } from 'gsap'

export default {
  props: {
    index: {
      type: Number,
      default: 1,
    },
    pathName: {
      type: String,
      default: 'path',
    },
    scale: {
      type: Number,
      default: 1,
    },
    scaleMobile: {
      type: Number,
      default: 1,
    },
  },
  mounted() {
    const svgPath = this.$el.querySelector('.img-blob path')
    const mqCategoryHome = gsap.matchMedia()

    mqCategoryHome.add('(max-width: 640px)', () => {
      gsap.set(svgPath, {
        scale: this.scaleMobile,
      })
    })

    mqCategoryHome.add('(min-width: 641px)', () => {
      gsap.set(svgPath, {
        scale: this.scale,
      })
    })

    gsap.set(svgPath, {
      transformOrigin: '50% 50%',
    })

    gsap.to(svgPath, {
      rotation: this.index % 2 === 0 ? 360 : -360,
      duration: 5,
      repeat: -1,
      ease: 'none',
    })
  },
}
</script>

<style lang="scss">
.ui-blob {
  position: relative;
  z-index: 0;

  .img-wrapper {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    object-fit: cover;
  }
}
</style>
