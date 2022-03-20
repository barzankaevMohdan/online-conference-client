<template lang='pug'>
  form.auth-form(
    @submit.prevent='submit'
  )
    UiInput.auth-form__field(
      v-model.trim='data.login'
      placeholder="login"
    )
    UiInput.auth-form__field(
      v-model.trim='data.companyName'
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
import formsFunctions from '../../mixins/formsFunctions'

export default {
  name: 'SpeakerCreateForm',
  mixins: [formsFunctions],
  data() {
    return {
      speechId: null,
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
  methods: {
    async componentHandler() {
      const data = {
        ...this.data,
        speechId: this.speechId.value,
      }
      await this.$store.dispatch('speaker/createSpeaker', data)
      this.isLoading = false
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
    margin-bottom: 40px;
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

.not-now {
  text-align: center;
}
</style>
