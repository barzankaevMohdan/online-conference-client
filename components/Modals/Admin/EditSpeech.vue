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
      .speech__action
        UiTextArea.speech__btn(
          v-model='speech.info'
          type='textArea'
          placeholder="Info"
          :rows='3'
        )
        UiButton.speech__btn(
          :isLoading='isLoading'
          @click="updateSpeech"
        ) Обновить
        UiButton.speech__btn(
          :isLoading='isLoading'
          @click="deleteSpeech"
        ) Удалить
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
    speakersText: {
      type: Object,
      default() {
        return {
          speaker: 'Спикер',
          speakers: 'Спикеры',
        }
      },
    },
  },
  data() {
    return {
      speech: null,
      hall: null,
      status: null,
      isLoading: false,
    }
  },
  computed: {
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
    async updateSpeech() {
      this.isLoading = true
      const data = {
        ...this.speech,
        status: this.status.value
      }
      await this.$store.dispatch('speech/updateSpeech', data)
      this.isLoading = false
    },
    async deleteSpeech() {
      this.isLoading = true
      await this.$store.dispatch('speech/deleteSpeech', this.speech.id)
      this.isLoading = false
    },
    editSpeaker(speaker) {
      this.$vfm.hide('edit-speech')
      this.$vfm.show('edit-speaker', speaker)
    },
    beforeOpen(event) {
      const data = JSON.parse(JSON.stringify(event.ref.params))
      this.speech = data.speech
      this.hall = data.hall
      this.status = this.statuses.find(status => status.value === data.speech.status)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/styles/mixins.scss';

.speech {

  &__info {
    display: flex;
    align-items: center;
    margin-top: var(--zeen-speech-modal-info-margin-top);
  }

  &__dot {
    margin-left: var(--zeen-speech-modal-dot-margin-horizon);
    margin-right: var(--zeen-speech-modal-dot-margin-horizon);
    width: var(--zeen-speech-modal-dot-size);
    height: var(--zeen-speech-modal-dot-size);
    background: var(--zeen-speech-modal-status-color-hold);
    border-radius: var(--zeen-speech-modal-dot-radius);
  }

  &__action {
    margin-top: var(--zeen-speech-modal-action-margin-top);
  }

  &__btn {
    width: 100%;
    margin-bottom: 20px;
    
    &:last-child {
      --button-main-color: var(--main-danger-color);
      --main-hover-color: var(--main-danger-color);
      --main-active-color: var(--main-danger-color);

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
