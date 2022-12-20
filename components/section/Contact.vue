<template>
  <section class="section-contact">
    <h1 class="t-h2">{{ contactTitle }}</h1>
    <div>{{ contactText }}</div>
  </section>
</template>

<script>
export default {
  props: {
    contactTitle: {
      type: String,
      required: true,
    },
    contactText: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss"></style>
