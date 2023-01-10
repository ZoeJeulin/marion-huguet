<template>
  <div class="section-intro">
    <div class="intro-content">
      <h1 class="intro-title t-h1">Marion Huguet</h1>
      <div class="intro-desc t-body-1">
        {{ introText }}
      </div>
    </div>
    <ui-frame :desktop-corners="[1, 2, 3, 4]" />
  </div>
</template>

<script>
export default {
  props: {
    introText: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss">
.section-intro {
  width: 100%;
  position: relative;
  padding: 40px;

  @include below('sm') {
    padding: 0;
  }

  .intro-content {
    width: 70%;

    @include below('sm') {
      width: 100%;
    }

    .intro-title {
      margin-bottom: 60px;

      @include below('sm') {
        margin-bottom: 20px;
      }
    }
  }
}
</style>
