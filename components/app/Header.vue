<template>
  <header>{{ global }}</header>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      global: (state) => state.global,
    }),
  },
}
</script>

<style lang="scss"></style>
