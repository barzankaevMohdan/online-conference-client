<template lang='pug'>
  UiModal(
    name='create-speaker'
  )
    form.auth-form(
      @submit.prevent='submit'
    )
      UiInput.auth-form__field(
        v-model.trim='data.login'
        placeholder="login"
      )
      UiInput.auth-form__field(
        v-model.trim='data.company_name'
        placeholder="companyName"
      )
      UiInput.auth-form__field(
        v-model.trim='data.name'
        placeholder="name"
      )
      UiInput.auth-form__field(
        v-model.trim='data.position'
        placeholder="position"
      )
      UiInput.auth-form__field(
        v-model.trim='data.about'
        placeholder="about"
      )
      UiSelect.auth-form__field.select(
        v-model='speechId'
        :value='speechIds'
        placeholder="speechId"
        :searchable="false"
        :options="speechIds"
      )
      .auth-form__footer
        UiButton(
          size='parentWidth'
          :isLoading='isLoading'
        ) Создать
  </template>

<script>
import { ACTIONS } from '~/helpers/socketActions'
import socketIO from "~/mixins/socketIO"
import formsFunctions from '~/mixins/formsFunctions'

export default {
  name: 'CreateSpeaker',
  mixins: [formsFunctions, socketIO],
  data() {
    return {
      speechId: null,
    }
  },
  mounted() {
    this.socket.on(ACTIONS.EDIT_SPEAKER, (data) => {
      this.$store.commit('speaker/updateSpeaker', data)
    })
  },
  methods: {
    async componentHandler() {
      const data = {
        ...this.data,
        speechId: this.speechId.value,
      }
      await this.$store.dispatch('speaker/createSpeaker', data).then(data => {
        this.socket.emit(ACTIONS.EDIT_SPEAKER, data)
      })
      this.isLoading = false
    }
  },
  computed: {
    speechIds() {
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

<style scoped lang='scss'>
@import "~/styles/mixins.scss";

.auth-form {

  &__field {
    margin-top: 20px;
  }

  .select {
    margin-bottom: 50px;
  }

  &__footer {
    margin-top: 30px;
  }

  &__error {
    display: block;
    font-size: 10px;
    line-height: 14px;
    color: var(--main-danger-color);
    margin: 0 0 25px 25px;
  }
}

</style>
