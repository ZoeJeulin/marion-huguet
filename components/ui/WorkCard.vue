<template>
  <li class="ui-work-card" :class="index % 2 == 1 ? '-left' : '-right'">
    <div class="work-img-wrapper">
      <nuxt-picture
        class="work-img"
        :img-attrs="{ class: 'work-img' }"
        :src="work.workImages[0].responsiveImage.src"
        :alt="work.workTitle"
        provider="imgix"
        :modifiers="{ auto: 'format,compress' }"
      />
      <ui-frame
        :desktop-corners="index % 2 == 0 ? [3] : [4]"
        :mobile-corners="index % 2 == 0 ? [3] : [4]"
      />
    </div>
    <div class="work-overlay">
      <div class="work-content">
        <div class="work-category t-body-3">
          {{ category }} - {{ $dayjs(work.workDate).format('MMM YYYY') }}
        </div>
        <div class="work-title t-h3">{{ work.workTitle }}</div>
        <div v-if="work.workDate" class="work-date t-body-2">
          {{ $dayjs(work.workDate).format('MMMM YYYY') }}
        </div>
        <div
          v-if="work.workDescription"
          class="work-desc t-body-2"
          v-html="work.workDescription"
        ></div>
      </div>
      <!-- <div class="work-cta">
        <ui-icon name="arrow" class="arrow" /> -->
      <!-- <span class="t-cta-2">En savoir plus</span> -->
      <!-- </div> -->
    </div>
  </li>
</template>

<script>
import { gsap } from 'gsap'

export default {
  props: {
    work: {
      type: Object,
      default: () => {},
    },
    category: {
      type: String,
      default: '',
    },
    index: {
      type: Number,
      default: 1,
    },
  },
  mounted() {
    const mqWork = gsap.matchMedia()

    setTimeout(() => {
      mqWork.add('(min-width: 769px)', () => {
        this.$el
          .querySelectorAll('.ui-frame .frame-corner')
          .forEach((corner) => {
            gsap.to(corner.querySelector('.corner-vertical'), {
              scaleY: 1,
              duration: 0.2,
              ease: 'ease-out',
              scrollTrigger: corner,
            })
            gsap.to(corner.querySelector('.corner-horizontal'), {
              scaleX: 1,
              duration: 0.2,
              ease: 'ease-out',
              scrollTrigger: corner,
            })
          })
      })

      mqWork.add('(max-width: 768px)', () => {
        this.$el
          .querySelectorAll('.ui-frame .frame-corner')
          .forEach((corner) => {
            gsap.to(corner.querySelector('.corner-vertical'), {
              scaleY: 1,
              duration: 0.2,
              ease: 'ease-out',
              scrollTrigger: {
                trigger: corner,
                start: 'top 85%',
              },
            })
            gsap.to(corner.querySelector('.corner-horizontal'), {
              scaleX: 1,
              duration: 0.2,
              delay: 0.2,
              ease: 'ease-out',
              scrollTrigger: {
                trigger: corner,
                start: 'top 85%',
              },
            })
          })
      })
    }, 500)
  },
}
</script>

