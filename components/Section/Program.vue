<template lang="pug">
  BlockSchedule.s-program(
    :streams="streamsDayWithSpeechesAndSpeakers"
    :activeStreamId="activeStreamId"
    :speechModalProps="speechModalProps"
    @cardButtonClick="cardButtonClick"
    @hallClick="hallClick"
    @watchSpeech="watchSpeechModal"
    @edit="edit"
  )
    template(#title)
      UiHeadline(tag="h2") Программа
</template>

<script>
import streamsWithSpeechesAndSpeakers from '../../mixins/streamsWithSpeechesAndSpeakers'

export default {
  name: 'Program',
  mixins: [streamsWithSpeechesAndSpeakers],
  data() {
    return {
      speechModalProps: {
        buttonDisabled: {
          done: true,
          online: true,
          add: true,
          delete: true,
          edit: false,
        },
      },
    }
  },
  methods: {
    cardButtonClick(data) {
      // this.watchSpeech(data.speech)
      this.$vfm.hide('ZeenSchedule')
    },
    hallClick(stream) {
      this.$router.push(`/stream/${stream.id}`)
    },
    watchSpeechModal(data) {
      // this.watchSpeech(data.speech)
      this.$vfm.hide('ZeenSchedule')
    },
    edit(data) {
      console.log(data)
      this.$vfm.hide('ZeenSchedule')
      this.$vfm.show('edit-speech', data)
    }
  },
}
</script>

<style lang="scss" scoped>
@import '~/styles/mixins.scss';

.s-program {
  padding: var(--main-section-padding-vertical) 0;
  background-color: #000;
}
</style>
