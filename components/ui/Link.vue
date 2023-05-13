<template>
  <component
    :is="type"
    v-bind="getProps"
    :to="localePath({ name: path, hash: hash })"
    class="ui-link"
  >
    <span class="line-left"></span>
    <p class="t-cta-1" v-html="label"></p>
    <span class="line-right"></span>
    <span class="arrow"></span>
  </component>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'nuxt-link',
    },
    label: {
      type: String,
      default: '',
    },
    path: {
      type: String,
      default: '/',
    },
    hash: {
      type: String,
      default: '',
    },
  },
  computed: {
    getProps() {
      if (this.type == null) {
        return {
          to: this.localePath({ name: this.path, hash: this.hash }),
        }
      } else if (this.type === 'a') {
        return {
          href: this.path,
          target: '_blank',
        }
      }
      return null
    },
  },
}
</script>

<style lang="scss">
.ui-link {
  position: relative;
  width: fit-content;
  text-align: center;
  display: flex;
  align-items: center;
  margin: auto;

  &:hover {
    p {
      transform: translateX(-20px);
      transition: transform 0.3s ease-out;
    }
    .arrow {
      opacity: 1;
      transition: opacity 0.15s 0.25s ease-out;
    }
    .line-left {
      transform: translateX(-20px) scaleX(0);
      transition: transform 0.3s ease-out;
    }
    .line-right {
      transform: translateX(-20px) scaleX(0.5);
      transition: transform 0.3s ease-out;
    }
  }

  p {
    cursor: pointer;
    position: relative;
    display: inline-block;
    padding: 0 15px;
    z-index: 2;
    white-space: nowrap;
    transform: translateX(0);
    transition: transform 0.3s 0.05s ease-out;

    @include below('md') {
      padding: 0 10px;
      white-space: normal;
    }
  }

  .arrow {
    position: absolute;
    width: 8px;
    height: 8px;
    top: 10%;
    bottom: 10%;
    right: 70px;
    margin: auto;
    display: inline-block;
    padding: 4px;
    border: solid $beige;
    border-width: 0 1px 1px 0;
    transform: rotate(-45deg);
    opacity: 0;

    transition: opacity 0.15s ease-out;

    @include below('md') {
      right: 45px;
    }
  }

  .line-left,
  .line-right {
    height: 1px;
    background: $beige;
    width: 100px;
    z-index: 1;
    transform: translateX(0) scaleX(1);
    transition: transform 0.3s 0.05s ease-out;

    @include below('md') {
      width: 50px;
    }
  }

  .line-left {
    transform-origin: center right;
  }

  .line-right {
    transform-origin: center left;
  }
}
</style>
