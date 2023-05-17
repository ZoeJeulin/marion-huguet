<template>
  <section class="section-infos">
    <h1 class="infos-title t-h2">
      <ui-icon name="etoile" class="star" />
      {{ infosTitle }}
      <ui-icon name="etoile" class="star" />
    </h1>
    <div class="infos-text t-body-1" v-html="infosText"></div>
    <ui-blob
      ref="infosPhoto"
      class="infos-photo"
      :path-name="infosPhoto.responsiveImage.src"
      :scale="0.52"
      :scale-mobile="0.25"
    />
    <ui-frame ref="frameInfos" :desktop-corners="[2, 3]" />
  </section>
</template>

<script>
import { gsap } from 'gsap'

export default {
  props: {
    infosTitle: {
      type: String,
      required: true,
    },
    infosText: {
      type: String,
      required: true,
    },
    infosPhoto: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {
    this.$nextTick(() => {
      const mq = gsap.matchMedia()
      mq.add('(min-width: 769px)', () => {
        this.$refs.frameInfos.$refs.corner.forEach((corner) => {
          gsap.to(corner.$refs.vertical, {
            scaleY: 1,
            duration: 0.2,
            delay: 0.6,
            ease: 'ease-out',
          })
          gsap.to(corner.$refs.horizontal, {
            scaleX: 1,
            duration: 0.2,
            delay: 0.8,
            ease: 'ease-out',
          })
        })

        gsap.to('.infos-photo', {
          opacity: 1,
          duration: 0.5,
          delay: 0.6,
          ease: 'ease-out',
        })

        gsap.to('.infos-title', {
          opacity: 1,
          x: 0,
          duration: 0.5,
          delay: 0.3,
          ease: 'ease-out',
        })

        gsap.to('.infos-text', {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: 0.6,
          ease: 'ease-out',
        })
      })

      mq.add('(max-width: 768px)', () => {
        gsap.to('.infos-title', {
          opacity: 1,
          y: 0,
          duration: 0.3,
          delay: 0.3,
          ease: 'ease-out',
        })

        gsap.to('.infos-photo', {
          opacity: 1,
          y: 0,
          duration: 0.3,
          delay: 0.4,
          ease: 'ease-out',
        })

        gsap.to('.infos-text', {
          opacity: 1,
          y: 0,
          duration: 0.3,
          delay: 0.5,
          ease: 'ease-out',
        })
      })
    })
  },
}
</script>

<style lang="scss">
.section-infos {
  position: relative;
  display: flex;
  width: 60%;
  padding-top: 160px;

  @include below('lg') {
    width: 100%;
    padding-top: 120px;
  }

  @include below('md') {
    display: block;
    padding-top: 0;
  }

  .infos-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    writing-mode: vertical-lr;
    -webkit-writing-mode: vertical-lr;
    transform: translateX(30px) rotate(180deg);
    text-align: center;
    margin: 40px 0;
    opacity: 0;

    @include below('md') {
      writing-mode: horizontal-tb;
      -webkit-writing-mode: horizontal-tb;
      transform: none;
      text-align: left;
      margin: 0 0 10px 0;
      transform: translateY(15px);
    }

    .star {
      @include below('md') {
        display: none;
      }
      &:first-of-type {
        margin-bottom: 40px;
      }
      &:last-of-type {
        margin-top: 40px;
      }
    }
  }

  .infos-text {
    position: relative;
    padding-left: 60px;
    margin: 60px 60px 60px 0;
    transform: translateY(30px);
    opacity: 0;
    z-index: 3;

    @include below('lg') {
      padding-left: 40px;
    }

    @include below('md') {
      padding-left: 0;
      margin: 0;
      transform: translateY(15px);
    }

    &::before {
      content: '';
      width: 100px;
      height: 16px;
      float: right;
    }
  }

  .infos-photo {
    position: absolute;
    top: 120px;
    right: -100px;
    width: 255px;
    z-index: 2;
    opacity: 0;

    animation: blobAnim 5s 0s ease-in-out infinite;

    @keyframes blobAnim {
      0% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-20px);
      }
      100% {
        transform: translateY(0);
      }
    }

    @include below('md') {
      width: 135px;
      top: -40px;
      right: 0;
      animation: none;
      transform: translateY(15px);
    }

    .img-wrapper img {
      max-width: 100%;
    }
  }
}
</style>
