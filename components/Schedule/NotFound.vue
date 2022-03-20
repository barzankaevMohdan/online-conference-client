<template lang='pug'>
  .not-found
    LayoutsContainer
      .not-found__content
        .not-found__img-wrapper
          img.not-found__img(src="~assets/img/schedule/not-found.png")
          img.not-found__img(src="~assets/img/schedule/not-found.png")
          img.not-found__img(src="~assets/img/schedule/not-found.png")
        p.not-found__text Ничего не найдено
</template>

<script>
export default {
  name: 'ScheduleNotFound',
}
</script>

<style scoped lang="scss">
@import "~/styles/mixins.scss";

.not-found {
  padding-top: 80px;
  padding-bottom: 80px;
  background: #000;

  &__content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  &__img-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    @include phones() {
      margin-bottom: 20px;
    }
  }

  &__img {
    max-width: 50px;
    margin-right: 30px;
    &:last-child {
      margin-right: 0;
    }
    @include phones() {
      max-width: 35px;
    }
  }

  &__text {
    margin: 0;
    padding: 0;
    font-style: normal;
    font-weight: bold;
    font-size: 36px;
    line-height: 48px;
    color: #FF4D4D;
    @include phones() {
      font-size: 26px;
    }
  }
}
</style>