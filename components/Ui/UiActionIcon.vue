<template>
  <button
    class="zeen-action-icon"
    :class="{
      'zeen-action-icon_middle': size === 'middle',
      'zeen-action-icon_big': size === 'big',
      [`zeen-action-icon_theme-${theme}`]: theme,
    }"
    :id="`zeen-action-icon-${componentId}`"
    v-on="$listeners"
    v-bind="$attrs"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'ZeenActionIcon',
  props: {
    size: {
      type: String,
      default: 'small',
      validator: (size) => ['small', 'middle', 'big'].includes(size),
    },
    theme: {
      type: String,
      default: 'default',
      validator: (theme) => ['default', 'dark'].includes(theme),
    },
    disabled: {
      type: Boolean,
      required: false,
    },
  },
  computed: {
    componentId() {
      return this._uid
    },
  },
}
</script>

<style lang="scss">
:root {
  /* Размеры */
  --action-icon-width: 10px;
  --action-icon-min-width-middle: 15px;
  --action-icon-min-width-large: 26px;

  /* Цвета */
  --action-icon-color: var(--main-color);
  --action-icon-hover-color: var(--main-hover-color);
  --action-icon-focus-color: var(--main-hover-color);
  --action-icon-active-color: var(--main-active-color);
  --action-icon-disable-color: var(--main-disable-text-color);

  --action-icon-dark-color: var(--gray-1);
  --action-icon-dark-hover-color: var(--gray-2);
  --action-icon-dark-focus-color: var(--gray-2);
  --action-icon-dark-active-color: var(--gray-1);
  --action-icon-dark-disable-color: var(--gray-1);
}
</style>

<style lang="scss" scoped>

.zeen-action-icon {
  --action-icon-color-real: var(--action-icon-color);
  background-color: transparent;
  padding: 0;
  outline: none;
  border: 0;
  display: inline-flex;
  cursor: pointer;
  color: var(--action-icon-color-real);

  &:hover {
    --action-icon-color-real: var(--action-icon-hover-color);
  }

  &:focus {
    --action-icon-color-real: var(--action-icon-focus-color);
  }

  &:active {
    --action-icon-color-real: var(--action-icon-active-color);
  }

  &:disabled {
    cursor: auto;
    --action-icon-color-real: var(--action-icon-disable-color);
  }

  &_theme-dark {
    --action-icon-color-real: var(--action-icon-dark-color);
    &:hover {
      --action-icon-color-real: var(--action-icon-dark-hover-color);
    }
    &:focus {
      --action-icon-color-real: var(--action-icon-dark-focus-color);
    }
    &:active {
      --action-icon-color-real: var(--action-icon-dark-active-color);
    }
    &:disabled {
      --action-icon-color-real: var(--action-icon-dark-disable-color);
    }
  }

  svg {
    width: var(--action-icon-width);
    height: auto;
    fill: currentColor;
  }

  &_middle {
    svg {
      min-width: var(--action-icon-min-width-middle);
    }
  }

  &_big {
    svg {
      min-width: var(--action-icon-min-width-large);
    }
  }
}
</style>
