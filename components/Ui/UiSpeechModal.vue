<template lang="pug">
  UiModal.speech__modal(:name="name")
    .speech__content(v-if="speech")
      .speech__title {{speech.title}}
      .speech__info
        .speech__time {{speech.time_begin}}-{{speech.time_end}}
        span.speech__dot
        span.speech__status(:class="'speech__status_' + speech.status")
          | {{statusText[speech.status]}}
      .speech__action
        UiButton.speech__btn(
          v-if='speech.status === "done"'
          :disabled="buttonDisabled.done"
          @click="watchSpeech"
        ) {{buttonText[speech.status]}}
        UiButton.speech__btn(
          v-else-if='speech.status === "online"'
          :disabled="buttonDisabled.online"
          @click="watchSpeech"
        ) {{buttonText[speech.status]}}
        UiButton.speech__btn(
          v-else-if='speech.status === "hold" && !isInSchedule'
          :disabled="buttonDisabled.add"
          @click="addToPersonalSchedule"
        ) {{buttonText.add}}
        UiButton.speech__btn(
          v-else-if='speech.status === "hold" && isInSchedule'
          :disabled="buttonDisabled.delete"
          @click="removeFromPersonalSchedule"
        ) {{buttonText.delete}}
      .speech__speakers(v-if='speech.speakers && speech.speakers.length')
        .speech__speakers-title {{speakersWord}}:
        .speech__speakers-list
          .speech__speakers-item(v-for='speaker in speech.speakers' :key="speaker.id")
            UiSpeakerItem(:speaker='speaker')
</template>

<script>

export default {
  name: 'SpeechModal',
  props: {
    name: {
      type: String,
      require: true,
    },
    speech: {
      type: Object,
      default: () => {},
    },
    hall: {
      type: Object,
      default: () => {},
    },
    userSpeechIds: {
      type: Array,
      default: () => [],
    },
    statusText: {
      type: Object,
      default() {
        return {
          online: 'Сейчас в эфире',
          done: 'Завершено',
          hold: 'Не началось',
        }
      },
    },
    speakersText: {
      type: Object,
      default() {
        return {
          speaker: 'Спикер',
          speakers: 'Спикеры',
        }
      },
    },
    buttonText: {
      type: Object,
      default() {
        return {
          done: 'Смотреть запись',
          online: 'Смотреть',
          add: 'Добавить в расписание',
          delete: 'Удалить из расписания',
        }
      },
    },
    buttonDisabled: {
      type: Object,
      default() {
        return {
          done: false,
          online: false,
          add: false,
          delete: false,
        }
      },
    },
  },
  methods: {
    watchSpeech() {
      this.$emit('watchSpeech', this.dataForEmit)
    },
    addToPersonalSchedule() {
      this.$emit('addToPersonalSchedule', this.dataForEmit)
    },
    removeFromPersonalSchedule() {
      this.$emit('removeFromPersonalSchedule', this.dataForEmit)
    },
  },
  computed: {
    dataForEmit() {
      return {
        speech: this.speech ?? '',
        hall: this.hall ?? '',
      }
    },
    isInSchedule() {
      return this.userSpeechIds.includes(this.speech.id)
    },
    speakersWord() {
      return this.speech.speakers?.length > 1 ? this.speakersText.speakers : this.speakersText.speaker
    },
  },
}
</script>

<style lang="scss">
@import '~/styles/mixins.scss';

:root {
  /* Размеры */
  --zeen-speech-modal-padding-top: 60px;
  --zeen-speech-modal-padding-horizon: 50px;
  --zeen-speech-modal-padding-bottom: 50px;
  --zeen-speech-modal-margin-vertical: 0;
  --zeen-speech-modal-title-size: var(--main-large-size);
  --zeen-speech-modal-title-weight: 700;
  --zeen-speech-modal-title-line-height: 1.33;
  --zeen-speech-modal-info-margin-top: 30px;
  --zeen-speech-modal-time-size: var(--main-size);
  --zeen-speech-modal-time-weight: 500;
  --zeen-speech-modal-time-line-height: 1.37;
  --zeen-speech-modal-dot-margin-horizon: 10px;
  --zeen-speech-modal-dot-size: 4px;
  --zeen-speech-modal-dot-radius: 50%;
  --zeen-speech-modal-action-margin-top: 20px;
  --zeen-speech-modal-speakers-margin-top: 30px;
  --zeen-speech-modal-speakers-margin-bottom: 10px;
  --zeen-speech-modal-speakers-item-padding: 10px;

  @include phones {
    --zeen-speech-modal-padding-top: 50px;
    --zeen-speech-modal-padding-horizon: 30px;
    --zeen-speech-modal-padding-bottom: 40px;
  }

  /* Цвета */
  --zeen-speech-modal-status-color-hold: var(--dark-1);
  --zeen-speech-modal-status-color-done: var(--gray-4);
  --zeen-speech-modal-status-color-online: var(--main-danger-color);
  --zeen-speech-modal-speakers-color: var(--gray-4);
  --zeen-speach-speaker-color: var(--gray-4);
}
</style>

<style lang="scss" scoped>
@import '../../styles/mixins.scss';

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
    padding: var(--zeen-speech-modal-speakers-item-padding) 0;
    --speaker-item-post-color: var(--zeen-speach-speaker-color);
  }
}
</style>
