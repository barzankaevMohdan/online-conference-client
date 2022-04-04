<template lang="pug">
  UiModal.speech__modal(
    name="edit-speaker"
    @beforeOpen="beforeOpen"
  )
    .speech__speakers
      .speech__speakers-list
        .speech__speakers-item
        UiSpeakerItem(:speaker='speaker')
</template>

<script>

export default {
  name: 'EditSpeaker',
  data() {
    return {
      speaker: {
        name: null,
        about: null,
        post: null,
      },
    }
  },
  methods: {
    beforeOpen(event) {
      const speaker = JSON.stringify(event.ref.params) !== '{}' ? event.ref.params || '' : ''
      this.speaker = speaker
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/styles/mixins.scss';

.speech {
  &__modal {
    --modal-padding-top: var(--zeen-speech-modal-padding-top);
    --modal-padding-horizon: var(--zeen-speech-modal-padding-horizon);
    --modal-padding-bottom: var(--zeen-speech-modal-padding-bottom);
    --modal-description-margin-vertical: var(--zeen-speech-modal-margin-vertical);
  }

  &__title {
    font-weight: var(--zeen-speech-modal-title-weight);
    font-size: var(--zeen-speech-modal-title-size);
    line-height: var(--zeen-speech-modal-title-line-height);
  }

  &__info {
    display: flex;
    align-items: center;
    margin-top: var(--zeen-speech-modal-info-margin-top);
  }

  &__time {
    font-weight: var(--zeen-speech-modal-time-weight);
    font-size: var(--zeen-speech-modal-time-size);
    line-height: var(--zeen-speech-modal-time-line-height);
  }

  &__dot {
    margin-left: var(--zeen-speech-modal-dot-margin-horizon);
    margin-right: var(--zeen-speech-modal-dot-margin-horizon);
    width: var(--zeen-speech-modal-dot-size);
    height: var(--zeen-speech-modal-dot-size);
    background: var(--zeen-speech-modal-status-color-hold);
    border-radius: var(--zeen-speech-modal-dot-radius);
  }

  &__status {
    font-weight: var(--zeen-speech-modal-time-weight);
    font-size: var(--zeen-speech-modal-time-size);
    line-height: var(--zeen-speech-modal-time-line-height);
    color: var(--zeen-speech-modal-status-color-done);

    &_online {
      color: var(--zeen-speech-modal-status-color-online);
    }
    &_done {
      color: var(--zeen-speech-modal-status-color-done);
    }
    &_hold {
      color: var(--zeen-speech-modal-status-color-hold);
    }
  }

  &__action {
    margin-top: var(--zeen-speech-modal-action-margin-top);
  }

  &__btn {
    width: 100%;
    margin-bottom: 20px;
    
    &:last-child {
      margin-bottom: 0;
    }
  }

  &__speakers {
    margin-top: var(--zeen-speech-modal-speakers-margin-top);
  }

  &__speakers-title {
    color: var(--zeen-speech-modal-speakers-color);
    margin-bottom: var(--zeen-speech-modal-speakers-margin-bottom);
    font-weight: var(--zeen-speech-modal-time-weight);
    font-size: var(--zeen-speech-modal-time-size);
    line-height: var(--zeen-speech-modal-time-line-height);
  }

  &__speakers-item {
    display: flex;
    justify-content: space-between;
    padding: var(--zeen-speech-modal-speakers-item-padding) 0;
    --speaker-item-post-color: var(--zeen-speach-speaker-color);
  }

  &__speakers-btn {
    --button-padding-horizontal: 15px;
    --button-padding-vertical: 10px;
    --button-font-size: 14px;
    
    margin-left: 15px;
  }
}
</style>
