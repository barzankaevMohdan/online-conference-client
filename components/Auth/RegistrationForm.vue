<template lang='pug'>
  form.reg-form(
    @submit.prevent='submit'
  )
    UiInput(
      v-model.trim='data.name'
      :error='errors["name"]'
      placeholder="Имя"
    )

    UiInput.reg-form__field(
      v-model.trim='data.last_name'
      :error='errors["last_name"]'
      placeholder='Фамилия'
    )

    UiInput.reg-form__field(
      v-model.trim='data.login'
      :error='errors["login"]'
      placeholder='Ваш e-mail'
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

    .reg-form__footer
      span.reg-form__error(v-if='serverError') {{serverError}}
      UiButton(
        size='parentWidth'
        :isLoading='isLoading'
      ) Регистрация

</template>

<script>

import formsFunctions from '~/mixins/formsFunctions'

export default {
  name: 'RegistrationForm',
  mixins: [formsFunctions],
  data() {
    return {
      typeOfPasswordInput: 'password'
    }
  },
  methods: {
    async componentHandler() {
      const userData = {
        email: this.data.login.toLowerCase().trim(),
        login: this.data.login.toLowerCase().trim(),
        name: `${this.data.name} ${this.data.last_name}`,
        password: this.data.password,
      }

      await this.$store.dispatch('user/registration', userData)
      console.log('succes')
    },
    showPassword() {
      this.typeOfPasswordInput = this.typeOfPasswordInput === 'password' ? 'text' : 'password'
    },
  },
  computed: {
    rules() {
      const baseFieldsRules = {
        name: 'required|min:2',
        last_name: 'required|min:2',
        login: ['required', 'email'],
        password: 'required|min:8|confirmed',
      }
      return baseFieldsRules
    },
    attributeNames() {
      return {
        name: "имя",
        last_name: 'фамилия',
        login: 'e-mail',
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
