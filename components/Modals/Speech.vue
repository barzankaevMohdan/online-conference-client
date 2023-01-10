<template lang="pug">
  UiModal.speech(
    name="speech-modal"
    @beforeOpen="beforeOpen"
  )
    template(#title) {{speech.title}}

    .speech__info
      .speech__time {{speech.time_begin}}-{{speech.time_end}}

      span.speech__dot

      span.speech__status(:class="`speech__status_${speech.status}`")
        | {{statusText}}

    .speech__action
      UiButton.speech__btn(
        :disabled="buttonDisabled[speech.status]"
        @click.prevent='watchSpeech(speech)'
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
import watchSpeech from '~/mixins/watchSpeech'

export default {
  name: 'Speech',
  mixins: [watchSpeech],
  data() {
    return {
      speech: {}
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
  --speech-modal-info-margin-top: 30px;
  --speech-modal-time-size: 14px;
  --speech-modal-dot-margin: 10px;
  --speech-modal-dot-size: 4px;
  --speech-modal-action-margin-top: 20px;
  --speech-modal-speakers-margin-top: 30px;
  --speech-modal-speakers-item-padding: 10px;

  /* Цвета */
  --speech-modal-status-color-hold: var(--gray-2);
  --speech-modal-status-color-done: var(--gray-4);
  --speech-modal-status-color-online: var(--main-danger-color);
  --speech-modal-speakers-color: var(--gray-2);
}
</style>

<style lang="scss" scoped>
@import '~/styles/mixins.scss';

.speech {
  --modal-description-margin-vertical: 0;

  &__info {
    display: flex;
    align-items: center;
    margin-top: var(--speech-modal-info-margin-top);
  }

  &__time {
    font-weight: 500;
    font-size: var(--speech-modal-time-size);
    line-height: 1.37;
  }

  &__dot {
    margin-left: var(--speech-modal-dot-margin);
    margin-right: var(--speech-modal-dot-margin);
    width: var(--speech-modal-dot-size);
    height: var(--speech-modal-dot-size);
    background: var(--speech-modal-status-color-hold);
    border-radius: 50%;
  }

  &__status {
    font-weight: 500;
    font-size: var(--speech-modal-time-size);
    line-height: 1.37;
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
    font-weight: 500;
    font-size: var(--speech-modal-time-size);
    line-height: 1.37;
  }

  &__speakers-item {
    padding: var(--speech-modal-speakers-item-padding) 0;
  }
}
</style>
