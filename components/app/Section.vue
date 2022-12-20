<template>
  <section class="section">
    <ui-corner
      v-for="(corner, index) in corners"
      :key="`corner-${index}`"
      :position="corner"
    />
  </section>
</template>

<script>
export default {
  props: {
    corners: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="scss">
.section {
  position: relative;
  height: 100vh;
}
</style>
