<template>
  <div
    :id="`text-input-${componentId}`"
    :key="componentId"
    class="text-input"
    :class="{
      'text-input_error': error,
      'text-input_correct': correct,
    }"
  >
    <div class="text-input__wrapper">
      <input
        class="text-input__input"
        :class="{
          'text-input__input_with-btn': hasBtnSlot,
          'text-input__input_with-two-btn': hasTwoBtnSlot,
          'text-input__input_password': type === 'password',
        }"
        :value="value"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        :name="name"
        :type="type"
        @input="onInput"
        @keyup.enter="$emit('handleKeypress')"
        v-bind="$attrs"
        :id="componentId"
        :key="`input-${componentId}`"
      />
      <div class="text-input__btn" v-if="hasBtnSlot">
        <slot name="btn"></slot>
        <slot name="img"></slot>
      </div>
    </div>
    <label v-if="error || correct" class="text-input__label" :for="componentId">{{ error || correct }}</label>
  </div>
</template>

<script>

export default {
  name: 'UiTextInput',
  props: {
    value: {
      type: [String, Number],
      required: false,
      default: null,
    },
    placeholder: {
      type: String,
      required: false,
    },
    required: {
      type: Boolean,
      required: false,
    },
    disabled: {
      type: Boolean,
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      default: 'text',
    },
    error: {
      type: String,
      default: '',
    },
    correct: {
      type: String,
      default: '',
    },
  },
  methods: {
    onInput(e) {
      this.$emit('input', e.target.value)
    },
  },
  computed: {
    componentId() {
      return this._uid
    },
    hasBtnSlot() {
      return !!this.$slots.btn
    },
    hasTwoBtnSlot() {
      return this.$slots.btn && this.$slots?.btn?.length > 1
    },
  },
}
</script>
<style lang="scss">
:root {
  /* Размеры кнопки */
  --text-input-vertical-padding: var(--main-input-vertical-padding);
  --text-input-horizontal-padding: var(--main-input-horizontal-padding);
  --text-input-border-width: 1px;
  --text-input-label-size: var(--main-input-label-size);
  --text-input-text-size: var(--main-size);
  --text-input-border-radius: var(--main-input-radius);

  /* Цвета кнопки */
  --text-input-label-base-color: var(--main-light);
  --text-input-label-error-color: var(--main-danger-color);
  --text-input-label-correct-color: var(--main-success-color);
  --text-input-border-base-focus-color: var(--main-color);
  --text-input-color: var(--main-light);
  --text-input-background: var(--main-input-background-color);

  --text-input-border-color: var(--main-input-border-color);
  --text-input-border-error-color: var(--text-input-label-error-color);
  --text-input-border-correct-color: var(--text-input-label-correct-color);

  --text-input-placeholder-color: var(--main-input-placeholder-color);
  --text-input-placeholder-disable-color: var(--main-disable-color);
}
</style>
<style lang="scss" scoped>
.text-input {
  --text-input-label-color: var(--text-input-label-base-color);
  --text-input-border-focus-color: var(--text-input-border-base-focus-color);

  &_error {
    --text-input-label-color: var(--text-input-label-error-color);
    --text-input-border-focus-color: var(--text-input-border-error-color);
    --text-input-border-color: var(--text-input-border-focus-color);
  }

  &_correct {
    --text-input-label-color: var(--text-input-label-correct-color);
    --text-input-border-focus-color: var(--text-input-border-correct-color);
    --text-input-border-color: var(--text-input-border-focus-color);
  }

  &__label {
    display: block;
    font-size: var(--text-input-label-size);
    line-height: 1.4;
    color: var(--text-input-label-color);
    margin: var(--main-input-label-offset-top) 0 0 var(--main-input-label-offset-left);
  }

  &__wrapper {
    position: relative;
  }

  &__input {
    width: 100%;
    box-sizing: border-box;
    border-radius: var(--text-input-border-radius);
    border: var(--text-input-border-width) solid var(--text-input-border-color);
    padding: var(--text-input-vertical-padding) var(--text-input-horizontal-padding);
    font-size: var(--text-input-text-size);
    line-height: 1.5;
    -webkit-appearance: none;
    outline: none;
    color: var(--text-input-color);
    background: var(--text-input-background);

    &::placeholder {
      font-size: inherit;
      line-height: inherit;
    }

    &:focus {
      border-color: var(--text-input-border-focus-color);
    }

    &:disabled {
      --text-input-border-color: transparent;

      &::placeholder {
        --text-input-placeholder-color: var(--text-input-placeholder-disable-color);
      }
    }

    &::placeholder {
      color: var(--text-input-placeholder-color);
    }

    &_with-btn {
      padding-right: 50px;
    }

    &_with-two-btn {
      padding-right: 100px;
    }
  }

  &__btn {
    position: absolute;
    right: 25px;
    top: 50%;
    transform: translate(0, -50%);
    display: flex;
    align-items: center;
  }
}
</style>
