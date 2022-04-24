<template lang='pug'>
  .speaker-list
    .speaker-list__item(
      v-for="speaker in speakers"
    )
      UiSpeakerItem(
        :speaker='speaker'
      )
</template>

<script>
export default {
  name: 'SpeakerBlock',
  props: {
    speechId: Number,
  },
  computed: {
    speakers() {
      return this.$store.getters['speaker/bySpeechId'](this.speechId)
    },
  },
}
</script>

<style scoped lang='scss'>
@import "~/styles/mixins.scss";

.speaker-list {
  margin: 0 -10px;
  display: flex;
  flex-wrap: wrap;

  &__item {
    padding: 15px 10px;
  }
}
</style>
