<template lang='pug'>
  form.auth-form(
    @submit.prevent='submit'
  )
    UiInput(
      v-model.trim='data.login'
      :error='errors["login"]'
      placeholder="Логин"
    )
    UiInput.auth-form__field(
      v-model.trim='data.password'
      type="password"
      :error='errors["password"]'
      placeholder="Пароль"
    )
    span.auth-form__error(v-if='serverError') {{serverError}}
    .auth-form__footer
      UiButton(
        size='parentWidth'
        :isLoading='isLoading'
      ) Войти
      UiButton(
        size='parentWidth'
        theme='fill-additional'
        @click.prevent='forgotYourPassword'
      ) Напомнить пароль
</template>

<script>
import formsFunctions from '../../mixins/formsFunctions'

export default {
  name: 'LoginForm',
  mixins: [formsFunctions],
  methods: {
    // login functions
    async componentHandler() {
      const data = {
        ...this.data,
      }

      await this.$store.dispatch('user/logIn', data)

      this.$vfm.hide('authenticate')
    },
    forgotYourPassword() {
      this.$vfm.show('password-forgot', this.data.login) // to do
    },
  },
  computed: {
    rules() {
      return {
        login: 'required|email',
        password: 'required|min:6',
      }
    },
    attributeNames() {
      return {
        login: 'логин',
        password: 'пароль',
      }
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
}
</style>
