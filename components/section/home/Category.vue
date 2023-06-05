<template>
  <div ref="category" class="home-category">
    <ui-blob
      ref="catImg"
      class="category-img"
      :class="{ '-right': index % 2 == 1 }"
      :index="index"
      :path-name="section.image.responsiveImage.src"
    />
    <div class="category-wrapper" :class="{ '-right': index % 2 == 1 }">
      <ui-icon name="etoile" class="star -desktop" />
      <div class="category-content">
        <h2 ref="catTitle" class="category-title t-h2">{{ section.title }}</h2>
        <div
          ref="catDesc"
          class="category-desc t-body-1"
          v-html="section.description"
        ></div>
        <ui-link
          ref="catLink"
          class="category-link"
          :label="section.btnLabel"
          path="portfolio"
          :hash="`#${section.title.toLowerCase().replace(/[\W_]+/g, '-')}`"
        />
      </div>

      <ui-icon name="etoile" class="star -desktop" />
    </div>
    <ui-icon name="etoile" class="star -mobile" />
    <ui-frame
      ref="frameCat"
      :desktop-corners="[2, 3]"
      :mobile-corners="[1, 2, 3, 4]"
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
    section: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {
    // const hBlob = this.$el.querySelector('.category-img').offsetWidth
    console.log(this.$el.querySelector('.category-img').offsetHeight)
    // gsap.set('.shop-images', { height: hBlob + 'px' })

    this.$refs.frameCat.$refs.corner.forEach((corner) => {
      gsap.to(corner.$refs.vertical, {
        scaleY: 1,
        duration: 0.2,
        ease: 'ease-out',
        scrollTrigger: {
          trigger: this.$refs.category,
          start: 'top 90%',
        },
      })
      gsap.to(corner.$refs.horizontal, {
        scaleX: 1,
        duration: 0.2,
        ease: 'ease-out',
        scrollTrigger: {
          trigger: this.$refs.category,
          start: 'top 90%',
        },
      })
    })

    gsap.to(this.$refs.catTitle, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'ease-out',
      scrollTrigger: {
        trigger: this.$refs.catTitle,
        start: 'top 85%',
      },
    })

    gsap.to(this.$refs.catDesc, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      delay: 0.2,
      ease: 'ease-out',
      scrollTrigger: {
        trigger: this.$refs.catTitle,
        start: 'top 85%',
      },
    })

    gsap.to(this.$refs.catLink.$el, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      delay: 0.5,
      ease: 'ease-out',
      scrollTrigger: {
        trigger: this.$refs.catTitle,
        start: 'top 85%',
      },
    })

    gsap.to(this.$refs.catImg.$el, {
      opacity: 1,
      duration: 0.5,
      ease: 'ease-out',
      scrollTrigger: {
        trigger: this.$refs.catTitle,
        start: 'top 85%',
      },
    })

    const mqCatHome = gsap.matchMedia()

    mqCatHome.add('(min-width: 769px)', () => {
      gsap.to(this.$refs.catImg.$el, {
        y: 0,
        duration: 3,
        ease: 'ease-out',
        scrollTrigger: {
          trigger: this.$refs.catTitle,
          start: 'top 85%',
        },
      })

      gsap.fromTo(
        this.$refs.catImg.$el,
        {
          x: 0,
        },
        {
          x: Math.PI * 3,
          duration: 3,
          modifiers: {
            x(x) {
              return Math.sin(parseFloat(x)) * 5 + 'px'
            },
          },
          scrollTrigger: {
            trigger: this.$refs.catTitle,
            start: 'top 85%',
          },
        }
      )
    })

    mqCatHome.add('(max-width: 768px)', () => {
      gsap.to(this.$refs.catImg.$el, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: this.$refs.category,
          start: 'top center',
          end: 'bottom center',
          scrub: true,
        },
      })

      gsap.to(this.$el.querySelector('.category-img img'), {
        filter: 'brightness(0.5) blur(1px)',
        ease: 'none',
        scrollTrigger: {
          trigger: this.$refs.category,
          start: 'top 25%',
          end: 'bottom center',
          scrub: true,
        },
      })
    })
  },
}
</script>

<style lang="scss">
.home-category {
  position: relative;
  padding: 40px;
  min-height: calc(100vh - 30px);
  display: flex;
  justify-content: space-evenly;

  @include below('lg') {
    min-height: auto;
  }

  @include below('md') {
    flex-direction: column;
    padding: 60px 10px;
    justify-content: center;
  }

  .category-img {
    width: 30%;
    opacity: 0;
    transform: translateX(0px) translateY(150px);

    &.-right {
      order: 2;

      @include below('md') {
        left: -10%;
      }
    }

    @include below('md') {
      width: 68%;
      position: absolute;
      top: 0 !important;
      right: -5%;
      transform: translateY(0%);
    }

    img {
      @include below('md') {
        filter: brightness(1) blur(0px);
      }
    }
  }

  .category-wrapper {
    width: 55%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 2;
    padding-left: 60px;

    &.-right {
      padding-left: 0;

      @include below('md') {
        text-align: right;
      }
    }

    @include below('md') {
      padding-left: 0;
      width: 100%;
    }

    .category-content {
      padding: 100px 0;

      .category-title {
        margin-bottom: 20px;
        opacity: 0;
        transform: translateY(30px);

        @include below('md') {
          transform: translateY(15px);
        }
      }

      .category-desc {
        margin-bottom: 80px;
        opacity: 0;
        transform: translateY(30px);

        @include below('md') {
          margin-bottom: 40px;
          transform: translateY(15px);
        }
      }

      .category-link {
        opacity: 0;
        transform: translateY(10px);
      }
    }
  }

  .star {
    margin: auto;

    &.-desktop {
      display: block;

      @include below('md') {
        display: none;
      }
    }

    &.-mobile {
      display: none;

      @include below('md') {
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
