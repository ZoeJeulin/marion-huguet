<template>
  <div class="home-shop">
    <h1 class="shop-title t-h2">
      <ui-icon name="etoile" class="star" />
      <span>Boutique</span>
      <ui-icon name="etoile" class="star" />
    </h1>
    <div class="shop-desc t-body-1">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo amet
      doloribus cum deserunt dolorem alias totam voluptatibus nisi eos
      quibusdam, ab magni saepe laudantium aperiam impedit sed consequatur eum
      quis.
    </div>
    <div class="shop-images">
      <img
        v-for="i in 3"
        :key="i"
        src="https://source.unsplash.com/random"
        alt="categroy image"
      />
    </div>
    <ui-link label="Découvrir" />
    <ui-frame :desktop-corners="[2, 3]" :mobile-corners="[1, 2, 3, 4]" />
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.home-shop {
  position: relative;
  padding: 40px;
  text-align: center;

  @include below('sm') {
    padding: 40px 10px;
  }

  .shop-title {
    margin-bottom: 20px;

    span:not(.star) {
      padding: 0 80px;

      @include below('sm') {
        padding: 0;
      }
    }

    .star {
      vertical-align: middle;

      @include below('sm') {
        display: none;
      }
    }
  }

  .shop-desc {
    margin-bottom: 80px;

    @include below('sm') {
      margin-bottom: 40px;
    }
  }

  .shop-images {
    display: flex;
    justify-content: space-between;
    margin-bottom: 80px;

    @include below('sm') {
      margin-bottom: 40px;
    }

    img {
      width: 20%;

      @include below('sm') {
        width: 30%;
      }
    }
  }
}
</style>
