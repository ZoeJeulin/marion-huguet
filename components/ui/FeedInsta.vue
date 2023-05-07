<template>
  <ul class="feed-insta">
    <li v-for="post in posts" :key="`post-${post.id}`" class="post">
      <a :href="post.permalink" class="post-link">
        <img
          :src="post.media_url"
          :alt="post.caption"
          class="post-img"
          loading="lazy"
        />
      </a>
    </li>
  </ul>
</template>

<script>
import { gsap } from 'gsap'

export default {
  props: {
    posts: {
      type: Array,
      default: () => [],
    },
  },
  mounted() {
    gsap.to('.post', {
      opacity: 1,
      duration: 0.5,
      ease: 'ease-out',
      stagger: 0.1,
      scrollTrigger: {
        trigger: this.$el,
        start: 'top 75%',
      },
    })
  },
}
</script>

<style lang="scss">
.feed-insta {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
  margin-bottom: 30px;

  @include below('md') {
    gap: 5px;
    margin-bottom: 20px;
  }

  .post {
    position: relative;
    box-sizing: border-box;
    opacity: 0;

    &::before {
      content: '';
      display: block;
      padding-top: 100%;
    }

    .post-link {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;

      .post-img {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>
