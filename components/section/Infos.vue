<template>
  <section class="section-infos">
    <h1 class="infos-title t-h2">
      <ui-icon name="etoile" class="star" />
      {{ infosTitle }}
      <ui-icon name="etoile" class="star" />
    </h1>
    <div class="infos-text t-body-1">{{ infosText }}</div>
    <ui-frame :desktop-corners="[2, 3]" />
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
  },
  mounted() {
    const mq = gsap.matchMedia()
    mq.add('(min-width: 641px)', () => {
      this.$el.querySelectorAll('.ui-frame .frame-corner').forEach((corner) => {
        gsap.to(corner.querySelector('.corner-vertical'), {
          scaleY: 1,
          duration: 0.2,
          delay: 0.6,
          ease: 'ease-out',
        })
        gsap.to(corner.querySelector('.corner-horizontal'), {
          scaleX: 1,
          duration: 0.2,
          delay: 0.8,
          ease: 'ease-out',
        })
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

    mq.add('(max-width: 640px)', () => {
      gsap.to('.infos-title', {
        opacity: 1,
        y: 0,
        duration: 0.3,
        delay: 0.3,
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
  },
}
</script>

<style lang="scss">
.section-infos {
  position: relative;
  display: flex;
  width: 60%;
  padding-top: 160px;

  @include below('sm') {
    display: block;
    width: 100%;
    padding: 100px 20px 0;
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

    @include below('sm') {
      writing-mode: horizontal-tb;
      -webkit-writing-mode: horizontal-tb;
      transform: none;
      text-align: left;
      margin: 0 0 10px 0;
      transform: translateY(15px);
    }

    .star {
      &:first-of-type {
        margin-bottom: 40px;
        @include below('sm') {
          display: none;
        }
      }
      &:last-of-type {
        margin-top: 40px;
        @include below('sm') {
          margin-top: 0;
          margin-left: 20px;
        }
      }
    }
  }

  .infos-text {
    padding-left: 60px;
    margin: 60px 60px 60px 0;
    transform: translateY(30px);
    opacity: 0;

    @include below('sm') {
      padding-left: 0;
      margin: 0;
      transform: translateY(15px);
    }
  }
}
</style>
