<template>
  <div class="infos-contact">
    <nuxt-picture
      :src="global.bgImg.url"
      :alt="global.bgImg.alt"
      class="whale"
    />
    <section-infos
      :infos-title="page.infosTitle"
      :infos-text="page.infosText"
    />
    <section-contact
      :contact-title="page.contactTitle"
      :contact-text="page.contactText"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import PageInfosContactQuery from '~/assets/graphql/pages/infosContact.graphql'

export default {
  name: 'InfosContact',
  nuxtI18n: {
    paths: {
      fr: '/infos-contact',
      en: '/infos-contact',
    },
  },
  async asyncData(context) {
    const { page } = await context.$query(
      context.app.$axios,
      PageInfosContactQuery,
      {
        locale: context.app.i18n.locale,
      }
    )

    return { page }
  },
  computed: {
    ...mapState({
      global: (state) => state.global,
    }),
  },
}
</script>

<style lang="scss">
.infos-contact {
  position: relative;
  padding: 80px 40px;

  @include below('sm') {
    padding: 40px 20px;
  }

  .whale {
    position: absolute;
    top: 0;
    right: -50%;
  }
}
</style>
