<template lang="pug">
  LayoutsPageWithHeader
    .reg-content
      .reg-content__left
        img.reg-content__left__logo(src='~/assets/img/auth/logo.svg')

      .reg-content__right
        .reg-content__form
          UiHeadline.reg-content__form-title(tag='h3') Регистрация

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
  flex: 1 1 auto;
  display: flex;
  justify-content: space-between;

  @include tablets() {
    flex-direction: column;
  }

  &__left {
    position: relative;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-image: url('~/assets/img/auth/bg.png');
    width: 50%;

    @include tablets() {
      height: 455px;
      width: 100%;
    }

    @include phones() {
      height: 300px;
    }

    &__logo {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 353px;
      height: 384px;

      @include tablets() {
        width: 195px;
        height: 212px;
      }
    }
  }

  &__right {
    flex: 1 1 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    background: var(--main-positive-color);

    @include tablets() {
      align-items: flex-start;
      width: 100%;
    }
  }

  &__form {
    max-width: 350px;
    width: 100%;
    padding: 50px 15px;
  }

  &__form-title {
    text-align: center;
    margin-bottom: 40px;

    @include phones() {
      margin-bottom: 30px;
    }
  }
}
</style>
