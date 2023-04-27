<template>
  <div class="header-mobile">
    <div class="header-nav">
      <nuxt-link class="link-logo" :to="localePath({ name: 'home' })"
        ><ui-icon class="typo" name="typo"
      /></nuxt-link>
      <ui-burger-menu @click.native="toggleMenu" />
    </div>
    <div class="header-panel">
      <ul class="nav-list">
        <li v-for="(link, id) in global.navLinks" :key="id" class="nav-item">
          <nuxt-link
            :to="localePath({ name: link.slug ? link.slug : 'home' })"
            class="t-cta-1"
            @click.native="toggleMenu"
          >
            {{ link.pageTitle }}
          </nuxt-link>
        </li>
        <li class="nav-item">
          <a
            :href="global.donationsLink"
            target="_blank"
            class="t-cta-1"
            @click="toggleMenu"
            >{{ global.donationsLabel }}</a
          >
        </li>
      </ul>
      <ui-icon class="whale" name="whale" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      global: (state) => state.global,
    }),
  },
  methods: {
    toggleMenu() {
      this.$el.querySelector('.ui-burger-menu').classList.toggle('-open')
      this.$el.querySelector('.header-panel').classList.toggle('-show')
      if (document.body.style.overflow === 'hidden') {
        document.body.style.overflow = ''
      } else if (document.body.style.overflow === '') {
        document.body.style.overflow = 'hidden'
      }
    },
  },
}
</script>

<style lang="scss">
.header-mobile {
  display: none;
  position: relative;
  z-index: 5;

  @include below('sm') {
    display: block;
  }

  .header-nav {
    position: fixed;
    top: -60px;
    background: $blue1;
    box-shadow: 0 20px 30px rgba($color: $blue2, $alpha: 0.3);
    height: 60px;
    padding: 10px 20px;
    border-bottom: 1px solid $beige;
    display: flex;
    justify-content: space-between;
    width: 100%;

    .link-logo {
      width: fit-content;

      .typo {
        height: 100%;

        svg {
          width: auto;
        }
      }
    }

    .ui-burger-menu {
      &.-open {
        svg {
          .line-top {
            transform: translateX(2px) rotate(44deg);
            transition: transform 0.3s ease-out;
          }
          .line-middle {
            opacity: 0;
            transition: opacity 0.2s ease-out;
          }
          .line-bottom {
            transform: translateX(2px) rotate(-44deg);
            transition: transform 0.3s ease-out;
          }
        }
      }

      svg {
        .line-top {
          transform-box: fill-box;
          transform: translateX(0) rotate(0deg);
          transition: transform 0.3s ease-out;
        }
        .line-middle {
          opacity: 1;
          transition: opacity 0.2s ease-in;
        }
        .line-bottom {
          transform-box: fill-box;
          transform: translateX(0) rotate(0deg);
          transition: transform 0.3s ease-out;
        }
      }
    }
  }

  .header-panel {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: $blue1;
    padding: 40px 20px 60px;
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    height: calc(100vh - 60px);
    transform: translateX(100%);

    transition: transform 0.3s ease-out;

    &.-show {
      transform: translateX(0);
    }

    .nav-list {
      width: 100%;

      .nav-item {
        display: block;
        width: fit-content;

        + .nav-item {
          margin-top: 30px;
        }
      }
    }

    .ui-icon {
      align-self: center;
      width: 60%;
      padding-bottom: 100px;
    }
  }
}
</style>
