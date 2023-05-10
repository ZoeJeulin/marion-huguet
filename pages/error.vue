<template>
  <div class="error">
    <div class="error-content">
      <img src="~/assets/img/bird1.png" alt="bird" class="error-bird" />
      <h1 class="t-h1 error-title">{{ global.errorTitle }}</h1>
      <div class="t-body-1 error-subtitle">{{ global.errorSubtitle }}</div>
      <ui-link class="error-link" :label="global.errorLabel" path="home" />
    </div>

    <!-- <nuxt-picture
      :src="global.bgImg.url"
      :alt="global.bgImg.alt"
      class="error-img"
      loading="lazy"
      provider="imgix"
      :modifiers="{ auto: 'format,compress' }"
    /> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  layout: 'error',
  head() {
    return {
      title: 'Page introuvable | Marion Huguet',
    }
  },
  computed: {
    ...mapState({
      global: (state) => state.global,
    }),
  },
}
</script>

<style lang="scss">
.error {
  //height: 100vh;
  position: relative;
  padding: 100px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @include below('md') {
    padding: 60px 0;
    //height: 90vh;
  }

  .error-content {
    text-align: center;
    @keyframes showText {
      0% {
        opacity: 0;
        transform: translateY(60px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @include below('sm') {
      @keyframes showText {
        0% {
          opacity: 0;
          transform: translateY(30px);
        }
        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }
    }

    .error-bird {
      display: none;

      @include below('sm') {
        display: block;
        width: 20%;
        margin: 0 auto 60px;
        opacity: 0;
        animation: showText 0.5s 0.4s ease-out forwards;
      }
    }

    .error-title {
      @include fluid-type($xs, $xl, 60px, 200px);
      opacity: 0;
      animation: showText 0.5s 0.5s ease-out forwards;
    }

    .error-subtitle {
      opacity: 0;
      animation: showText 0.5s 0.6s ease-out forwards;
    }

    .error-link {
      margin: 60px auto 0 auto;
      opacity: 0;
      animation: showText 0.5s 0.7s ease-out forwards;

      @include below('sm') {
        margin: 40px auto 0 auto;
      }
    }
  }

  /* .error-img {
    position: absolute;
    top: 0;
    right: 0;
    height: 100vh;

    @include below('md') {
      display: none;
    }

    img {
      height: 100%;
      object-fit: cover;
    }
  } */
}
</style>
