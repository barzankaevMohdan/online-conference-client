<template lang="pug">
  .faq-row(:class="{'collapsed': isSelected}" :id="`faq-row-${componentId}`")
    label.faq-row__label
      input.faq-row__checkbox(
        type='checkbox'
        v-model='isSelected'
      )
      span.faq-row__title {{ title }}
      span.faq-row__icon
        SvgIcon(name='arrow')
    UiSlideToggle(:open="isSelected" :duration='200')
      .faq-row__description(v-html="description")
</template>

<script>

export default {
  name: 'UiFaqRow',
  props: {
    title: String,
    description: String,
  },
  data() {
    return {
      isSelected: false,
    }
  },
  computed: {
    componentId() {
      return this._uid
    },
  },
}
</script>

<style lang="scss">
@import "~/styles/mixins.scss";

:root {
  /* Размеры */
  --faq-row-title-size: var(--main-large-size);
  --faq-row-description-size: var(--main-size);
  --faq-row-description-padding: 0 20px 40px 60px;
  --faq-label-padding: 40px 50px 30px;
  --faq-row-border-width: 1px;
  --faq-icon-size: 24px;

  @include phones() {
    --faq-label-padding: 30px 25px;
    --faq-row-description-padding: 0 15px 20px 30px;
    --faq-icon-size: 16px;
  }

  /* Цвета */
  --faq-row-title-color: var(--main-light);
  --faq-row-title-open-color: var(--main-color);
  --faq-row-icon-color: var(--main-light);
  --faq-row-icon-open-color: var(--main-color);
  --faq-row-description-color: var(--main-light);
  --faq-row-background: var(--main-positive-color);
  --faq-row-border-color: var(--dark-1);
  --faq-row-link-color: var(--main-color);
  --faq-row-link-hover-color: var(--main-hover-color);
}
</style>

<style lang="scss" scoped>
@import "~/styles/mixins.scss";

.faq-row {
  --negative-margin: calc((-1) * var(--faq-row-border-width));

  position: relative;
  border-top: var(--faq-row-border-width) solid var(--faq-row-border-color);
  margin: var(--negative-margin) 0;
  background: var(--faq-row-background);

  &__label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--faq-label-padding);
    cursor: pointer;
  }

  &__checkbox {
    opacity: 0;
    position: absolute;
  }

  &__title {
    font-style: normal;
    font-weight: 600;
    font-size: var(--faq-row-title-size);
    line-height: 1.3;
    transition: color 0.5s;
    color: var(--faq-row-title-color);
  }

  &__icon {
    transition: 0.6s;
    color: var(--faq-row-icon-color);

    & svg {
      fill: currentColor;
      max-width: var(--faq-icon-size);
      max-height: var(--faq-icon-size);
    }
  }

  &__description {
    font-weight: normal;
    font-size: var(--faq-row-description-size);
    line-height: 1.5;
    padding: var(--faq-row-description-padding);
    color: var(--faq-row-description-color);
    ::v-deep a {
      &,
      &:focus,
      &:visited {
        color: var(--faq-row-link-color)
      }

      &:hover,
      &:active {
        color: var(--faq-row-link-hover-color)
      }
    }
  }
}

.collapsed {
  --faq-row-icon-color: var(--faq-row-icon-open-color);
  --faq-row-title-color: var(--faq-row-title-open-color);

  .faq-row__icon {
    transform: rotate(180deg);
  }
}
</style>
