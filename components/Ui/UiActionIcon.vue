<template>
  <button
    class="action-icon"
    :id="`action-icon-${componentId}`"
    v-on="$listeners"
    v-bind="$attrs"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'UiActionIcon',
  props: {
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
  --action-icon-size: 15px;

  /* Цвета */
  --action-icon-color: var(--main-color);
  --action-icon-hover-color: var(--main-hover-color);
  --action-icon-focus-color: var(--main-hover-color);
  --action-icon-active-color: var(--main-active-color);
  --action-icon-disable-color: var(--main-disable-color);
}
</style>

<style lang="scss" scoped>

.action-icon {
  background-color: transparent;
  padding: 0;
  outline: none;
  border: 0;
  display: inline-flex;
  cursor: pointer;
  color: var(--action-icon-color);
  transition: 0.2s;

  &:hover {
    color: var(--action-icon-hover-color);
  }

  &:focus {
    color: var(--action-icon-focus-color);
  }

  &:active {
    color: var(--action-icon-active-color);
  }

  &:disabled {
    cursor: auto;
    color: var(--action-icon-disable-color);
  }

  svg {
    max-width: var(--action-icon-size);
    max-height: var(--action-icon-size);
    fill: currentColor;
  }
}
</style>
