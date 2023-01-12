<template>
  <footer>
    <div class="footer-top">
      <div>
        <ui-icon name="typo" />
      </div>
      <div class="footer-links">
        <ul>
          <li class="t-cta-2">Accueil</li>
          <li class="t-cta-2">Portfolio</li>
          <li class="t-cta-2">Infos & Contact</li>
          <li class="t-cta-2">Boutique</li>
        </ul>
      </div>
      <div class="footer-insta">
        <a :href="global.instagramLink">{{ global.instagramLabel }}</a>
      </div>
      <div class="footer-donation">
        <a class="t-cta-2" :href="global.donationsLink">{{
          global.donationsLabel
        }}</a>
      </div>
    </div>
    <div class="footer-bottom t-body-3">
      <div class="footer-credits">
        <div>{{ global.copyright }}</div>
        <a :href="global.creditLink">{{ global.creditLabel }}</a>
      </div>
      <ui-btn-scroll />
    </div>
  </footer>
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
footer {
  position: relative;
  z-index: 5;

  .footer-top {
    background: $blue2;
    padding: 30px 40px;
    display: flex;
    justify-content: space-between;

    @include below('sm') {
      flex-direction: column;
      padding: 20px;
    }

    .footer-links {
      ul {
        li:not(:last-child) {
          margin-bottom: 20px;

          @include below('sm') {
            margin-bottom: 15px;
          }
        }
      }
    }

    .footer-insta {
      align-self: center;

      @include below('sm') {
        align-self: flex-start;
      }
    }

    .footer-donation {
      align-self: center;

      @include below('sm') {
        align-self: flex-start;
      }
    }
  }

  .footer-bottom {
    background: $blue3;
    display: flex;
    justify-content: space-between;
    padding: 10px 40px;

    @include below('sm') {
      padding: 10px 20px;
    }

    .footer-credits {
      display: flex;
      justify-content: space-between;
      width: 100%;

      @include below('sm') {
        width: auto;
        flex-direction: column;
      }

      a {
        @include below('sm') {
          margin-top: 10px;
        }
      }
    }

    .ui-btn-scroll {
      display: none;

      @include below('sm') {
        display: block;
      }
    }
  }
}
</style>
