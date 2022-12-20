<template>
  <div class="section-intro">
    <div class="intro-content">
      <h1 class="t-h1">Marion Huguet</h1>
      <div class="t-body-1">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sed velit
        id dui pharetra aliquet. In id massa ut velit vehicula egestas ac sit
        amet libero. Vivamus volutpat libero eget interdum efficitur. Nam eget
        hendrerit neque. In tristique lacus id lacinia volutpat. Donec vel
        dictum magna, vitae elementum risus. Fusce consequat dolor id arcu
        rutrum, id maximus ante ullamcorper. Nulla tincidunt dapibus orci, ac
        pretium quam vehicula non.
      </div>
    </div>
    <ui-frame :desktop-corners="[1, 3, 4]" :mobile-corners="[2, 3]" />
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.section-intro {
  width: 100%;
  position: relative;

  .intro-content {
    width: 70%;
  }
}
</style>
