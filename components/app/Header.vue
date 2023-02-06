<template>
  <header v-if="!isMobile" class="header -desktop">
    <ul>
      <nuxt-link
        v-for="(link, id) in global.navLinks"
        :key="id"
        :to="localePath({ name: link.slug ? link.slug : '/' })"
        class="t-cta-1 nav-item"
      >
        {{ link.pageTitle }}
      </nuxt-link>
    </ul>
    <a :href="global.donationsLink" target="_blank" class="t-cta-1">{{
      global.donationsLabel
    }}</a>
  </header>
  <header v-else class="header -mobile">
    <div class="header-nav">
      <ui-icon class="typo" name="typo" />
      <ui-burger-menu @click.native="toggleMenu" />
    </div>
    <div class="header-panel">
      <ul class="nav-list">
        <nuxt-link
          v-for="(link, id) in global.navLinks"
          :key="id"
          :to="localePath({ name: link.slug ? link.slug : '/' })"
          class="t-cta-1 nav-item"
          @click="toggleMenu"
        >
          {{ link.pageTitle }}
        </nuxt-link>
        <a
          :href="global.donationsLink"
          target="_blank"
          class="t-cta-1 nav-item"
          >{{ global.donationsLabel }}</a
        >
      </ul>
      <ui-icon name="bird" class="bird" />
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
    padding: 45px 40px;

    .nav-item + .nav-item {
      margin-left: 60px;
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
