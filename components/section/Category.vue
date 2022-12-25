<template>
  <div class="home-category">
    <div class="category-img">
      <img src="https://source.unsplash.com/random" alt="categroy image" />
    </div>
    <div class="category-wrapper">
      <ui-icon name="etoile" class="star" />
      <div class="category-content">
        <h2 class="category-title t-h2">Noir & Blanc</h2>
        <div class="category-desc t-body-1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
          perferendis maxime illo ea explicabo. Commodi temporibus voluptatibus
          quibusdam laudantium iusto facere, nam ea iure numquam. Enim itaque
          expedita sint consequatur!
        </div>
        <ui-link label="Découvrir" />
      </div>

      <ui-icon name="etoile" class="star" />
    </div>
    <ui-frame :desktop-corners="[2, 3]" :mobile-corners="[1, 2, 3, 4]" />
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.home-category {
  position: relative;
  padding: 40px;
  display: flex;
  justify-content: space-between;

  @include below('sm') {
    flex-direction: column;
    padding: 0 10px;
  }

  .category-img {
    width: 30%;
    align-self: center;

    @include below('sm') {
      width: 50%;
    }
  }

  .category-wrapper {
    width: 50%;

    @include below('sm') {
      width: 100%;
    }

    .category-content {
      padding: 100px 0;

      .category-title {
        margin-bottom: 20px;
      }

      .category-desc {
        margin-bottom: 40px;
      }
    }

    .star {
      display: block;
      margin: auto;
    }
  }
}
</style>
