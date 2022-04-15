<template>
  <div class="faq-row" :class="{collapsed: isSelected}" :id="`faq-row-${componentId}`">
    <label class="faq-radio__label">
      <input
        class="faq-row__checkbox"
        type="checkbox"
        v-model="model"
        :value="value"
        :true-value="value"
      />
      <span class="faq-row__title">
        <slot name="title">
          {{ title }}
        </slot>
      </span>
      <span class="faq-icon">
        <slot name="icon">
          <svg
            width="26"
            height="14"
            viewBox="0 0 27 14"
            xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0.792893 0.292893C1.18342 -0.0976311 1.81658 -0.0976311 2.20711 0.292893L13.5 11.5858L24.7929 0.292893C25.1834 -0.0976311 25.8166 -0.0976311 26.2071 0.292893C26.5976 0.683417 26.5976 1.31658 26.2071 1.70711L14.2071 13.7071C13.8166 14.0976 13.1834 14.0976 12.7929 13.7071L0.792893 1.70711C0.402369 1.31658 0.402369 0.683417 0.792893 0.292893Z"/>
          </svg>
        </slot>
      </span>
    </label>
    <transition name="slide">
      <div
        v-html="description"
        v-show="isSelected"
        class="faq-row__description"
      >
        <slot name="description">
          {{ description }}
        </slot>
      </div>
    </transition>
  </div>
</template>

<script>

export default {
  name: 'UiFaqRow',
  model: {
    prop: 'modelValue',
    event: 'change',
  },
  props: {
    modelValue: {
      required: true,
    },
    value: [String, Object, Array, Number, Boolean],
    title: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    index: String,
    color: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  computed: {
    componentId() {
      return this._uid
    },
    isSelected() {
      if (Array.isArray(this.model)) {
        return this.model.includes(this.value)
      }

      switch (typeof this.model) {
        case 'number':
        case 'string':
          return this.model === this.value
        case 'boolean':
        default:
          return !!this.model
      }
    },
    model: {
      get() {
        return this.modelValue
      },
      set(val) {
        this.$emit('change', val)
      },
    },
  },
}
</script>

<style lang="scss">
:root {
  /* Размеры */
  --faq-row-title-size: var(--main-large-size);
  --faq-row-description-size: var(--main-size);
  --faq-row-margin-start: 0;
  --faq-row-max-height: max-content;
  --faq-row-collapsed-max-height: 400px;
  --faq-row-description-padding: 0 20px 40px 60px;
  --faq-radio-padding: 40px 50px 30px;
  --faq-row-border-width: 1px;

  /* Цвета */
  --faq-row-title-color: var(--main-light);
  --faq-row-title-open-base-color: var(--main-color);
  --faq-row-icon-base-color: var(--main-light);
  --faq-row-icon-open-base-color: var(--main-color);
  --faq-row-description-color: var(--main-light);
  --faq-row-background: var(--main-positive-color);
  --faq-row-border-color: var(--dark-1);
  --faq-row-link-base-color: var(--main-hover-color);
  --faq-row-link-hover-base-color: var(--main-hover-color);
}
</style>

<style lang="scss" scoped>
@import "~/styles/mixins.scss";

.faq-row {
  --faq-row-title-open-color: var(--faq-row-title-open-base-color);
  --faq-row-icon-color: var(--faq-row-icon-base-color);
  --faq-row-icon-open-color: var(--faq-row-icon-open-base-color);
  --faq-row-link-color: var(--faq-row-link-base-color);
  --faq-row-link-hover-color: var(--faq-row-link-hover-base-color);
  --negative-margin: calc((-1) * var(--faq-row-border-width));

  z-index: 1;
  position: relative;
  border-top: var(--faq-row-border-width) solid var(--faq-row-border-color);
  border-bottom: var(--faq-row-border-width) solid var(--faq-row-border-color);
  margin: var(--negative-margin) 0;
  background: var(--faq-row-background);
  transition: max-height 0.4s ease-in;
  max-height: var(--faq-row-max-height);


  &__checkbox {
    opacity: 0;
    position: absolute;
  }

  &__title {
    font-style: normal;
    font-weight: 600;
    font-size: var(--faq-row-title-size);
    line-height: 1.3;
    width: auto;
    text-align: left;
    background: none;
    border: none;
    transition: color 0.5s;
    color: var(--faq-row-title-color);
  }

  &__description {
    font-weight: normal;
    font-size: var(--faq-row-description-size);
    line-height: 1.5;
    padding: var(--faq-row-description-padding);
    margin-top: var(--faq-row-description-offset-top);
    color: var(--faq-row-description-color);
    margin-block-start: var(--faq-row-margin-start);
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

  &.collapsed {
    --faq-row-icon-color: var(--faq-row-icon-open-color);
    max-height: var(--faq-row-collapsed-max-height);
    transition: max-height 0.6s ease;

    .faq-icon {
      transform: rotate(180deg);
      transition: 0.6s;
    }

    .faq-row__title {
      --faq-row-title-color: var(--faq-row-title-open-color);
    }
  }
}

.faq-radio {
  &__label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--faq-radio-padding);
    cursor: pointer;
  }
}

.faq-icon {
  transition: 0.6s;
  color: var(--faq-row-icon-color);

  svg {
    fill: currentColor;
  }

  @include desktop {
    & svg {
      width: var(--faq-icon-width);
      height: var(--faq-icon-height);
    }
  }
}

.slide-enter-active {
  transition: all 0.5s ease-in;
}

.slide-leave-active {
  transition: all 0.4s ease-in;
}

.slide-enter,
.slide-leave-to {
  transform: translateY(-10%);
  opacity: 0;
}


</style>
