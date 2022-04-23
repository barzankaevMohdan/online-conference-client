<template lang='pug'>
  UiSidebar(:sidebar="sidebar" @sidebar="$emit('close')")
    .sidebar-content
      template(v-if="isAuth")
        .sidebar-content__item
          NavigationOnline(theme='sidebar' @open="$emit('close')") Сейчас онлайн
        .sidebar-content__item
          NavigationLink(to='/schedule' theme='sidebar' @click="$emit('close')") Программа
        .sidebar-content__item
          NavigationScroll(scrollTo='#faq' routTo='/' theme='sidebar' @scroll="$emit('close')") Faq
        .sidebar-content__footer
          span.sidebar-content__name {{user.name}}
          BaseLoginLogOutBtns.sidebar-content__button(theme="no-padding")

      template(v-else)
        BaseLoginLogOutBtns(theme="outline")
</template>

<script>
export default {
  name: 'Sidebar',
  props: {
    sidebar: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isAuth() {
      return this.$store.getters['user/isAuth']
    },
    user() {
      return this.$store.getters['user/user']
    },
  },
}
</script>


<style scoped lang='scss'>
@import "~/styles/mixins.scss";

.sidebar-content {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding-top: 125px;
  padding-bottom: 90px;

  &__close {
    position: absolute;
    top: 25px;
    right: 25px;
    width: 16px;
    height: 16px;
    fill: var(--main-light);
  }

  &__item {
    position: relative;
    margin-bottom: 40px;
    &:first-child {
      &::before {
        content: '';
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: -15px;
        width: 6px;
        height: 6px;
        border-radius: 100%;
        background: var(--main-danger-color);
      }
    }
  }

  &__name {
    color: var(--main-light);
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
  }

  &__footer {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-top: 50px;
  }

  &__button {
    margin-top: 10px;
  }
}
</style>
