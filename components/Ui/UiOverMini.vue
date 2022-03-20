<template>
  <div>
    <div class="zeen-over-observer" ref="zeenOver">

      <div
        :class="{
          'zeen-over': !mini,
          'zeen-over__mini': mini,
          'zeen-over__mini_aspect_ratio_4_3': aspectRatio === '4:3',
          'zeen-over__mini_aspect_ratio_1_1': aspectRatio === '1:1',
        }"
        :style="{
          '--zeen-over-mini-bottom': margin + 'px',
          '--zeen-over-mini-left': margin + 'px',
        }"
        @mousedown="move($event)"
        data-zeen-over="mini"
      >
        <UiActionIcon
          :class="['zeen-over__button', {
            'zeen-over__button_left': buttonLeft,
          }]"
          @click.stop="toIcon"
          size="big"
        >
          <SvgIcon name="arrow" />
        </UiActionIcon>
        <div class="zeen-over__slot" :style="{'pointer-events': mini ? 'none' : ''}">
          <slot></slot>
        </div>
      </div>
    </div>

    <div class="zeen-over__icon" v-show="icon" @click="toIcon"></div>
  </div>
</template>

<script>
import UiActionIcon from   './UiActionIcon'

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
  components: {UiActionIcon},
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
      this.observer.observe(this.$refs.zeenOver)
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
          if (target.dataset.zeenOver === 'mini') {
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
  --zeen-over-width: 100%;
  --zeen-over-icon-size: 20px;
  --zeen-over-icon-border-radius: 4px;
  --zeen-over-button-size: var(--zeen-over-icon-size);
  --zeen-over-mini-width: 350px;

  /* Позиция */
  --zeen-over-icon-bottom: 30px;
  --zeen-over-icon-left: 30px;
  --zeen-over-button-rigth: -50px;
  --zeen-over-button-left: -50px;

  /* Цвета */
  --zeen-over-background: var(--main-color);
}
</style>

<style lang="scss" scoped>
@import "~/styles/mixins.scss";

.zeen-over {
  position: absolute;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  width: 100%;
  height: 100%;
  background: var(--zeen-over-background);

  &-observer {
    position: relative;
    display: flex;
    width: var(--zeen-over-width);
    &::after {
      content: '';
      display: block;
      width: 100%;
      padding-top: 56.25%;
    }
  }

  &__icon {
    width: var(--zeen-over-icon-size);
    height: var(--zeen-over-icon-size);
    position: fixed;
    top: auto;
    bottom: var(--zeen-over-icon-bottom);
    left: var(--zeen-over-icon-left);
    z-index: 1000;
    background: var(--zeen-over-background);
    border-radius: var(--zeen-over-icon-border-radius);
    cursor: pointer;
  }

  &__mini {
    display: flex;
    background: var(--zeen-over-background);
    width: var(--zeen-over-mini-width);
    height: auto;
    position: fixed;
    top: auto;
    right: auto;
    cursor: grab;
    bottom: var(--zeen-over-mini-bottom);
    left: var(--zeen-over-mini-left);
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
    right: var(--zeen-over-button-rigth);

    svg {
      max-height: 25px;
    }

    &_left {
      left: var(--zeen-over-button-left);
    }
  }
}
</style>
