<template>
  <component
    :is="getElement"
    :id="`button-${componentId}`"
    class="button"
    :class="{
      'button_fill-main': theme === 'fill-main',
      'button_fill-additional': theme === 'fill-additional',
      'button_outline': theme === 'outline',
      'button_parent-width': size === 'parentWidth',
      'button_no-padding': theme === 'no-padding',
      'button_is-loading': isLoading,
      'button_no-radius': noRadius,
    }"
    :href="href"
    :to="to"
    :disabled="disabled || isLoading"
    v-on="$listeners"
    v-bind="$attrs"
  >
    <div class="button__content">
      <slot name="leftIcon"></slot>
      <slot></slot>
      <slot name="rightIcon"></slot>
    </div>

    <div class="button__loader" v-if="isLoading">
      <slot name="loading">
        {{ loadingText }}
      </slot>
    </div>
  </component>
</template>

<script>
export default {
  name: 'UiButton',
  props: {
    loadingText: {
      type: String,
      default: 'Загрузка...',
    },
    href: {
      type: String,
      default: null,
    },
    to: {
      type: [String, Object],
      default: null,
    },
    theme: {
      type: String,
      default: 'fill-main',
      validator: (theme) => ['fill-main', 'fill-additional', 'outline', 'no-padding'].includes(theme),
    },
    size: {
      type: String,
      default: 'contentWidth',
      validator: (size) => ['contentWidth', 'parentWidth'].includes(size),
    },
    isLoading: {
      type: Boolean,
      required: false,
    },
    disabled: {
      type: Boolean,
      required: false,
    },
    noRadius: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    componentId() {
      return this._uid
    },
    getElement() {
      if (this.href) {
        return 'a'
      } else if (this.to) {
        return 'router-link'
      }

      return 'button'
    },
  },
}
</script>

<style>
:root {
  /* Размеры */
  --button-font-size: var(--main-size);
  --button-padding-horizontal: 30px;
  --button-padding-vertical: 15px;
  --button-border-radius: var(--main-input-radius);
  --button-border-width: 1px;
  --button-line-height: calc(var(--button-font-size) * 1.375);

  /* Цвета */
  --button-main-color: var(--main-color);
  --button-hover-color: var(--main-hover-color);
  --button-click-color: var(--main-active-color);
  --button-border-color: transparent;
  --button-additional-color: var(--main-light);
  --button-disabled-background-color: var(--gray-1);
  --button-disabled-color: var(--gray-2);
  --button-text-color: var(--button-additional-color);
}
</style>

<style lang="scss" scoped>
@import "~/styles/mixins.scss";

.button {
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: var(--button-padding-vertical) var(--button-padding-horizontal);
  border: var(--button-border-width) solid var(--button-border-color);
  box-sizing: border-box;
  border-radius: var(--button-border-radius);
  font-weight: 600;
  font-size: var(--button-font-size);
  line-height: var(--button-line-height);
  text-align: center;
  cursor: pointer;
  box-shadow: none;
  transition: background-color 0.25s ease, color 0.25s ease, opacity 0.25s ease;
  white-space: nowrap;
  text-decoration: none;
  font-family: inherit;
  color: var(--button-text-color);
  background: var(--button-main-color);

  &:focus,
  &:active,
  &:visited,
  &:hover {
    outline: none;
    text-decoration: none !important;
  }

  &:disabled {
    cursor: auto;
  }

  &_fill-main {
    &:hover {
      background-color: var(--button-hover-color);
    }

    &:active {
      background-color: var(--button-click-color);
    }
  }

  &_fill-additional {
    background: transparent;
    color: var(--button-main-color);

    &:hover {
      color: var(--button-hover-color);
    }

    &:active {
      color: var(--button-click-color);
    }
  }

  &_outline {
    background: transparent;
    color: var(--button-main-color);
    border-color: var(--button-main-color);

    &:hover {
      color: var(--button-hover-color);
      border-color: var(--button-hover-color);
    }

    &:active {
      color: var(--button-click-color);
      border-color: var(--button-click-color);
    }
  }

  &:disabled,
  &:disabled:hover,
  &:disabled:focus {
    color: var(--button-disabled-color);
    background-color: var(--button-disabled-background-color);
  }

  &_is-loading:disabled,
  &_is-loading:disabled:hover,
  &_is-loading:disabled:focus {
    color: var(--button-text-color);
    background-color: var(--button-main-color);
  }

  &_parent-width {
    width: 100%;
  }

  &_is-loading {
    .button__content {
      opacity: 0;
    }
  }

  &_no-radius {
    border-radius: 0;
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: center;

    svg > * {
      fill: var(--button-text-color);
    }
  }

  &__loader {
    display: flex;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &_no-padding {
    padding: 0;
    background: none;
    border: none;
  }
}
</style>
