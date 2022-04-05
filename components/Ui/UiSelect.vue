<template>
  <div
    :id="`zeen-select-${componentId}`"
    class="zeen-select"
    :class="{
      'zeen-select_error': error,
      'zeen-select_correct': correct,
    }"
  >
    <label v-if="error || correct" class="zeen-select__label" :for="componentId">{{ error || correct }}</label>
    <vSelect
      ref="select"
      :id="componentId"
      :options="options"
      :value="value"
      :placeholder="placeholder"
      :clearable="false"
      :searchable="searchable"
      @input="onSelect"
      @open="notSearchable"
      @close="closeSelect"
      v-bind="$attrs"
      :disabled="disabled"
      class="zeen-select__select"
    >
      <template v-slot:open-indicator="{attributes}">
        <span class="zeen-select__arrow" v-bind="attributes">
          <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L6 6L11 1" stroke="#908494" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </span>
      </template>
      <template v-slot:no-options="{}">
        <span>{{ notFoundText }}</span>
      </template>
      <template v-slot:selected-option-container="{option}">
        <div class="vs__selected">{{ option.label }}</div>
      </template>
    </vSelect>
  </div>
</template>

<script>
import vSelect from 'vue-select'

export default {
  name: 'UiSelect',
  data() {
    return {
      isOpen: '',
    }
  },
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
      default: true,
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
    notSearchable() {
      this.isOpen = true
      const searchStyle = this.$refs.select.$refs.search.style

      if (!this.searchable && this.$refs.select.$refs.selectedOptions.children.length > 1) {
        searchStyle.zIndex = '-1'
      } else if (!this.searchable) {
        searchStyle.pointerEvents = 'none'
      }

      if (this.isOpen) {
        this.$refs.select.$refs.selectedOptions.children[0].textContent = this.placeholder
      }
    },
    closeSelect() {
      this.isOpen = false

      if (!this.isOpen && this.value) {
        return (this.$refs.select.$refs.selectedOptions.children[0].textContent = this.value.label)
      }
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
  --select-label-size: var(--checkbox-size);
  --select-border-radius: var(--main-input-radius);
  --select-border-width: var(--main-input-border-width);
  --select-drop-max-width: 268px;
  --select-text-weight: inherit;
  --select-opened-text-weight: var(--select-text-weight);
  --select-opened-text-opacity: 1;
  --select-search-padding: 15px 25px;
  --select-search-font-size: 16px;
  --select-search-border-radius: 10px;

  /* Цвета */
  --select-background-color: var(--text-input-background);
  --select-text-color: var(--input-main-value-color);
  --select-label-color: var(--select-text-color);
  --select-error-color: var(--input-error-color);
  --select-correct-color: var(--input-correct-color);
  --select-placeholder-color: var(--input-main-placeholder-color);
  --select-placeholder-disabled-color: var(--input-main-placeholder-color);
  --select-option-selected-color: var(--main-light);
  --select-option-color: var(--input-main-value-color);
  --select-options-background-color: var(--dark-1);
  --select-option-selected-background-color: var(--main-color);
  --select-opened-text-color: var(--input-main-placeholder-color);
  --select-arrow-color: var(--input-main-value-color);

  --select-border-color: var(--main-color);
  --select-label-error-color: var(--select-error-color);
  --select-border-error-color: var(--select-error-color);

  --select-label-correct-color: var(--select-correct-color);
  --select-border-correct-color: var(--select-correct-color);
}
</style>

<style lang="scss" scoped>
.zeen-select {
  &__label {
    display: block;
    font-size: var(--select-label-size);
    line-height: 1.4;
    color: var(--select-label-color);
    margin: 0 0 var(--main-input-label-offset-bottom) var(--main-input-label-offset-left);
  }

  &__arrow {
    width: 12px;
    height: 7px;
    display: flex;

    & path {
      stroke: var(--select-arrow-color);
    }
  }

  &__select {
    border: var(--select-border-width) solid var(--select-border-color);
    border-radius: var(--select-border-radius);
  }

  ::v-deep .vs__search {
    width: 100%;
    box-sizing: border-box;
    border-radius: var(--select-search-border-radius);
    padding: var(--select-search-padding);
    font-size: var(--select-search-font-size);
    line-height: 1.4;
    -webkit-appearance: none;
    outline: none;
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

  ::v-deep .vs__dropdown-toggle {
    padding: 0;
    border-radius: var(--select-border-radius);
    border: 0;
    transition: background 0.25s ease;
  }

  ::v-deep .vs--open .vs__dropdown-toggle {
    border-radius: var(--select-border-radius) var(--select-border-radius) 0 0;
  }

  ::v-deep .vs__selected-options {
    padding: 0;
    min-width: 1px;
    flex-wrap: nowrap;
    white-space: nowrap;
    overflow: hidden;
    border-radius: var(--select-border-radius);
  }

  ::v-deep .vs__selected {
    background: transparent;
    margin: 0;
    padding: 15px 20px 15px 25px;
    border-radius: var(--select-border-radius);
    display: flex;
    align-items: center;

    + .vs__selected {
      margin-left: -2px;

      &::before {
        display: inline-block;
        content: ',';
        position: absolute;
        left: -13px;
        top: 13px;
      }
    }

    + .vs__search {
      margin-left: -2px;
    }
  }

  ::v-deep .vs__actions {
    padding: 0 24px 0 24px;
    border-radius: var(--select-border-radius);
  }

  ::v-deep .vs__dropdown-menu {
    top: 100%;
    width: calc(100% + 2px);
    left: -1px;
    padding: 0;
    box-shadow: none;
    border: 0 !important;
    border-radius: 0 0 var(--select-border-radius) var(--select-border-radius);
    max-height: var(--select-drop-max-width) !important;
    background: var(--select-options-background-color);
  }

  ::v-deep .vs__dropdown-option {
    position: relative;
    padding: 8px 30px;
    font-size: 16px;
    line-height: 24px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    transition: background 0.1s ease, color 0.25s ease;

    color: var(--select-option-color);
    background: var(--select-options-background-color);
  }

  ::v-deep .vs__dropdown-option--selected {
    padding-right: 45px;

    &::after {
      display: inline-block;
      content: ' ';
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
      width: 9px;
      height: 7px;
    }
  }

  ::v-deep .vs__no-options {
    padding: 14px 20px;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
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
    .vs--open .vs__search,
    .vs__search,
    .vs__selected {
      color: var(--select-text-color);
      font-weight: var(--select-text-weight);
    }

    .vs__search,
    .vs__dropdown-toggle {
      background: var(--select-background-color);
    }

    .vs__dropdown-option--highlight {
      color: var(--select-option-selected-color);
      background: var(--select-option-selected-background-color);
    }

    .vs--open .vs__selected {
      color: var(--select-opened-text-color);
      font-weight: var(--select-opened-text-weight);
      opacity: var(--select-opened-text-opacity);
    }
  }
}
</style>
