<template>
  <component
    :style='style'
    ref="container"
    :is="tag"
    @transitionend='handleTransition'
  >
    <slot/>
  </component>
</template>

<script>
export default {
  name: 'UiSlideToggle',
  props: {
    open: Boolean,
    duration: {
      type: Number,
      default: 500,
    },
    tag: {
      type: String,
      default: 'div',
    },
  },
  data () {
    return {
      scrollHeight: 0,
      doneOpenTransition: false,
      innerOpen: this.open,
    }
  },
  mounted () {
    window.addEventListener('resize', this.getHeight)
    this.getHeight()
  },
  updated () {
    this.getHeight()
  },
  destroyed () {
    window.removeEventListener('resize', this.getHeight)
  },
  methods: {
    getHeight () {
      const { container } = this.$refs
      this.scrollHeight = container.scrollHeight
    },
    handleTransition () {
      if (this.innerOpen) {
        this.doneOpenTransition = true;
      }
    }
  },
  computed: {
    style () {
      if (this.innerOpen && this.doneOpenTransition) return null;

      const heightSize = this.innerOpen ? this.scrollHeight+1 : 0

      return {
        overflow: 'hidden',
        transitionProperty: 'height',
        height: `${heightSize}px`,
        transitionDuration: `${this.duration}ms`,
      }
    },
  },
  watch: {
    open(bool) {
      if (!bool) {
        this.getHeight()
        this.doneOpenTransition = false;
        this.$nextTick().then(() => {
          this.innerOpen = false;
        })
      } else {
        this.innerOpen = true;
      }
    }
  },
}
</script>
