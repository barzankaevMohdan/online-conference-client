<template lang='pug'>
  NavigationLinkBase(@click="scrollToBase" :theme='theme')
    slot

</template>

<script>
import {gsap} from 'gsap/dist/gsap'
import {ScrollToPlugin} from 'gsap/dist/ScrollToPlugin'

gsap.registerPlugin(ScrollToPlugin)

export default {
  name: 'Scroll',
  props: {
    scrollTo: [String, Object],
    routTo: [String, Object],
    theme: String,
  },
  methods: {
    async scrollToBase() {
      this.$emit('scroll')
      if (this.routTo) {
        await this.$router.push(this.routTo)
      }
      setTimeout(() => {this.scroll()}, 0)
    },
    scroll() {
      gsap.to(window, {
        duration: 1,
        scrollTo: this.scrollTo,
      })
    }
  },
}
</script>
