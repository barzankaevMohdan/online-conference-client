<template>
  <div class="zeen-tab">
    <div class="zeen-tab__header">
      <div
        v-for="(item, index) in tabOptions"
        :key="`${item.id}-${index}`"
        class="zeen-tab__button-container"
      >
        <button
          @click="switchTab(index)"
          :class="{'zeen-tab__button-active': index === activeIndex}"
          class="zeen-tab__button"
        >
          <slot name="tab-name">
            {{ item.data.title }}
          </slot>
        </button>
      </div>
    </div>
    <div class="zeen-tab__content">
      <div class="zeen-tab__content-area">
        <slot :name="tabContentName"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ZeenTab',
  props: {
    tabOptions: {
      type: Array,
    },
  },
  data() {
    return {
      activeIndex: 0,
    }
  },
  methods: {
    tabHeadSlotName() {
      return `tab-${this.activeIndex}`
    },
    switchTab(index) {
      this.activeIndex = index
    },
  },
  computed: {
    tabContentName() {
      return `tab-content-${this.tabOptions[this.activeIndex]?.id}`
    },
  },
}
</script>
<style lang="scss">
:root {
  /* Размеры */
  --zeen-tab-full-size: 100%;
  --zeen-tab-gap: 10px;
  --zeen-tab-border-width: 1px;
  --zeen-tab-fontsize: var(--main-smallest-text);
  --zeen-tab-background: var(--dark-2);
  --zeen-tab-border-bottom-size: 3px;
  --zeen-tab-container-basis: 50%;
  --zeen-tab-button-container-height: 40px;

  --zeen-tab-border: var(--zeen-tab-border-width) solid var(--zeen-tab-border-color);
  
  /* Цвета */
  --zeen-tab-general-color: var(--main-color);
  --zeen-tab-border-color: var(--gray-1);
  --zeen-tab-container-background: var(--gray-3);
  --zeen-tab-active-border-bottom-color: var(--zeen-tab-general-color);
}
</style>
<style lang="scss" scoped>
@import '~/styles/mixins.scss';

.zeen-tab {
  min-height: var(--zeen-tab-full-size);
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  width: 100%;
  position: relative;

  &__header {
    display: flex;
  }

  &__button {
    width: var(--zeen-tab-full-size);
    height: var(--zeen-tab-button-container-height);
    font-size: var(--zeen-tab-fontsize);
    padding: var(--zeen-tab-gap);
    border: none;
    border-bottom:  var(--zeen-tab-border);
    background: var(--zeen-tab-background);
    cursor: pointer;
    color: var(--zeen-message-text-color-secondary);

    &-container {
      width: 50%;
      flex: 1 1 auto;
      border-left: var(--zeen-tab-border);
      background: var(--zeen-tab-container-background);
      height: var(--zeen-tab-button-container-height);
      &:first-of-type {
        border-left: 0;
      }
    }

    img {
      max-height: var(--zeen-tab-full-size);
    }
    &-active {
      border-bottom-color: var(--zeen-tab-active-border-bottom-color);
      color: var(--zeen-message-text-color);
    }
  }

  &__content {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    position: relative;

    &-area {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }
}
</style>