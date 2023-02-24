<template>
  <section class="section-infos">
    <h1 class="infos-title t-h2">
      <ui-icon name="etoile" class="star" />
      {{ infosTitle }}
      <ui-icon name="etoile" class="star" />
    </h1>
    <div class="infos-text t-body-1">{{ infosText }}</div>
    <ui-frame :desktop-corners="[2, 3]" />
  </section>
</template>

<script>
export default {
  props: {
    infosTitle: {
      type: String,
      required: true,
    },
    infosText: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss">
.section-infos {
  position: relative;
  display: flex;
  width: 60%;

  @include below('sm') {
    display: block;
    width: 100%;
  }

  .infos-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    writing-mode: vertical-lr;
    -webkit-writing-mode: vertical-lr;
    transform: rotate(180deg);
    text-align: center;
    margin: 40px 0;

    @include below('sm') {
      writing-mode: horizontal-tb;
      -webkit-writing-mode: horizontal-tb;
      transform: none;
      text-align: left;
      margin: 0 0 10px 0;
    }

    .star {
      &:first-of-type {
        margin-bottom: 40px;
        @include below('sm') {
          display: none;
        }
      }
      &:last-of-type {
        margin-top: 40px;
        @include below('sm') {
          margin-top: 0;
          margin-left: 20px;
        }
      }
    }
  }

  .infos-text {
    padding-left: 60px;
    margin: 60px 60px 60px 0;

    @include below('sm') {
      padding-left: 0;
      margin: 0;
    }
  }
}
</style>
