<template lang="pug">
  vue-final-modal.modal(
    v-model="showModal"
    @click-outside="clickOutside"
    @before-open="beforeOpen"
    @opened="opened"
    @before-close="beforeClose"
    @closed="closed"
    @cancel="showModal = false"
    :name='name'
  )
    template(v-slot="{ params }")
      .modal__content
        slot(name='close' :close="close")
          UiActionIcon.modal__close(@click.prevent='close')
            SvgIcon(name='close')
        .modal__icon(v-if='hasSlot("icon")')
          slot.modal__icon(name='icon')
        UiHeadline(v-if='hasSlot("title")' tag='h4')
          slot(name='title')
        div.modal__description(v-if='hasSlot("default")')
          slot(:params="params")
        div.modal__footer(v-if='hasSlot("footer")')
          slot(
            name='footer'
            :close="close"
          )
</template>

<script>
export default {
  name: 'UiModal',
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      showModal: false,
    }
  },
  methods: {
    hasSlot(name = 'default') {
      return !!this.$slots[name] || !!this.$scopedSlots[name]
    },
    clickOutside(data) {
      this.$emit('clickOutside', data)
    },
    beforeOpen(data) {
      this.$emit('beforeOpen', data)
    },
    opened(data) {
      this.$emit('opened', data)
    },
    beforeClose(data) {
      this.$emit('beforeClose', data)
    },
    close() {
      this.showModal = false
      this.$emit('close')
    },
    closed(data) {
      this.$emit('closed', data)
    },
  },
}
</script>

<style lang="scss">
@import '~/styles/mixins.scss';

.vfm__container {
  display: flex;
  overflow: auto;
}

.vfm__content {
  width: 100%;
  display: flex;
  flex: 0 0 auto;
  margin: auto;
  padding: 30px 16px;
  pointer-events: none;
}

:root {
  /* Размеры */
  --modal-max-width-desktop: 600px;
  --modal-base-gap: 40px;
  --modal-padding: 70px 50px 50px;
  --modal-border-radius: 20px;
  --modal-text-size: var(--main-size);
  --modal-text-line-height: 1.5;
  --modal-title-size: var(--main-larger-size);
  --modal-title-line-height: 1.3;
  --modal-footer-margin-top: var(--modal-base-gap);
  --modal-icon-padding-bottom: var(--modal-base-gap);
  --modal-close-gap: 40px;
  --modal-close-size: 20px;
  --modal-description-margin-vertical: 20px;

  /* Цвета */
  --modal-content-background: var(--main-positive-color);
  --modal-text-color: var(--main-light);
  --modal-title-color: var(--main-light);
  --modal-close-color: var(--main-light);
  --modal-icon-color: var(--main-color);

  @include phones() {
    /* Размеры */
    --modal-max-width-desktop: 335px;
    --modal-base-gap: 30px;
    --modal-padding: 50px 30px 30px;
    --modal-border-radius: 10px;

    --modal-text-size: 14px;

    --modal-title-size: 24px;

    --modal-close-gap: 20px;
    --modal-close-size: 15px;
  }
}
</style>

<style scoped lang="scss">
@import '~/styles/mixins.scss';

.modal {
  &__content {
    padding: var(--modal-padding);
    width: 100%;
    max-width: var(--modal-max-width-desktop);
    margin: auto;
    background: var(--modal-content-background);
    position: relative;
    border-radius: var(--modal-border-radius);
    pointer-events: all;
  }

  &__title {
    font-weight: 600;
    font-size: var(--modal-title-size);
    line-height: var(--modal-title-line-height);
    color: var(--modal-title-color);
    margin: 0 0 20px;
    padding: 0;
    border: 0;
  }

  &__description {
    font-size: var(--modal-text-size);
    line-height: var(--modal-text-line-height);
    color: var(--modal-text-color);
    order: 1;
    flex-grow: 0;
    margin: var(--modal-description-margin-vertical) 0;
  }

  &__close {
    --action-icon-size: var(--modal-close-size);
    --action-icon-color: var(--modal-close-color);
    position: absolute;
    top: var(--modal-close-gap);
    right: var(--modal-close-gap);
  }

  &__footer {
    margin: var(--modal-footer-margin-top) 0 0;

    @include phones() {
      ::v-deep button {
        width: 100%;

        &:not(:first-of-type) {
          margin-top: 10px;
        }
      }
    }
  }

  &__icon {
    color: var(--modal-icon-color);
    padding-bottom: var(--modal-icon-padding-bottom);
  }
}
</style>
