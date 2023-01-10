<template lang='pug'>
  form.reg-form(
    @submit.prevent='submit'
  )
    UiInput.reg-form__field(
      v-model.trim='data.password'
      :error='errors["password"]'
      :type='typeOfPasswordInput'
      placeholder="Пароль"
    )
      template(#btn)
        button.reg-form__button-eye(
          @click.prevent="showPassword"
        )
          SvgIcon.reg-form__eye-icon(name="eye-icon")

    UiInput.reg-form__field(
      v-model.trim='data.password_confirmation'
      :error='errors["password_confirmation"]'
      :type='typeOfPasswordInput'
      placeholder="Повторите пароль"
    )
      template(#btn)
        button.reg-form__button-eye(
          @click.prevent="showPassword"
        )
          SvgIcon.reg-form__eye-icon(name="eye-icon")

    span.reg-form__error(v-if='serverError') {{serverError}}

    .reg-form__footer
      UiButton(
        size='parentWidth'
        :isLoading='isLoading'
      ) Обновить пароль

</template>

<script>
import formsFunctions from '~/mixins/formsFunctions'

export default {
  name: 'RecoveryForm',
  mixins: [formsFunctions],
  data() {
    return {
      typeOfPasswordInput: 'password'
    }
  },
  methods: {
    // login functions
    async componentHandler() {
      const link = this.$route.params.id
      const data = {
        link,
        password: this.data.password
      }
      await this.$store.dispatch('user/recovery', data)
      this.$router.push('/')
    },
    showPassword() {
      this.typeOfPasswordInput = this.typeOfPasswordInput === 'password' ? 'text' : 'password'
    },
  },
  computed: {
    rules() {
      const baseFieldsRules = {
        password: 'required|min:8|confirmed',
      }
      return baseFieldsRules
    },
    attributeNames() {
      return {
        password: 'пароль',
      }
    },
  },
}
</script>

<style scoped lang='scss'>
@import "~/styles/mixins.scss";

.reg-form {
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

  &__button-eye {
    max-width: 26px;
    max-height: 20px;
    border: 0;
    padding: 0;
    background: transparent;
    cursor: pointer;
    outline: none;
  }

  &__eye-icon {
    max-width: 26px;
    max-height: 20px;
    fill: var(--main-light);
  }
}
</style>
