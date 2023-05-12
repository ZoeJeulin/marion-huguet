<template>
  <div class="home-support">
    <div class="support-insta">
      <ui-feed-insta :posts="section.feedInstagram" />
      <a class="insta-account t-cta-1" :href="global.instagramLink"
        >Instagram : {{ global.instagramLabel }}</a
      >
    </div>
    <div class="support-wrapper">
      <ui-icon name="etoile" class="star -desktop" />
      <div class="support-content">
        <h2 class="support-title t-h2">{{ section.title }}</h2>
        <div class="support-desc t-body-1" v-html="section.description"></div>
        <ui-link class="support-link" :label="section.btnLabel" />
      </div>

      <ui-icon name="etoile" class="star -desktop" />
    </div>
    <img src="~/assets/img/bird2.png" alt="bird" class="support-bird" />
    <img src="~/assets/img/bird1.png" alt="bird" class="support-bird" />

    <ui-icon name="etoile" class="star -mobile" />
    <ui-frame
      ref="frameSupport"
      :desktop-corners="[2, 3]"
      :mobile-corners="[1, 2, 3, 4]"
    />
  </div>
</template>

<script>
import { gsap } from 'gsap'
import { mapState } from 'vuex'

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
  computed: {
    ...mapState({
      global: (state) => state.global,
    }),
  },
  mounted() {
    this.$refs.frameSupport.$refs.corner.forEach((corner) => {
      gsap.to(corner.$refs.vertical, {
        scaleY: 1,
        duration: 0.2,
        ease: 'ease-out',
        scrollTrigger: {
          trigger: '.home-support',
          start: 'top 90%',
        },
      })
      gsap.to(corner.$refs.horizontal, {
        scaleX: 1,
        duration: 0.2,
        ease: 'ease-out',
        scrollTrigger: {
          trigger: '.home-support',
          start: 'top 90%',
        },
      })
    })

    gsap.to('.insta-account', {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'ease-out',
      scrollTrigger: {
        trigger: '.support-insta',
        start: 'bottom bottom',
      },
    })

    gsap.to('.support-title', {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'ease-out',
      scrollTrigger: {
        trigger: '.support-title',
        start: 'top 85%',
      },
    })

    gsap.to('.support-desc', {
      opacity: 1,
      y: 0,
      duration: 0.5,
      delay: 0.2,
      ease: 'ease-out',
      scrollTrigger: {
        trigger: '.support-title',
        start: 'top 85%',
      },
    })

    gsap.to('.support-link', {
      opacity: 1,
      y: 0,
      duration: 0.3,
      delay: 0.5,
      ease: 'ease-out',
      scrollTrigger: {
        trigger: '.support-title',
        start: 'top 85%',
      },
    })
  },
}
</script>

<style lang="scss">
.home-support {
  position: relative;
  padding: 40px;
  display: flex;
  justify-content: space-between;
  min-height: calc(100vh - 30px);

  @include below('md') {
    padding: 60px 10px;
    flex-direction: column;
    justify-content: center;
  }

  .support-insta {
    width: 30%;
    align-self: center;
    text-align: center;

    @include below('md') {
      margin-top: 40px;
      width: 100%;
      order: 2;
    }

    .insta-account {
      display: inline-block;
      text-transform: none;
      opacity: 0;
      transform: translateY(30px);

      @include below('md') {
        transform: translateY(15px);
      }
    }
  }

  .support-wrapper {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @include below('md') {
      width: 100%;
      order: 1;
    }

    .support-content {
      padding: 100px 0;

      @include below('md') {
        padding: 0;
      }

      .support-title {
        margin-bottom: 20px;
        opacity: 0;
        transform: translateY(30px);

        @include below('md') {
          transform: translateY(15px);
        }
      }

      .support-desc {
        margin-bottom: 80px;
        opacity: 0;
        transform: translateY(30px);

        @include below('md') {
          margin-bottom: 40px;
          transform: translateY(15px);
        }
      }

      .support-link {
        opacity: 0;
        transform: translateY(10px);
      }
    }
  }

  .support-bird {
    position: absolute;
    width: 5%;

    @include below('md') {
      display: none;
    }

    &:nth-of-type(1) {
      right: 6%;
      top: 12%;
      transform: rotate(300deg);
    }

    &:nth-of-type(2) {
      right: 6%;
      top: 32%;
      transform: rotate(25deg);
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
      }
    }
  }
}
</style>