<style lang="scss">
.ui-work-card {
  position: relative;
  width: 40%;
  margin: -10% auto;
  opacity: 0;

  @include below('lg') {
    width: 45%;
    //margin: -10% 0;
  }

  @include below('md') {
    width: 75%;
    margin: 0;
    display: flex;
  }

  + .ui-work-card {
    @include below('md') {
      margin-top: 80px;
    }
  }

  &:hover {
    .work-img-wrapper:before {
      opacity: 1;
    }

    .work-overlay {
      opacity: 1;
    }
  }

  &:first-of-type {
    margin-top: 0;

    &.-left .work-img-wrapper:before,
    &.-right .work-img-wrapper:before {
      @include below('md') {
        background: linear-gradient(
          90deg,
          rgba(4, 34, 62, 0.15) 0%,
          rgba(4, 34, 62, 0) 12%,
          rgba(4, 34, 62, 0) 50%,
          rgba(4, 34, 62, 0.1) 85%,
          rgba(4, 34, 62, 0.25) 100%
        );
      }
    }
  }

  &:last-of-type {
    margin-bottom: 0;
  }

  &.-left {
    transform: translateX(-60%) translateY(100px);

    @include below('md') {
      transform: translateY(30px);
      align-self: flex-end;
      justify-content: flex-end;
    }

    .work-img-wrapper {
      padding-left: 50px;

      @include below('lg') {
        padding-left: 20px;
      }

      &:before {
        left: 50px;

        @include below('lg') {
          left: 20px;
        }

        @include below('md') {
          background: linear-gradient(
            90deg,
            rgba($blue2, 0.3) 0%,
            rgba($blue2, 0.15) 15%,
            rgba($blue2, 0) 50%
          );
        }
      }
    }

    .work-overlay {
      padding-left: 70px;

      @include below('lg') {
        padding-left: 40px;
      }

      @include below('md') {
        padding-left: 0;
        left: 0;
        transform: translateX(calc(-100% + 40px));
      }

      .work-content {
        @include below('md') {
          text-align: right;
        }
      }
    }
  }

  &.-right {
    transform: translateX(60%) translateY(100px);

    @include below('md') {
      transform: translateY(30px);
    }

    .work-img-wrapper {
      padding-right: 50px;

      @include below('lg') {
        padding-right: 20px;
      }

      &:before {
        right: 50px;

        @include below('lg') {
          right: 20px;
        }

        @include below('md') {
          background: linear-gradient(
            90deg,
            rgba($blue2, 0) 50%,
            rgba($blue2, 0.15) 85%,
            rgba($blue2, 0.3) 100%
          );
        }
      }
    }

    .work-overlay {
      padding-right: 70px;

      @include below('lg') {
        padding-right: 40px;
      }

      @include below('md') {
        padding-right: 0;
        right: 0;
        transform: translateX(calc(100% - 40px));
      }
    }
  }

  .work-img-wrapper {
    position: relative;
    padding-bottom: 50px;

    @include below('lg') {
      padding-bottom: 20px;
    }

    &:before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 50px;
      left: 0;
      right: 0;
      background: linear-gradient(
        180deg,
        rgba($blue2, 0.25) 0%,
        rgba($blue2, 0.9) 100%
      );
      opacity: 0;
      transition: opacity 0.3s ease-out;

      @include below('lg') {
        bottom: 20px;
      }

      @include below('md') {
        opacity: 1;
        transition: none;
      }
    }

    .ui-frame {
      .ui-corner {
        .corner-horizontal {
          @include below('lg') {
            width: 30px;
            top: 5px;
          }
        }

        .corner-vertical {
          @include below('lg') {
            height: 30px;
            left: 5px;
          }
        }
      }
    }
  }

  .work-overlay {
    display: flex;
    justify-content: space-between;
    position: absolute;
    bottom: 50px;
    padding: 20px;
    opacity: 0;
    transition: opacity 0.3s ease-out;
    z-index: 2;
    // width: 70%;

    @include below('lg') {
      bottom: 20px;
    }

    @include below('md') {
      width: 55%;
      justify-content: start;
      flex-direction: column;
      top: 20px;
      bottom: auto;
      padding: 0;
      opacity: 1;
      transition: none;
    }

    .work-content {
      .work-category {
        display: none;

        @include below('md') {
          display: block;
          margin-bottom: 10px;
          text-transform: uppercase;
        }
      }

      .work-date {
        margin-bottom: 10px;
        text-transform: uppercase;

        @include below('sm') {
          display: none;
        }
      }

      .work-desc {
        hyphens: auto;
        /* overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        line-clamp: 3;
        -webkit-box-orient: vertical; */
      }
    }

    .work-cta {
      width: 28%;
      align-self: flex-end;

      @include below('md') {
        width: 100%;
        align-self: flex-start;
      }
    }
  }
}
</style>
