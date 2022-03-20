<template>
  <component
    class="zeen-picture"
    :id="`zeen-picture-${componentId}`"
    :is="getElement"
    :href="href"
    :to="to"
    :class="classes"
    @click="showModal"
    :style="{
      '--picture-object-fit': setFit,
      '--picture-cursor': setCursor,
      '--picture-object-position': position,
    }"
  >
    <slot/>
    <img class="zeen-picture__img" :src="src" :alt="alt"/>
  </component>
</template>

<script>

export default {
  name: 'Picture',
  inheritAttrs: false,
  props: {
    src: {
      type: String,
      default: '',
      required: true,
    },
    alt: {
      type: String,
      default: '',
      required: false,
    },
    href: {
      type: String,
      default: '',
      required: false,
    },
    to: {
      type: [String, Object],
      default: '',
      required: false,
    },
    modalId: {
      type: String,
      required: false,
    },
    modalParams: {
      type: [String, Object],
      required: false,
    },
    boarderRadius: {
      type: [String, Number],
      default: 0,
      required: false,
    },
    maxWidth: {
      type: [String, Number],
      default: 0,
      required: false,
    },
    maxHeight: {
      type: [String, Number],
      default: 0,
      required: false,
    },
    fillType: {
      type: String,
      required: false,
    },
    imagePosition: {
      type: String,
      required: false,
      validator: (position) =>
        position
          .replace('_', ' ')
          .split(' ')
          .every((value) => ['top', 'bottom', 'left', 'right', 'middle'].includes(value)),
    },
    aspectRatio: {
      type: String,
      validator: (ratio) => ['16:9', '4:3', '1:1'].includes(ratio),
    },
    isSquare: Boolean,
  },
  computed: {
    getElement() {
      if (this.href) {
        return 'a'
      } else if (this.to) {
        return 'router-link'
      }
      return 'picture'
    },
    componentId() {
      return this._uid
    },
    setFit() {
      if (!this.fillType) {
        return undefined
      }
      return this.fillType === 'fill' ? 'cover' : 'contain'
    },
    isInteractive() {
      return !!(this.modalId || this.to || this.href)
    },
    setCursor() {
      return this.isInteractive ? 'pointer' : 'initial'
    },
    position() {
      if (!this.imagePosition) {
        return undefined
      }

      return this.imagePosition?.replace('_', ' ').replace('middle', 'center')
    },
    classes() {
      let aspect = this.aspectRatio?.replace(':', '-')
      if (this.isSquare) {
        aspect = '1-1'
      }

      return {
        [`zeen-picture_aspect-${aspect}`]: aspect,
      }
    },
  },
  methods: {
    showModal() {
      if (this.modalId) {
        this.$vfm.show(this.modalId, this.modalParams)
      }
    },
  },
}
</script>

<style lang="scss">
:root {
  /* Размеры */
  --picture-border-radius: var(--main-input-radius);
  --picture-max-width: 100%;
  --picture-max-height: 100%;

  /* Прочее */
  --picture-object-fit: cover;
  --picture-object-position: center;
  --picture-cursor: default;

  /* Цвета */
  --picture-color: var(main-text-color);
}
</style>

<style lang="scss" scoped>

.zeen-picture {
  display: block;
  flex: 0 0 auto;

  &_aspect {
    &-1-1 {
      width: 100%;
      position: relative;

      &::after {
        content: '';
        display: block;
        width: 100%;
        padding-top: 100%;
      }

      .zeen-picture__img {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }
    }
  }

  &__img {
    display: block;
    vertical-align: middle;
    width: 100%;
    height: inherit;
    border-radius: var(--picture-border-radius);
    max-width: var(--picture-max-width);
    max-height: var(--picture-max-height);
    object-fit: var(--picture-object-fit);
    object-position: var(--picture-object-position);
    cursor: var(--picture-cursor);
  }
}
</style>
