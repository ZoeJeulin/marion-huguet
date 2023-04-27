<template>
  <span class="ui-icon" aria-hidden="true">
    <component :is="require(`@/assets/svg/${name}.svg?inline`)"></component>
  </span>
</template>

<script>
export default {
  name: 'UiIcon',
  props: {
    name: {
      type: String,
      required: true,
    },
  },

  /* computed: {
    svg() {
      return () => import(`@/assets/svg/${this.name}.svg?inline`)
    },
  }, */
}
</script>

<style lang="scss">
.ui-icon {
  display: inline-block;

  &.star {
    width: 30px;
    min-width: 30px;
    transform: rotate(0);

    transition: transform 0.3s ease-out;

    @include below('md') {
      pointer-events: none;
    }

    &:hover {
      &:nth-of-type(2n) {
        transform: rotate(-40deg);

        @include below('md') {
          pointer-events: none;
        }
      }

      &:nth-of-type(2n + 1) {
        transform: rotate(40deg);

        @include below('md') {
          pointer-events: none;
        }
      }
    }
  }

  svg {
    display: block;
    height: 100%;
    width: 100%;
  }
}
</style>
