<template lang="pug">
  UiModal.speacer__modal(
    name="edit-speaker"
    @beforeOpen="beforeOpen"
  )
    .speaker__content
      UiAvatar.speaker__picture(
        :userName='speaker.name'
        :src='speaker.picture'
        :size='100'
      )
      UiInput.speaker__field(
        v-model='speaker.name'
        placeholder="name"
      )
      UiInput.speaker__field(
        v-model='speaker.login'
        placeholder="login"
      )
      UiInput.speaker__field(
        v-model='speaker.position'
        placeholder="position"
      )
      UiInput.speaker__field(
        v-model='speaker.about'
        placeholder="about"
      )
      UiInput.speaker__field(
        v-model='speaker.company_name'
        placeholder="company name"
      )
      UiSelect.speaker__field(
        v-model='speechId'
        :value='speeches'
        placeholder="speech"
        :searchable="false"
        :options="speeches"
      )
      UiButton.speaker__field(
        :isLoading='isLoading'
        @click="editSpeaker"
      ) Обновить
      UiButton.speaker__field(
        :isLoading='isLoading'
        @click="deleteSpeaker"
      ) Удалить
</template>

<script>
import { ACTIONS } from '~/helpers/socketActions'
import socketIO from "~/mixins/socketIO"

export default {
  name: 'EditSpeaker',
  mixins: [socketIO],
  data() {
    return {
      speaker: {},
      speechId: null,
      isLoading: false,
    }
  },
  mounted() {
    this.socket.on(ACTIONS.EDIT_SPEAKER, (data) => {
      console.log(ACTIONS.EDIT_SPEAKER, data)
      this.$store.commit('speaker/updateSpeaker', data)
    })
    this.socket.on(ACTIONS.DELETE_SPEAKER, (id) => {
      console.log(ACTIONS.DELETE_SPEAKER, id)
      this.$store.commit('speaker/deleteSpeaker', id)
    })
  },
  methods: {
    async editSpeaker() {
      this.isLoading = true
      const data = {
        ...this.speaker,
        speechId: this.speechId.value
      }
      this.socket.emit(ACTIONS.EDIT_SPEAKER, data)
      await this.$store.dispatch('speaker/updateSpeaker', data)
      this.isLoading = false
    },
    async deleteSpeaker() {
      this.isLoading = true
      this.socket.emit(ACTIONS.DELETE_SPEAKER, this.speaker.id)
      await this.$store.dispatch('speaker/deleteSpeaker', this.speaker.id)
      this.isLoading = false
      this.$vfm.hide('edit-speaker')
    },
    beforeOpen(event) {
      const speaker = JSON.parse(JSON.stringify(event.ref.params))
      this.speaker = speaker
      this.speechId = this.speeches.find(speech => speech.value === speaker.speechId)
    },
  },
  computed: {
    speeches() {
      const speeches = this.$store.getters['speech/allSpeeches'].map((speech) => {
        return {
          label: speech.title,
          value: speech.id
        }
      })
      return speeches
    }
  },
}
</script>

<style lang="scss" scoped>
@import '~/styles/mixins.scss';

.speaker {

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  &__picture {
    --picture-border-radius: 100px;
    max-width: 100%;
    max-height: 100px;
  }

  &__field {
    width: 100%;
    margin-top: 20px;

    &:last-child {
      --button-main-color: var(--main-danger-color);
      --main-hover-color: var(--main-danger-color);
      --main-active-color: var(--main-danger-color);
    }
  }
}
</style>
