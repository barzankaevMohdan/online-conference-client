<template lang='pug'>
  .speaker-list
    .speaker-list__item(
      v-for="speaker in speakers"
    )
      UiSpeakerItem(
       class='speaker-list__speaker'
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
      return this.$store.getters['speaker/byId'](this.speechId)
    },
  },
}
</script>

<style scoped lang='scss'>
@import "~/styles/mixins.scss";

.speaker-list {
  --speaker-item-post-color: var(--gray-2);
  --speaker-item-company-color: var(--main-light);

  margin: 0 -10px;
  display: flex;
  flex-wrap: wrap;

  &__item {
    padding: 15px 10px;

    ::v-deep {
      .speaker-item__company {
        -webkit-line-clamp: 2;
      }
    }
  }
}
</style>
