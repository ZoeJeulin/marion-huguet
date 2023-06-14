<template>
  <div class="splash">
    <ui-icon class="typo" name="typo" />
    <ui-icon class="logo" name="logo" />
    <ui-link v-if="isMobile" class="link" label="Découvrir" path="home" />
    <ui-link v-else class="link" label="Découvrir" path="home" />
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
  justify-content: center;
  position: absolute;
  margin: 20px;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  .typo,
  .logo {
    width: 300px;
    margin: 20px auto;

    @include below('md') {
      width: 200px;
    }
  }

  .link {
    margin: 20px auto;
  }
}
</style>
