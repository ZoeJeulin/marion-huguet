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

  .infos-title {
    writing-mode: vertical-lr;
    -webkit-writing-mode: vertical-lr;
    transform: rotate(180deg);
  }

  .infos-text {
    padding-left: 60px;
  }
}
</style>
