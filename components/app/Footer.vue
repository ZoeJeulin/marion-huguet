<template>
  <footer class="footer">
    <div class="footer-top">
      <div class="footer-typo-wrapper">
        <ui-icon name="typo" />
        <ui-icon class="whale" name="whale" />
      </div>
      <div class="footer-content-wrapper">
        <div class="footer-links">
          <ul class="links-list">
            <li
              v-for="(link, id) in global.navLinks"
              :key="id"
              class="link-item"
            >
              <nuxt-link
                :to="localePath({ name: link.slug ? link.slug : 'home' })"
                class="t-cta-2"
              >
                {{ link.pageTitle }}
              </nuxt-link>
            </li>
          </ul>
        </div>
        <div class="footer-insta">
          <a :href="global.instagramLink">{{ global.instagramLabel }}</a>
        </div>
        <div class="footer-donation">
          <a class="t-cta-2 link-donation" :href="global.donationsLink">{{
            global.donationsLabel
          }}</a>
        </div>
      </div>
    </div>
    <div class="footer-bottom t-body-3">
      <div class="footer-credits">
        <div>{{ global.copyright }}</div>
        <a :href="global.creditLink">{{ global.creditLabel }}</a>
      </div>
      <ui-btn-scroll />
    </div>
  </footer>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      global: (state) => state.global,
    }),
  },
}
</script>

<style lang="scss">
footer {
  position: relative;
  z-index: 5;
  opacity: 0;
  transform: translateY(30px);
  animation: showFooter 0.5s 3s ease-out forwards;

  @keyframes showFooter {
    0% {
      opacity: 0;
      transform: translateY(30px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .footer-top {
    background: $blue2;
    padding: 30px 50px;
    display: flex;
    justify-content: space-between;

    @include below('md') {
      padding: 20px;
    }

    .footer-typo-wrapper {
      width: 30%;
      height: fit-content;
      align-self: center;

      @include below('md') {
        order: 2;
      }

      .whale {
        display: none;

        @include below('md') {
          display: block;
        }
      }
    }

    .footer-content-wrapper {
      display: flex;
      justify-content: space-between;
      width: 60%;

      @include below('md') {
        flex-direction: column;
        order: 1;
      }

      .footer-links {
        height: fit-content;
        align-self: center;

        @include below('md') {
          align-self: flex-start;
        }

        .links-list {
          .link-item {
            width: fit-content;
            display: block;

            &:not(:last-child) {
              margin-bottom: 20px;

              @include below('md') {
                margin-bottom: 15px;
              }
            }
          }
        }
      }

      .footer-insta {
        align-self: center;

        @include below('md') {
          display: none;
        }
      }

      .footer-donation {
        align-self: center;

        @include below('md') {
          align-self: flex-start;
          margin-top: 15px;
        }
      }

      .link-item,
      .link-donation {
        position: relative;
        display: inline-block;
        transform: translateX(0);
        transition: transform 0.15s ease-out;

        &:hover {
          transform: translateX(10px);
          transition: transform 0.15s ease-out;

          &::before {
            transform: scaleX(1);
            transition: transform 0.15s ease-out;

            @include below('md') {
              transform: scaleX(0);
            }
          }

          &::after {
            opacity: 1;
            transition: opacity 0.15s 0.15s ease-out;

            @include below('md') {
              opacity: 0;
            }
          }
        }

        &::before {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          right: -30px;
          margin: auto;
          height: 1px;
          background: $beige;
          width: 20px;
          z-index: 1;
          transform: scaleX(0);
          transform-origin: center left;
          transition: transform 0.15s 0.15s ease-out;

          @include below('md') {
            display: none;
          }
        }

        // arrow
        &::after {
          content: '';
          position: absolute;
          width: 6px;
          height: 6px;
          top: 10%;
          bottom: 10%;
          right: -30px;
          margin: auto;
          display: inline-block;
          padding: 3px;
          border: solid $beige;
          border-width: 0 1px 1px 0;
          transform: rotate(-45deg);
          opacity: 0;

          transition: opacity 0.15s ease-out;

          @include below('md') {
            display: none;
          }
        }
      }
    }
  }

  .footer-bottom {
    background: $blue3;
    display: flex;
    justify-content: space-between;
    padding: 10px 50px;

    @include below('md') {
      padding: 10px 20px;
    }

    .footer-credits {
      display: flex;
      justify-content: space-between;
      width: 100%;

      @include below('md') {
        width: auto;
        flex-direction: column;
      }

      a {
        @include below('md') {
          margin-top: 10px;
        }
      }
    }

    .ui-btn-scroll {
      display: none;

      @include below('md') {
        display: block;
      }
    }
  }
}
</style>
