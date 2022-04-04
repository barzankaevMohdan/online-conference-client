<template lang="pug">
  UiModal.speech__modal(
    name="edit-speech"
    @beforeOpen="beforeOpen"
  )
    .speech__content(v-if="speech")
      UiInput.speech__title(
        v-model='speech.title'
        placeholder="Title"
      )
      .speech__info
        UiInput.speech__time(
          v-model='speech.time_begin'
          type="time"
          placeholder="time-begin"
        )
        UiInput.speech__time(
          v-model='speech.time_end'
          type="time"
          placeholder="time-end"
        )
        span.speech__dot
        UiSelect.speech__status(
          v-model='status'
          :searchable="false"
          :options="statuses"
          placeholder="status"
        )
        //- span.speech__status(:class="'speech__status_' + speech.status")
        //-   | {{statusText[speech.status]}}
      .speech__action
      .speech__speakers(v-if='speech.speakers && speech.speakers.length')
        .speech__speakers-title {{speakersWord}}:
        .speech__speakers-list
          .speech__speakers-item(v-for='speaker in speech.speakers' :key="speaker.id")
            UiSpeakerItem(:speaker='speaker')
            UiButton.speech__speakers-btn(@click='editSpeaker(speaker)') Редактировать
</template>

<script>

export default {
  name: 'EditSpeech',
  props: {
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
          edit: 'Редактировать'
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
          edit: false,
        }
      },
    },
  },
  data() {
    return {
      speech: null,
      hall: null,
      status: null,
    }
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
    statuses() {
      return [
        {
          label: 'online',
          value: 'online'
        },
        {
          label: 'hold',
          value: 'hold'
        },
        {
          label: 'done',
          value: 'done'
        },
      ]
    }
  },
  methods: {
    editSpeaker(speaker) {
      this.$vfm.hide('edit-speech')
      this.$vfm.show('edit-speaker', speaker)
    },
    beforeOpen(event) {
      const data = JSON.stringify(event.ref.params) !== '{}' ? event.ref.params || '' : ''
      this.speech = data.speech
      this.hall = data.hall
    },
    edit() {
      this.$emit('edit', this.dataForEmit)
    },
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
