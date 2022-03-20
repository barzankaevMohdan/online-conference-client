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
    .auth-form__footer
      span.auth-form__error(v-if='serverError') {{serverError}}
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
      this.$vfm.show('password-forgot', this.data.login)
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
