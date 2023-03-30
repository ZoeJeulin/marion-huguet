<template>
  <header v-if="!isMobile" class="header -desktop">
    <ul class="nav-list">
      <li v-for="(link, id) in global.navLinks" :key="id" class="nav-item">
        <ui-icon name="etoile" class="star" />
        <nuxt-link
          :to="localePath({ name: link.slug ? link.slug : 'home' })"
          class="t-cta-1"
        >
          {{ link.pageTitle }}
        </nuxt-link>
      </li>
    </ul>
    <div class="nav-item -right">
      <ui-icon name="etoile" class="star" />
      <a :href="global.donationsLink" target="_blank" class="t-cta-1">{{
        global.donationsLabel
      }}</a>
    </div>
  </header>
  <header v-else class="header -mobile">
    <div class="header-nav">
      <ui-icon class="typo" name="typo" />
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
      <img
        src="~/assets/img/bird1.png"
        alt="Pictogramme d'oiseau"
        class="bird"
      />
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      isMobile: false,
    }
  },
  computed: {
    ...mapState({
      global: (state) => state.global,
    }),
  },
  mounted() {
    this.isMobile = window.innerWidth <= 640
  },

  methods: {
    toggleMenu() {
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
.header {
  &.-desktop {
    background: $blue1;
    box-shadow: 0 20px 30px rgba($color: $blue2, $alpha: 0.3);
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid $beige;
    padding: 30px 40px;
    height: 90px;
    position: fixed;
    width: 100%;
    z-index: 15;

    .nav-item {
      display: inline;
      flex-direction: column;
      position: relative;

      &:hover {
        &::before {
          transform: scaleX(1);
        }

        .star {
          opacity: 1;
          transform: rotate(-45deg);
        }
      }

      + .nav-item {
        margin-left: 60px;
      }

      &::before {
        content: '';
        position: absolute;
        bottom: -6px;
        height: 1px;
        background: $beige;
        width: calc(100% - 5px);
        z-index: 1;
        transform: scaleX(0);
        transform-origin: center left;
        transition: transform 0.3s ease-out;

        @include below('sm') {
          width: 50px;
        }
      }

      .star {
        position: absolute;
        left: 0;
        right: 0;
        margin: auto;
        top: -25px;
        width: 15px;
        min-width: 15px;
        opacity: 0;
        transform: rotate(0deg);
        transition: opacity 0.1s ease-out, transform 0.3s ease-out;
      }

      &.-right {
        &::before {
          width: 100%;
        }

        .star {
          top: -15px;
        }
      }
    }
  }

  &.-mobile {
    position: relative;
    z-index: 5;

    .header-nav {
      position: fixed;
      top: 0;
      background: $blue1;
      box-shadow: 0 20px 30px rgba($color: $blue2, $alpha: 0.3);
      height: 60px;
      padding: 10px 20px;
      border-bottom: 1px solid $beige;
      display: flex;
      justify-content: space-between;
      width: 100%;

      .typo {
        width: 30%;
      }
    }

    .header-panel {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: $blue1;
      padding: 40px 20px 80px;
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
        width: 30%;
      }
    }
  }
}
</style>
