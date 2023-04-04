<template>
  <div class="ui-corner" :class="`corner-${position}`">
    <span class="corner-horizontal"></span>
    <span class="corner-vertical"></span>
  </div>
</template>

<script>
export default {
  props: {
    position: {
      type: Number,
      default: 0,
    },
  },
}
</script>

<style lang="scss">
.ui-corner {
  position: relative;

  .corner-horizontal,
  .corner-vertical {
    background: $beige;
    position: absolute;
  }

  .corner-horizontal {
    height: 1px;
    width: 75px;
    top: 10px;

    @include below('sm') {
      width: 30px;
      top: 5px;
    }
  }

  .corner-vertical {
    height: 75px;
    width: 1px;
    left: 10px;

    @include below('sm') {
      height: 30px;
      left: 5px;
    }
  }

  &.corner-1 {
    .corner-horizontal {
      transform-origin: center left;
    }
    .corner-vertical {
      transform-origin: bottom center;
    }
  }

  &.corner-2 {
    .corner-horizontal {
      transform-origin: center left;
    }
    .corner-vertical {
      transform-origin: bottom center;
    }
  }

  &.corner-3 {
    .corner-horizontal {
      transform-origin: center left;
    }
    .corner-vertical {
      transform-origin: bottom center;
    }
  }

  &.corner-4 {
    .corner-horizontal {
      transform-origin: center left;
    }
    .corner-vertical {
      transform-origin: bottom center;
    }
  }
}
</style>
