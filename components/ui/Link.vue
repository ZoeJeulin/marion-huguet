<template>
  <div class="ui-link">
    <p class="t-cta-1">
      {{ label }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: null,
    },
  },
}
</script>

<style lang="scss">
.ui-link {
  position: relative;
  width: -webkit-fill-available;
  text-align: center;

  p {
    position: relative;
    display: inline;
    padding: 0 20px;
    background: $blue1;
    z-index: 2;

    @include below('sm') {
      padding: 0 10px;
    }
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    height: 1px;
    background: $beige;
    width: 100%;
    top: 0;
    bottom: 0;
    margin: auto;
    z-index: 1;
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }
}
</style>
