<template>
  <div
    :id="`zeen-text-area-${componentId}`"
    class="zeen-text-area"
    :class="{
      'zeen-text-area_error': error,
      'zeen-text-area_correct': correct,
    }"
  >
    <label class="zeen-text-area__label" :for="componentId">{{ error || correct }}</label>
    <div class="zeen-text-area__wrapper">
      <textarea
        class="zeen-text-area__text-area"
        :value="value"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        :name="name"
        :rows="rows"
        @input="onInput"
        v-bind="$attrs"
        :id="componentId"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ZeenTextArea',
  props: {
    value: {
      type: String,
      required: true,
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
    error: {
      type: String,
      default: '',
    },
    correct: {
      type: String,
      default: '',
    },
    rows: {
      type: [String, Number],
      default: 6,
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
  },
}
</script>

<style lang="scss">
:root {
  /* Размеры */
  --text-area-label-size: var(--main-input-label-size);
  --text-area-label-line-height: 1.4;
  --text-area-border-width: var(--main-input-border-width);
  --text-area-border-radius: var(--main-input-radius);
  --text-area-text-size: var(--main-size);
  --text-area-horizontal-padding: 15px;
  --text-area-vertical-padding: 20px;

  /* Цвета */
  --text-area-label-base-color: var(--input-main-placeholder-color);
  --text-area-label-error-color: var(--input-error-color);
  --text-area-label-correct-color: var(--input-correct-color);
  --text-area-border-base-focus-color: var(--input-main-color);
  --text-area-color: var(--input-main-value-color);
  --text-area-background: #000;

  --text-area-border-color: var(--main-color);
  --text-area-border-error-color: var(--text-area-label-error-color);
  --text-area-border-correct-color: var(--text-area-label-correct-color);

  --text-area-placeholder-color: var(--input-main-placeholder-color);
  --text-area-placeholder-disable-color: var(--input-placeholder-disable-color);
}
</style>

<style lang="scss" scoped>
.zeen-text-area {
  --text-area-label-color: var(--text-area-label-base-color);
  --text-area-border-focus-color: var(--text-area-border-base-focus-color);

  &_error {
    --text-area-label-color: var(--text-area-label-error-color);
    --text-area-border-focus-color: var(--text-area-border-error-color);
    --text-area-border-color: var(--text-area-border-focus-color);
  }

  &_correct {
    --text-area-label-color: var(--text-area-label-correct-color);
    --text-area-border-focus-color: var(--text-area-border-correct-color);
    --text-area-border-color: var(--text-area-border-focus-color);
  }

  &__label {
    display: block;
    font-size: var(--text-area-label-size);
    line-height: var(--text-area-label-line-height);
    color: var(--text-area-label-color);
    margin: 0 0 var(--main-input-label-offset-bottom) var(--main-input-label-offset-left);
  }

  &__wrapper {
    position: relative;
  }

  &__text-area {
    width: 100%;
    box-sizing: border-box;
    border-radius: var(--text-area-border-radius);
    border: var(--text-area-border-width) solid var(--text-area-border-color);
    padding: var(--text-area-vertical-padding) var(--text-area-horizontal-padding);
    font-size: var(--text-area-text-size);
    line-height: 1.5;
    -webkit-appearance: none;
    outline: none;
    resize: none;
    font-family: inherit;
    color: var(--text-area-color);
    background: var(--text-area-background);

    &:focus {
      --text-area-border-color: var(--text-area-border-focus-color);
    }

    &:disabled {
      --text-area-border-color: transparent;

      &::placeholder {
        --text-area-placeholder-color: var(--text-area-placeholder-disable-color);
      }
    }

    &::placeholder {
      color: var(--text-area-placeholder-color);
    }
  }
}
</style>
