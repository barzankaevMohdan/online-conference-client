<template lang="pug">
  div
    LayoutsHeader(absolute)
    .reg-content
      .reg-content__left
      .reg-content__right
        .reg-content__form
          h1.reg-content__form-title Регистрация
          AuthRegistrationForm
</template>

<script>

export default {
  name: 'RegistrationStart',
  head() {
    return {
      title: 'Регистрация',
    }
  },
}
</script>

<style scoped lang="scss">
@import '~/styles/mixins.scss';

.reg-content {
  display: flex;
  justify-content: space-between;

  @include tablets() {
    flex-direction: column;
  }

  &__left {
    background-repeat: no-repeat;
    background-position: left;
    background-size: contain;
    background-image: url('../../assets/img/auth/bg.png');
    background-attachment: fixed;
    min-height: 100vh;
    width: 50%;

    @include tablets() {
      background-image: url('~/assets/img/auth/bg-tablets.png');
      background-attachment: scroll;
      background-position: center;
      background-size: cover;
      min-height: 455px;
      width: 100%;
    }

    @include phones() {
      min-height: 200px;
    }
  }

  &__right {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    min-height: 100vh;
    background: var(--main-positive-color);

    @include tablets() {
      width: 100%;
      min-height: auto;
    }
  }

  &__subtitle {
    display: block;
    font-size: 24px;
    line-height: 32px;
    font-weight: 400;
    color: var(--main-light);

    @include phones() {
      font-size: 14px;
      line-height: 20px;
    }
  }

  &__form {
    max-width: 100%;
    width: 350px;
    padding-top: 120px;
    padding-bottom: 120px;

    @include tablets() {
      padding-top: 60px;
      padding-bottom: 100px;
    }

    @include phones() {
      padding: 10px 15px 30px 15px;
      width: 100%;
    }
  }

  &__form-title {
    font-style: normal;
    font-weight: 700;
    font-size: 36px;
    line-height: 48px;
    text-align: center;
    color: var(--main-light);
    margin-bottom: 40px;

    @include tablets() {
      font-size: 24px;
      line-height: 32px;
    }

    @include phones() {
      margin-bottom: 30px;
      font-size: 18px;
      line-height: 24px;
    }
  }
}
</style>
