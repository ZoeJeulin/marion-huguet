<template>
  <div class="ui-frame">
    <ui-corner
      v-for="index in 4"
      :key="index"
      :position="index"
      class="frame-corner"
      :class="{
        '-desktop': displayDesktopCorner(index),
        '-mobile': displayMobileCorner(index),
      }"
    />
  </div>
</template>

<script>
export default {
  props: {
    desktopCorners: {
      type: Array,
      default: () => [],
    },
    mobileCorners: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    displayDesktopCorner(index) {
      return this.desktopCorners.includes(index)
    },
    displayMobileCorner(index) {
      return this.mobileCorners.includes(index)
    },
  },
}
</script>

<style lang="scss">
.ui-frame {
  .frame-corner {
    display: none;
    position: absolute;

    &.-desktop {
      display: block;

      @include below('sm') {
        display: none;
      }
    }

    &.-mobile {
      @include below('sm') {
        display: block;
      }
    }

    &:nth-child(1) {
      top: 0;
      left: 0;

      @include below('sm') {
        top: -20px;
      }
    }

    &:nth-child(2) {
      top: 0;
      right: 0;
      transform: rotate(90deg);

      @include below('sm') {
        top: -20px;
      }
    }

    &:nth-child(3) {
      bottom: 0;
      right: 0;
      transform: rotate(180deg);
    }

    &:nth-child(4) {
      bottom: 0;
      left: 0;
      transform: rotate(-90deg);
    }
  }
}
</style>
