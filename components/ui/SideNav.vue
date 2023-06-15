<template>
  <div class="ui-side-nav">
    <a
      v-for="section in sections"
      :key="section.id"
      :href="`#${section.title.toLowerCase().replace(/[\W_]+/g, '-')}`"
      :class="`nav-link -${section.title
        .toLowerCase()
        .replace(/[\W_]+/g, '-')}`"
      @mouseleave="disablePointerEvents"
    >
      <span class="nav-circle" @mouseenter="enablePointerEvents">
        <svg height="18" width="18">
          <circle cx="9" cy="9" r="8.5" stroke="white" stroke-width="1" />
        </svg>
      </span>

      <span class="nav-title t-body-2">{{ section.title }}</span>
    </a>
    <ui-btn-scroll />
  </div>
</template>

<script>
export default {
  props: {
    sections: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    enablePointerEvents(event) {
      event.target.parentElement.style.pointerEvents = 'auto'
    },
    disablePointerEvents(event) {
      event.target.style.pointerEvents = 'none'
    },
  },
}
</script>

<style lang="scss">
.ui-side-nav {
  position: absolute;
  top: 50vh;
  left: -10px;
  transform: translateY(-50%);
  z-index: 10;

  @include below('md') {
    display: none;
  }

  .nav-link {
    display: flex;
    align-items: center;
    pointer-events: none;

    &.-active {
      .nav-circle svg circle {
        fill: $white;
      }
    }

    .nav-circle {
      position: relative;
      pointer-events: auto;

      svg circle {
        fill: $blue1;

        transition: fill 0.2s ease-out;
      }

      &::after {
        content: '';
        position: absolute;
        bottom: -45px;
        left: 9px;
        width: 1px;
        height: 45px;
        background: $white;
      }
    }

    &:last-of-type .nav-circle::after {
      display: none;
    }

    .nav-title {
      padding: 5px 10px;
      border: 1px solid $white;
      border-radius: 9999px;
      text-transform: uppercase;
      margin-left: 10px;
      opacity: 0;
      pointer-events: none;
      box-shadow: 4px 4px 20px rgba($blue2, 0.5);
      background: $blue1;

      transition: opacity 0.2s ease-out, background 0.2s ease-out,
        color 0.2s ease-out;

      &:hover {
        background: $white;
        color: $blue1;
      }
    }

    + .nav-link {
      margin-top: 30px;
    }

    &:hover {
      svg circle {
        fill: $white;
      }

      .nav-title {
        opacity: 1;
        pointer-events: all;
      }
    }
  }
}
</style>
