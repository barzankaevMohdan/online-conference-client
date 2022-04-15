<template>
  <div>
    <div class="over-observer" ref="over">

      <div
        :class="{
          'over': !mini,
          'over__mini': mini,
          'over__mini_aspect_ratio_4_3': aspectRatio === '4:3',
          'over__mini_aspect_ratio_1_1': aspectRatio === '1:1',
        }"
        :style="{
          '--over-mini-bottom': margin + 'px',
          '--over-mini-left': margin + 'px',
        }"
        @mousedown="move($event)"
        data-over="mini"
      >
        <UiActionIcon
          v-if="mini && !icon"
          :class="['over__button', {
            'over__button_left': buttonLeft,
          }]"
          @click.stop="toIcon"
          size="big"
        >
          <SvgIcon name="arrow" />
        </UiActionIcon>
        <div class="over__slot" :style="{'pointer-events': mini ? 'none' : ''}">
          <slot></slot>
        </div>
      </div>
    </div>

    <div class="over__icon" v-show="icon" @click="toIcon"></div>
  </div>
</template>

<script>

export default {
  name: 'UiOverMini',
  props: {
    isActive: {
      type: Boolean,
      default: true,
    },
    drag: {
      type: Boolean,
      default: true,
    },
    margin: {
      type: Number,
      default: 15,
    },
    aspectRatio: {
      type: String,
      default: '16:9',
      validator: (ratio) => ['16:9', '4:3', '1:1'].includes(ratio),
    },
  },
  data() {
    return {
      mini: false,
      icon: false,
      observer: null,
      buttonLeft: false,
    }
  },
  mounted() {
    if(this.isActive) {
      this.observerFunc()
    }
  },
  destroyed() {
    delete this.observerFunc
    delete this.observer
  },
  methods: {
    observerFunc() {
      const observerOptions = {
        root: null,
        rootMargin: '0% 0% 1000% 0%',
        threshold: 0,
      }
      const observerCall = (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            this.mini = true
            this.icon = false
            this.$emit('mini-active', this.mini)
          } else if (entry.isIntersecting) {
            this.mini = false
            this.icon = false
            this.$emit('mini-disabled', this.mini)
          }
        })
      }
      this.observer = new IntersectionObserver(observerCall, observerOptions)
      this.observer.observe(this.$refs.over)
    },
    toIcon() {
      if (!this.icon) {
        this.icon = true
        this.mini = false
      } else {
        this.icon = false
        this.mini = true
      }
    },
    move(event) {
      if (this.drag && this.mini) {
        const target = event.target
        const offsetX = event.offsetX
        const offsetY = event.offsetY
        const coords = target.getBoundingClientRect()
        const maxHorizontal = document.documentElement.clientWidth - coords.width - this.margin
        const maxVertical = document.documentElement.clientHeight - coords.height - this.margin
        const iconWidth = target.children[0]?.clientWidth
        let deltaX
        let deltaY
        document.onmousemove = (e) => {
          if (target.dataset.over === 'mini') {
            deltaX = e.clientX - offsetX
            deltaY = e.clientY - offsetY
            if (
              deltaX >= this.margin &&
              deltaX <= maxHorizontal
            ) {
              target.style.left = deltaX + 'px'
            }
            if (
              deltaY >= this.margin &&
              deltaY <= maxVertical
            ) {
              target.style.top = deltaY + 'px'
              target.style.bottom = 'auto'
            }
            if (deltaX >= maxHorizontal - iconWidth) {
              this.buttonLeft = true
            } else {
              this.buttonLeft = false
            }
          }
        }
        document.onmouseup = () => {
          document.onmousemove = null
          document.onmouseup = null
        }
      }
    },
  },
}
</script>

<style lang="scss">
:root {
  /* Размеры */
  --over-width: 100%;
  --over-icon-size: 20px;
  --over-icon-border-radius: 4px;
  --over-button-size: var(--over-icon-size);
  --over-mini-width: 350px;

  /* Позиция */
  --over-icon-bottom: 30px;
  --over-icon-left: 30px;
  --over-button-rigth: -50px;
  --over-button-left: -50px;

  /* Цвета */
  --over-background: var(--main-color);
}
</style>

<style lang="scss" scoped>
@import "~/styles/mixins.scss";

.over {
  position: absolute;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  width: 100%;
  height: 100%;
  background: var(--over-background);

  &-observer {
    position: relative;
    display: flex;
    width: var(--over-width);
    &::after {
      content: '';
      display: block;
      width: 100%;
      padding-top: 56.25%;
    }
  }

  &__icon {
    width: var(--over-icon-size);
    height: var(--over-icon-size);
    position: fixed;
    top: auto;
    bottom: var(--over-icon-bottom);
    left: var(--over-icon-left);
    z-index: 1000;
    background: var(--over-background);
    border-radius: var(--over-icon-border-radius);
    cursor: pointer;
  }

  &__mini {
    display: flex;
    background: var(--over-background);
    width: var(--over-mini-width);
    height: auto;
    position: fixed;
    top: auto;
    right: auto;
    cursor: grab;
    bottom: var(--over-mini-bottom);
    left: var(--over-mini-left);
    z-index: 1000;

    @include tablets {
      display: none;
    }

    &::after {
      content: '';
      padding-top: 56.25%;
    }

    &_aspect_ratio_4_3 {
      &::after {
        padding-top: 75%;
      }
    }

    &_aspect_ratio_1_1 {
      &::after {
        padding-top: 100%;
      }
    }
  }

  &__slot {
    display: flex;
    width: 100%;
  }

  &__button {
    position: absolute;
    top: 0;
    right: var(--over-button-rigth);

    svg {
      max-height: 25px;
    }

    &_left {
      left: var(--over-button-left);
    }
  }
}
</style>
