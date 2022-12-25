<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <app-header />
    <div id="main">
      <nuxt />
    </div>
    <app-footer />
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
html {
  width: 100%;
  min-height: 100vh;
  height: -webkit-fill-available;
}

body {
  position: relative;
  min-height: 100vh;
  min-height: -webkit-fill-available;
  -webkit-overflow-scrolling: touch;
  overflow-y: scroll;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: Inter, Arial, sans-serif;
  background: $blue1;

  #main {
    padding: 40px;

    @include below('sm') {
      padding: 40px 20px;
    }
  }
}
</style>
