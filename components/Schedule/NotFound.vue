<template lang='pug'>
  .not-found
    .not-found__img-wrapper
      img.not-found__img(src="~assets/img/schedule/not-found.png")
      img.not-found__img(src="~assets/img/schedule/not-found.png")
      img.not-found__img(src="~assets/img/schedule/not-found.png")

    UiHeadline.not-found__text(tag='h3') Ничего не найдено

</template>

<script>
export default {
  name: 'ScheduleNotFound',
}
</script>

<style scoped lang="scss">
@import "~/styles/mixins.scss";

.not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

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
    --headline-color: var(--main-danger-color);
  }
}
</style>