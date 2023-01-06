<template>
  <div class="home-support">
    <div class="support-insta">
      <ul>
        <!-- <li v-for="post in section.feedInstagram" :key="`post-${post.id}`">
          <a :href="post.permalink">
            <img :src="`${post.permalink}media/?size=l`" :alt="post.caption" />
          </a>
        </li> -->
      </ul>
      <img src="https://source.unsplash.com/random" alt="feed insta" />
      <ui-link label="En voir plus" />
    </div>
    <div class="support-wrapper">
      <ui-icon name="etoile" class="star" />
      <div class="support-content">
        <h2 class="support-title t-h2">{{ section.title }}</h2>
        <div class="support-desc t-body-1">
          {{ section.description }}
        </div>
        <ui-link :label="section.btnLabel" />
      </div>

      <ui-icon name="etoile" class="star" />
    </div>
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

  @include below('sm') {
    flex-direction: column;
    padding: 0 10px;
  }

  .support-insta {
    width: 30%;
    align-self: center;

    @include below('sm') {
      width: 50%;
    }
  }

  .support-wrapper {
    width: 50%;

    @include below('sm') {
      width: 100%;
    }

    .support-content {
      padding: 100px 0;

      .support-title {
        margin-bottom: 20px;
      }

      .support-desc {
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
