import {gsap} from 'gsap/dist/gsap'
import {ScrollToPlugin} from 'gsap/dist/ScrollToPlugin'

gsap.registerPlugin(ScrollToPlugin)

export default {
  methods: {
    async watchSpeech(speech) {
      this.$vfm.hide('speech-modal')
      await this.$router.push({path: `/stream/${speech.streamId}`, replace: false})
      setTimeout(() => {this.scroll()}, 0)
    },
    scroll() {
      gsap.to(window, {
        duration: 0.5,
        scrollTo: '#player',
      })
    }
  },
}
