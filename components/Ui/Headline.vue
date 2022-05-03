<template>
  <component
    class="headline"
    :class="`headline_tag-${tag}`"
    :is="tag"
  >
    <slot/>
  </component>
</template>

<script>
export default {
  name: 'UiHeadline',
  props: {
    tag: {
      type: String,
      default: 'h2',
      validator: (level) => ['h1', 'h2', 'h3', 'h4'].includes(level),
    },
  },
}
</script>

<style lang="scss">
:root {
  /* Размеры */
  --headline-size-h4: var(--main-large-size);
  --headline-size-h3: var(--main-larger-size);
  --headline-size-h2: var(--main-largest-size);
  --headline-size-h1: var(--main-notbigget-size);
  --headline-size-line-height: 1.44;
  --headline-padding-vertical: 0;
  --headline-padding-horizontal: 0;
  --headline-margin-vertical: 0;
  --headline-margin-horizontal: 0;

  /* Цвета */
  --headline-color: var(--main-light);
}
</style>


<style lang="scss" scoped>
.headline {
  color: var(--headline-color);
  font-size: var(--headline-size);
  line-height: var(--headline-size-line-height);
  border: none;
  padding: var(--headline-padding-vertical) var(--headline-padding-horizontal);
  margin: var(--headline-margin-vertical) var(--headline-margin-horizontal);

  &_tag {
    &-h1 {
      font-size: var(--headline-size-h1);
    }

    &-h2 {
      font-size: var(--headline-size-h2);
    }

    &-h3 {
      font-size: var(--headline-size-h3);
    }

    &-h4 {
      font-size: var(--headline-size-h4);
    }
  }
}
</style>
