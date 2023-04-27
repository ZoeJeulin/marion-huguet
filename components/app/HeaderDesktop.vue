<template>
  <div class="header-desktop">
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
}
</script>

<style lang="scss">
.header-desktop {
  background: $blue1;
  box-shadow: 0 20px 30px rgba($color: $blue2, $alpha: 0.3);
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid $beige;
  padding: 30px 40px;
  height: 90px;
  position: fixed;
  top: -90px;
  width: 100%;
  z-index: 15;

  @include below('md') {
    display: none;
  }

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

      @include below('md') {
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
</style>
