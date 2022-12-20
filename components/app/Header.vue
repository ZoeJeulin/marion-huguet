<template>
  <header class="header">
    <ul>
      <nuxt-link
        v-for="(link, id) in global.navLinks"
        :key="id"
        :to="localePath({ name: link.slug ? link.slug : '/' })"
        class="t-cta-1 nav-item"
      >
        {{ link.pageTitle }}
      </nuxt-link>
    </ul>
    <a :href="global.donationsLink" target="_blank" class="t-cta-1">{{
      global.donationsLabel
    }}</a>
  </header>
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

<style lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  padding: 45px 40px;
  border-bottom: 1px solid $beige;
  background: $blue1;

  .nav-item + .nav-item {
    margin-left: 60px;
  }
}
</style>
