<template>
  <div class="home-shop">
    <h1 class="shop-title t-h2">
      <ui-icon name="etoile" class="star" />
      <span>{{ section.title }}</span>
      <ui-icon name="etoile" class="star" />
    </h1>
    <div class="shop-desc t-body-1">
      {{ section.description }}
    </div>
    <div class="shop-images">
      <ui-blob
        v-for="i in 3"
        :key="`shop-img-${i}`"
        class="shop-img"
        :style="`width:${blobW}px`"
        :index="i"
        :path-name="`path-shop-${i}`"
        :scale="0.85"
        :scale-mobile="0.18"
      />
    </div>
    <!-- <ui-link class="shop-link" :label="section.btnLabel" path="boutique" /> -->
    <div class="shop-link t-cta-1">A venir prochainement</div>
    <ui-icon name="etoile" class="star -mobile" />
    <ui-frame :desktop-corners="[2, 3]" :mobile-corners="[1, 2, 3, 4]" />
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
    section: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      blobW: 380,
      blobScale: 1,
      w: 1440,
    }
  },
  mounted() {
    this.w = window.innerWidth
    this.blobW = this.$el.querySelector('.shop-images').scrollWidth / 3
    if (this.w > 640) this.blobW -= 20
    this.blobScale = (this.blobW * 3) / this.w

    this.$el.querySelectorAll('.ui-frame .frame-corner').forEach((corner) => {
      gsap.to(corner.querySelector('.corner-vertical'), {
        scaleY: 1,
        duration: 0.2,
        ease: 'ease-out',
      })
      gsap.to(corner.querySelector('.corner-horizontal'), {
        scaleX: 1,
        duration: 0.2,
        ease: 'ease-out',
      })
    })

    gsap.to('.shop-title', {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'ease-out',
      scrollTrigger: {
        trigger: '.shop-title',
        start: 'top 85%',
      },
    })

    gsap.to('.shop-desc', {
      opacity: 1,
      y: 0,
      duration: 0.5,
      delay: 0.2,
      ease: 'ease-out',
      scrollTrigger: {
        trigger: '.shop-title',
        start: 'top 85%',
      },
    })

    gsap.to('.shop-img', {
      opacity: 1,
      duration: 0.5,
      ease: 'ease-out',
      scrollTrigger: {
        trigger: '.shop-title',
        start: 'top 85%',
      },
      stagger: 0.3,
    })

    gsap.to('.shop-img', {
      y: 0,
      duration: 3,
      ease: 'ease-out',
      scrollTrigger: {
        trigger: '.shop-title',
        start: 'top 85%',
      },
      stagger: 0.3,
    })

    gsap.to('.shop-link', {
      opacity: 1,
      y: 0,
      duration: 0.5,
      delay: 0.5,
      ease: 'ease-out',
      scrollTrigger: {
        trigger: '.shop-title',
        start: 'top 85%',
      },
    })
  },
}
</script>

<style lang="scss">
.home-shop {
  position: relative;
  padding: 120px 40px;
  text-align: center;
  min-height: calc(100vh - 30px);

  @include below('sm') {
    padding: 60px 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .shop-title {
    margin-bottom: 20px;
    opacity: 0;
    transform: translateY(30px);

    span:not(.star) {
      padding: 0 80px;

      @include below('sm') {
        padding: 0;
      }
    }

    .star {
      vertical-align: middle;

      @include below('sm') {
        display: none;
      }
    }
  }

  .shop-desc {
    margin-bottom: 60px;
    opacity: 0;
    transform: translateY(30px);

    @include below('sm') {
      margin-bottom: 10px;
    }
  }

  .shop-images {
    display: flex;
    justify-content: space-between;
    margin-bottom: 180px;

    @include below('sm') {
      margin-bottom: 40px;
    }

    .shop-img {
      width: 30%;
      opacity: 0;
      transform: translateY(150px);

      @include below('sm') {
        width: 30%;
      }

      &:first-of-type {
        transform: translateY(25%);

        @include below('sm') {
          transform: translate(-10%, 40px);
        }
      }

      &:last-of-type {
        transform: translateY(25%);

        @include below('sm') {
          transform: translateY(40px);
        }
      }
    }
  }

  .shop-link {
    opacity: 0;
    transform: translateY(30px);
  }

  .star {
    margin: auto;

    &.-desktop {
      display: block;
      @include below('sm') {
        display: none;
      }
    }

    &.-mobile {
      display: none;

      @include below('sm') {
        display: block;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        transform: translateY(100%);
      }
    }
  }
}
</style>
