<template>
  <div class="home-support">
    <div class="support-insta">
      <!-- <ul>
        <li v-for="post in section.feedInstagram" :key="`post-${post.id}`">
          <a :href="post.permalink">
            <nuxt-picture :src="`${post.permalink}media/?size=l`" :alt="post.caption" />
          </a>
        </li>
      </ul> -->
      <nuxt-picture
        src="https://source.unsplash.com/random"
        alt="feed insta"
        class="support-feed"
      />
      <ui-link label="En voir plus" />
    </div>
    <div class="support-wrapper">
      <ui-icon name="etoile" class="star -desktop" />
      <div class="support-content">
        <h2 class="support-title t-h2">{{ section.title }}</h2>
        <div class="support-desc t-body-1">
          {{ section.description }}
        </div>
        <ui-link :label="section.btnLabel" />
      </div>

      <ui-icon name="etoile" class="star -desktop" />
    </div>
    <ui-icon name="bird" class="support-bird" />
    <ui-icon name="bird" class="support-bird" />

    <ui-icon name="etoile" class="star -mobile" />
    <ui-frame :desktop-corners="[2, 3]" :mobile-corners="[1, 2, 3, 4]" />
  </div>
</template>

<script>
export default {
  props: {
    index: {
      type: Number,
      default: 1,
    },
    section: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style lang="scss">
.home-support {
  position: relative;
  padding: 40px;
  display: flex;
  justify-content: space-between;
  min-height: calc(100vh - 30px);

  @include below('sm') {
    padding: 60px 10px;
    flex-direction: column;
    justify-content: center;
  }

  .support-insta {
    width: 30%;
    align-self: center;

    @include below('sm') {
      margin-top: 40px;
      width: 100%;
      order: 2;
    }

    .support-feed {
      margin-bottom: 80px;

      @include below('sm') {
        margin-bottom: 40px;
      }
    }
  }

  .support-wrapper {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @include below('sm') {
      width: 100%;
      order: 1;
    }

    .support-content {
      padding: 100px 0;

      @include below('sm') {
        padding: 0;
      }

      .support-title {
        margin-bottom: 20px;
      }

      .support-desc {
        margin-bottom: 80px;

        @include below('sm') {
          margin-bottom: 40px;
        }
      }
    }
  }

  .support-bird {
    position: absolute;
    width: 6%;

    @include below('sm') {
      display: none;
    }

    &:nth-of-type(1) {
      right: 6%;
      top: 15%;
      transform: rotate(180deg);
    }

    &:nth-of-type(2) {
      right: 10%;
      top: 30%;
      transform: rotate(290deg);
    }
  }

  .star {
    margin: auto;

    &.-desktop {
      display: block;
      @include below('sm') {
        display: none;
      }
    }

    &.-mobile {
      display: none;

      @include below('sm') {
        display: block;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
      }
    }
  }
}
</style>
