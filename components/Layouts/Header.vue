<template lang="pug">
  header.header
    .header__content
      .header__logo
        BaseLogoWithLink
      .header__navigation
        BaseNavigation(v-if="isAuth")
      .header__actions
        .header__user(v-if="isAuth") {{user.name}}
        .header__button
          BaseLoginLogOutBtns
        .header__burger
          UiBurger(
            @click="sidebar = !sidebar"
            :showMenu="sidebar"
          )
        LayoutsSidebar(
          :sidebar="sidebar"
          @close="sidebar = false"
        )
</template>

<script>

export default {
  name: 'Header',
  data() {
    return {
      sidebar: false,
    }
  },
  computed: {
    user() {
      return this.$store.getters['user/user']
    },
    isAuth() {
      return this.$store.getters['user/isAuth']
    },
  }
}
</script>

<style scoped lang="scss">
@import '~/styles/mixins.scss';

.header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  padding: 20px 85px;
  background: var(--dark-2);
  width: 100%;

  @include desktop {
    padding-left: 60px;
    padding-right: 60px;
  }

  @include tablets() {
    padding-right: 25px;
    padding-left: 25px;
  }

  @include phones() {
    padding-right: 15px;
    padding-left: 15px;
  }

  &__logo {
    flex: 0 0 auto;
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__navigation {
    flex: 1 1 auto;
    @include tablets() {
      display: none;
    }
  }

  &__actions {
    display: flex;
    align-items: center;
  }

  &__button {
    @include tablets() {
      display: none;
    }
  }

  &__burger {
    display: none;
    @include tablets() {
      display: block;
      z-index: 1000;
    }
  }

  &__user {
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    color: var(--main-light);
    margin-right: 50px;

    @include desktop() {
      margin-right: 10px;
    }

    @include tablets() {
      display: none;
    }
  }
}
</style>
