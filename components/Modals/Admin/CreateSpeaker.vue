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
        :error='errors["login"]'
      )
      UiInput.auth-form__field(
        v-model.trim='data.company_name'
        placeholder="companyName"
        :error='errors["company_name"]'
      )
      UiInput.auth-form__field(
        v-model.trim='data.name'
        placeholder="name"
        :error='errors["name"]'
      )
      UiInput.auth-form__field(
        v-model.trim='data.position'
        placeholder="position"
        :error='errors["position"]'
      )
      UiInput.auth-form__field(
        v-model.trim='data.about'
        placeholder="about"
        :error='errors["about"]'
      )
      UiSelect.auth-form__field.auth-form__select(
        v-model='data.speechId'
        placeholder="speechId"
        :options="speechIds"
        :error='errors["speechId"]'
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
      data: {
        speechId: null,
      },
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
        speechId: this.data.speechId.value,
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
    },
    rules() {
      const baseFieldsRules = {
        login: 'required|min:2',
        company_name: 'required',
        name: 'required|min:2',
        position: 'required|min:2',
        about: 'required|min:2',
        speechId: 'required',
      }
      return baseFieldsRules
    },
  },
}
</script>

<style scoped lang='scss'>
@import "~/styles/mixins.scss";

.auth-form {
  &__field {
    margin-top: 20px;
  }

  &__footer {
    margin-top: 30px;
  }

  &__error {
    display: block;
    font-size: var(--main-input-label-size);
    line-height: 1.4;
    color: var(--main-danger-color);
    margin: var(--main-input-label-offset-top) 0 0 var(--main-input-label-offset-left);
  }

  &_select {
    margin-bottom: 50px;
  }
}
</style>