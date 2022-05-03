<template>
  <div
    :id="`select-${componentId}`"
    class="select"
    :class="{
      'select_error': error,
      'select_correct': correct,
    }"
  >
    <vSelect
      ref="select"
      :id="componentId"
      :options="options"
      :value="value"
      :placeholder="placeholder"
      :clearable="false"
      :searchable="searchable"
      @input="onSelect"
      v-bind="$attrs"
      :disabled="disabled"
      class="select__select"
    >
      <template v-slot:open-indicator="{attributes}">
        <span class="select__arrow" v-bind="attributes">
          <SvgIcon name='arrow'></SvgIcon>
        </span>
      </template>
      <template v-slot:no-options="{}">
        <span>{{ notFoundText }}</span>
      </template>
      <template v-slot:selected-option-container="{option}">
        <div class="vs__selected">{{ option.label }}</div>
      </template>
    </vSelect>
    <label v-if="error || correct" class="select__label" :for="componentId">{{ error || correct }}</label>
  </div>
</template>

<script>
import vSelect from 'vue-select'

export default {
  name: 'UiSelect',
  props: {
    value: {
      validator: (prop) => prop === null || typeof prop === 'object',
      required: true,
      default: () => {
        return {
          name: '',
          label: '',
        }
      },
    },
    options: {
      type: Array,
      required: true,
      default() {
        return []
      },
    },
    searchable: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: 'Выберите опцию...',
    },
    disabled: {
      type: Boolean,
    },
    error: {
      type: String,
      default: '',
    },
    correct: {
      type: String,
      default: '',
    },
    notFoundText: {
      type: String,
      default: 'Ничего не найдено',
    },
  },
  components: {
    vSelect,
  },
  methods: {
    onSelect(val) {
      this.$emit('input', val)
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
@import '~vue-select/src/scss/vue-select.scss';

:root {
  /* Размеры */
  --select-vertical-padding: var(--main-input-vertical-padding);
  --select-horizontal-padding: var(--main-input-horizontal-padding);
  --select-label-size: var(--main-input-label-size);
  --select-border-radius: var(--main-input-radius);
  --select-border-width: var(--main-input-border-width);
  --select-drop-max-height: 250px;
  --select-font-size: var(--main-size);

  /* Цвета */
  --select-background-color: var(--main-input-background-color);
  --select-text-color: var(--main-light);
  --select-label-color: var(--select-text-color);
  --select-error-color: var(--main-danger-color);
  --select-correct-color: var(--main-success-color);
  --select-placeholder-color: var(--main-input-placeholder-color);
  --select-placeholder-disabled-color: var(--main-disable-color);
  --select-option-selected-color: var(--main-light);
  --select-option-color: var(--main-light);
  --select-options-background-color: var(--dark-1);
  --select-option-selected-background-color: var(--main-color);
  --select-arrow-color: var(--main-light);

  --select-border-color: var(--main-input-border-color);
  --select-label-error-color: var(--select-error-color);
  --select-border-error-color: var(--select-error-color);

  --select-label-correct-color: var(--select-correct-color);
  --select-border-correct-color: var(--select-correct-color);
}
</style>

<style lang="scss" scoped>
.select {
  &__label {
    display: block;
    font-size: var(--select-label-size);
    line-height: 1.4;
    color: var(--select-label-color);
    margin: var(--main-input-label-offset-top) 0 0 var(--main-input-label-offset-left);
  }

  &__arrow {
    width: 15px;
    height: 15px;
    display: flex;
    color: var(--select-arrow-color);

    & svg {
      max-width: 15px;
      max-height: 15px;
      fill: currentColor;
    }
  }

  &__select {
    border: var(--select-border-width) solid var(--select-border-color);
    border-radius: var(--select-border-radius);
  }

  &_error {
    --select-label-color: var(--select-label-error-color);
    --select-border-color: var(--select-border-error-color);
  }

  &_correct {
    --select-label-color: var(--select-label-correct-color);
    --select-border-color: var(--select-border-correct-color);
  }

  ::v-deep {
    .vs__search {
      padding: var(--select-vertical-padding) var(--select-horizontal-padding);
      font-size: var(--select-font-size);
      line-height: 1.4;
      -webkit-appearance: none;
      margin: 0;

      &::placeholder {
        font-size: inherit;
        line-height: inherit;
        color: var(--select-placeholder-color);
      }

      &:disabled {
        --select-placeholder-color: var(--select-placeholder-disabled-color);
      }

      &:focus,
      &:active {
        margin: 0;
      }
    }

    .vs__dropdown-toggle {
      padding: 0;
      border-radius: var(--select-border-radius);
      border: 0;
      transition: background 0.25s ease;
    }

    .vs--open .vs__dropdown-toggle {
      border-radius: var(--select-border-radius) var(--select-border-radius) 0 0;
    }

    .vs__selected-options {
      padding: 0;
      flex-wrap: nowrap;
      white-space: nowrap;
      overflow: hidden;
      border-radius: var(--select-border-radius);
    }

    .vs__selected {
      background: transparent;
      margin: 0;
      padding: var(--select-vertical-padding) var(--select-horizontal-padding);
      border-radius: var(--select-border-radius);
    }

    .vs__actions {
      padding: 0 var(--select-horizontal-padding);
      border-radius: var(--select-border-radius);
    }

    .vs__dropdown-menu {
      top: 100%;
      left: -1px;
      width: calc(100% + var(--select-border-width) * 2);
      padding: 0;
      box-shadow: none;
      border: none;
      border-radius: 0 0 var(--select-border-radius) var(--select-border-radius);
      max-height: var(--select-drop-max-height);
      background: var(--select-options-background-color);
    }

    .vs__dropdown-option {
      position: relative;
      padding: 8px 30px;
      font-size: var(--select-font-size);
      line-height: 1.4;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      transition: background 0.1s ease, color 0.25s ease;

      color: var(--select-option-color);
      background: var(--select-options-background-color);
    }

    .vs__no-options {
      padding: 14px 20px;
      font-size: var(--select-font-size);
      line-height: 24px;
      text-align: center;
      color: var(--select-text-color);
    }

    .vs--open .vs__search,
    .vs__search,
    .vs__selected {
      color: var(--select-text-color);
      font-weight: 500;
      font-size: var(--select-font-size);
    }

    .vs__search,
    .vs__dropdown-toggle {
      background: var(--select-background-color);
    }

    .vs__dropdown-option--highlight {
      color: var(--select-option-selected-color);
      background: var(--select-option-selected-background-color);
    }

    .vs--single.vs--open .vs__selected, .vs--single.vs--loading .vs__selected {
      position: static;
      color: var(--select-option-color);
      font-weight: 500;
      opacity: 1;
    }
  }
}
</style>
