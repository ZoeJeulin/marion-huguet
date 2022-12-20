<template>
  <span class="ui-icon" aria-hidden="true">
    <component :is="svg"></component>
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

  computed: {
    svg() {
      return () => import(`@/assets/svg/${this.name}.svg?inline`)
    },
  },
}
</script>

<style lang="scss">
.ui-icon {
  display: inline-block;

  &.star {
    width: 30px;
  }

  svg {
    display: block;
    height: 100%;
    width: 100%;
  }
}
</style>
