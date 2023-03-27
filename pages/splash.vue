<template>
  <div class="splash">
    <ui-icon class="typo" name="typo" />
    <ui-icon class="whale" name="whale" />
    <ui-link class="link" label="Plonger dans mon univers" path="home" />
  </div>
</template>

<script>
export default {
  nuxtI18n: {
    paths: {
      fr: '/',
      en: '/',
    },
  },
  layout: 'splash',
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

  @include below('sm') {
    padding: 20px;
  }

  .typo,
  .whale {
    width: 300px;
    margin: 0 auto 20px;

    @include below('sm') {
      width: 200px;
    }
  }

  .link {
    margin-top: 60px;

    @include below('sm') {
      width: 80%;
    }
  }
}
</style>
