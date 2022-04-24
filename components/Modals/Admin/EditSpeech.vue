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
        UiSelect.speech__status(
          v-model='status'
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
          @click="editSpeech"
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
import { ACTIONS } from '~/helpers/socketActions'
import socketIO from "~/mixins/socketIO"

export default {
  name: 'EditSpeech',
  mixins: [socketIO],
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
      status: null,
      isLoading: false,
    }
  },
  mounted() {
    this.socket.on(ACTIONS.EDIT_SPEECH, (data) => {
      console.log(ACTIONS.EDIT_SPEECH, data)
      this.$store.commit('speech/updateSpeech', data)
    })
    this.socket.on(ACTIONS.DELETE_SPEECH, (id) => {
      console.log(ACTIONS.DELETE_SPEECH, id)
      this.$store.commit('speech/deleteSpeech', id)
    })
  },
  methods: {
    close() {
      this.$vfm.hide('edit-speech')
    },
    async editSpeech() {
      this.isLoading = true
      const data = {
        ...this.speech,
        status: this.status.value
      }
      this.socket.emit(ACTIONS.EDIT_SPEECH, data)
      await this.$store.dispatch('speech/updateSpeech', data)
      this.isLoading = false
    },
    async deleteSpeech() {
      this.isLoading = true
      this.socket.emit(ACTIONS.DELETE_SPEECH, this.speech.id)
      await this.$store.dispatch('speech/deleteSpeech', this.speech.id)
      this.isLoading = false
      this.close()
    },
    editSpeaker(speaker) {
      this.close()
      this.$vfm.show('edit-speaker', speaker)
    },
    beforeOpen(event) {
      const data = JSON.parse(JSON.stringify(event.ref.params))
      this.speech = data
      this.status = this.statuses.find(status => status.value === data.status)
    },
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
}
</script>

<style lang="scss" scoped>
@import '~/styles/mixins.scss';

.speech {

  &__info {
    display: flex;
    align-items: center;
    margin-top: var(--speech-modal-info-margin-top);

    @include phones() {
      flex-direction: column;
    }
  }

  &__time {
    @include phones() {
      width: 100%;
      margin-bottom: 5px;
    }
  }

  &__status {
    margin-left: 20px;
    @include phones() {
      margin-left: 0;
      width: 100%;
    }
  }

  &__action {
    margin-top: var(--speech-modal-action-margin-top);
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
    display: flex;
    justify-content: space-between;
    padding: var(--speech-modal-speakers-item-padding) 0;

    @include phones() {
      justify-content: flex-start;
      flex-direction: column;
    }
  }

  &__speakers-btn {
    --button-padding-horizontal: 15px;
    --button-padding-vertical: 10px;
    --button-font-size: 14px;
    
    margin-left: 15px;

    @include phones() {
      margin-left: 0;
      margin-top: 10px;
    }
  }
}
</style>
