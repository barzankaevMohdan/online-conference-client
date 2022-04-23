<template lang="pug">
  BlockSchedule.s-program(
    :streams="streamsWithSpeechesAndSpeakers"
    :activeStreamId="activeStreamId"
    @cardButtonClick="cardButtonClick"
    @cardClick='cardClick'
    @hallClick="hallClick"
  )
    template(#title)
      UiHeadline(tag="h2") Программа
</template>

<script>
import streamsWithSpeechesAndSpeakers from '../../mixins/streamsWithSpeechesAndSpeakers'

export default {
  name: 'Program',
  mixins: [streamsWithSpeechesAndSpeakers],
  methods: {
    cardClick(data) {
      this.$vfm.show('speech-modal', data.speech)
    },
    cardButtonClick(data) {
      this.$vfm.show('speech-modal', data.speech)
    },
    hallClick(stream) {
      this.$router.push(`/stream/${stream.id}`)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/styles/mixins.scss';

.s-program {
  padding: var(--main-section-padding-vertical) 0;
  background-color: var(--dark-2);
}
</style>
