<template>
  <div class="splash">
    <ui-icon class="typo" name="typo" />
    <ui-icon class="whale" name="whale" />
    <ui-link
      v-if="isMobile"
      class="link"
      label="Plonger dans</br>mon univers"
      path="home"
    />
    <ui-link v-else class="link" label="Plonger dans mon univers" path="home" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import head from '@/assets/js/head.js'

export default {
  nuxtI18n: {
    paths: {
      fr: '/',
      en: '/',
    },
  },
  layout: 'splash',
  data() {
    return {
      isMobile: false,
    }
  },
  head() {
    return head(this.globalSeo.seo.fallbackSeo)
  },
  computed: {
    ...mapState({
      globalSeo: (state) => state.seo,
    }),
  },
  mounted() {
    this.isMobile = window.innerWidth <= 768
    document.body.style.overflow = 'hidden'
  },
}
</script>

<style lang="scss">
.splash {
  display: flex;
  flex-direction: column;
  position: absolute;
  margin: auto;
  top: 50%;
  bottom: 0;
  left: 0;
  right: 0;
  transform-origin: 38% 50%;
  transform: translateY(-50%);

  .typo,
  .whale {
    width: 300px;
    margin: 0 auto 20px;

    @include below('md') {
      width: 200px;
    }
  }

  .link {
    margin-top: 60px;
  }
}
</style>
