<template lang="pug">
  UiModal.speech__modal(
    name="speech-modal"
    @beforeOpen="beforeOpen"
  )
    .speech__content(v-if="speech")
      .speech__title {{speech.title}}
      .speech__info
        .speech__time {{speech.time_begin}}-{{speech.time_end}}
        span.speech__dot
        span.speech__status(:class="`speech__status_${speech.status}`")
          | {{statusText}}
      .speech__action
        UiButton.speech__btn(
          :disabled="buttonDisabled[speech.status]"
          @click="watchSpeech"
        ) {{buttonText}}
        UiButton.speech__btn(
          v-if='!buttonDisabled.edit'
          @click="edit"
        ) Редактировать
      .speech__speakers(v-if='speech.speakers && speech.speakers.length')
        .speech__speakers-title {{speakersText}}:
        .speech__speakers-list
          .speech__speakers-item(v-for='speaker in speech.speakers' :key="speaker.id")
            UiSpeakerItem(:speaker='speaker')
</template>

<script>

export default {
  name: 'Speech',
  data() {
    return {
      speech: null
    }
  },
  methods: {
    close() {
      this.$vfm.hide('speech-modal')
    },
    edit() {
      this.close()
      this.$vfm.show('edit-speech', this.speech)
    },
    watchSpeech() {
      this.close()
      this.$router.push(`stream/${this.speech.streamId}`)
    },
    beforeOpen(event) {
      const data = event.ref.params
      this.speech = data
    },
  },
  computed: {
    statusText() {
      const text = {
        online: 'Сейчас в эфире',
        done: 'Завершено',
        hold: 'Не началось',
      }
      return text[this.speech.status]
    },
    buttonText() {
      const text = {
        done: 'Трансляция закончилась',
        online: 'Смотреть',
        hold: 'Трансляция не началась',
      }
      return text[this.speech.status]
    },
    buttonDisabled() {
      return {
        done: true,
        online: false,
        hold: true,
        edit: false,
      }
    },
    speakersText() {
      const text = {
        speaker: 'Спикер',
        speakers: 'Спикеры',
      }
      return this.speech.speakers?.length > 1 ? text.speakers : text.speaker
    },
  },
}
</script>

<style lang="scss">
@import '~/styles/mixins.scss';

:root {
  /* Размеры */
  --speech-modal-padding-top: 60px;
  --speech-modal-padding-horizon: 50px;
  --speech-modal-padding-bottom: 50px;
  --speech-modal-margin-vertical: 0;
  --speech-modal-title-size: var(--main-large-size);
  --speech-modal-title-weight: 700;
  --speech-modal-title-line-height: 1.33;
  --speech-modal-info-margin-top: 30px;
  --speech-modal-time-size: 14px;
  --speech-modal-time-weight: 500;
  --speech-modal-time-line-height: 1.37;
  --speech-modal-dot-margin-horizon: 10px;
  --speech-modal-dot-size: 4px;
  --speech-modal-dot-radius: 50%;
  --speech-modal-action-margin-top: 20px;
  --speech-modal-speakers-margin-top: 30px;
  --speech-modal-speakers-margin-bottom: 10px;
  --speech-modal-speakers-item-padding: 10px;

  @include phones {
    --speech-modal-padding-top: 50px;
    --speech-modal-padding-horizon: 30px;
    --speech-modal-padding-bottom: 40px;
  }

  /* Цвета */
  --speech-modal-status-color-hold: var(--gray-2);
  --speech-modal-status-color-done: var(--gray-4);
  --speech-modal-status-color-online: var(--main-danger-color);
  --speech-modal-speakers-color: var(--gray-4);
  --speach-speaker-color: var(--gray-4);
}
</style>

<style lang="scss" scoped>
@import '~/styles/mixins.scss';

.speech {
  &__modal {
    --modal-padding-top: var(--speech-modal-padding-top);
    --modal-padding-horizon: var(--speech-modal-padding-horizon);
    --modal-padding-bottom: var(--speech-modal-padding-bottom);
    --modal-description-margin-vertical: var(--speech-modal-margin-vertical);
  }

  &__title {
    font-weight: var(--speech-modal-title-weight);
    font-size: var(--speech-modal-title-size);
    line-height: var(--speech-modal-title-line-height);
  }

  &__info {
    display: flex;
    align-items: center;
    margin-top: var(--speech-modal-info-margin-top);
  }

  &__time {
    font-weight: var(--speech-modal-time-weight);
    font-size: var(--speech-modal-time-size);
    line-height: var(--speech-modal-time-line-height);
  }

  &__dot {
    margin-left: var(--speech-modal-dot-margin-horizon);
    margin-right: var(--speech-modal-dot-margin-horizon);
    width: var(--speech-modal-dot-size);
    height: var(--speech-modal-dot-size);
    background: var(--speech-modal-status-color-hold);
    border-radius: var(--speech-modal-dot-radius);
  }

  &__status {
    font-weight: var(--speech-modal-time-weight);
    font-size: var(--speech-modal-time-size);
    line-height: var(--speech-modal-time-line-height);
    color: var(--speech-modal-status-color-done);

    &_online {
      color: var(--speech-modal-status-color-online);
    }
    &_done {
      color: var(--speech-modal-status-color-done);
    }
    &_hold {
      color: var(--speech-modal-status-color-hold);
    }
  }

  &__action {
    margin-top: var(--speech-modal-action-margin-top);
  }

  &__btn {
    width: 100%;
    margin-bottom: 20px;
    
    &:last-child {
      margin-bottom: 0;
    }
  }

  &__speakers {
    margin-top: var(--speech-modal-speakers-margin-top);
  }

  &__speakers-title {
    color: var(--speech-modal-speakers-color);
    margin-bottom: var(--speech-modal-speakers-margin-bottom);
    font-weight: var(--speech-modal-time-weight);
    font-size: var(--speech-modal-time-size);
    line-height: var(--speech-modal-time-line-height);
  }

  &__speakers-item {
    padding: var(--speech-modal-speakers-item-padding) 0;
    --speaker-item-post-color: var(--speach-speaker-color);
  }
}
</style>
