<template lang='pug'>
  nav.nav
    .nav__list
      .nav__item
        NavigationOnline Сейчас онлайн
      .nav__item
        NavigationLink(to='/schedule' :theme='theme') Программа
      .nav__item
        NavigationLink(to='/admin' :theme='theme') Панель Админа
      .nav__item
        NavigationScroll(scrollTo='#faq' routTo='/' :theme='theme') Faq
</template>

<script>
export default {
  name: 'Navigation',
  props: {
    theme: {
      type: String,
      default: '',
    },
  },
}
</script>

<style scoped lang='scss'>
@import "~/styles/mixins.scss";

.nav {
  padding: 0 60px;
  @include desktop() {
    padding: 0 30px;
  }

  &__list {
    display: flex;
    align-items: center;
  }

  &__item {
    position: relative;
    padding: 0 25px;
    @include desktop() {
      padding: 0 10px;
    }
    &:first-child {
      &::before {
        content: '';
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 0;
        width: 6px;
        height: 6px;
        border-radius: 100%;
        background: var(--main-danger-color);
      }
    }
  }
}
</style>
