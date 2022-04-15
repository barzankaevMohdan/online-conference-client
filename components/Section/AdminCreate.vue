<template lang="pug">
  section.s-admin-create
    LayoutsContainer
      .s-admin-create__form
        UiButton(@click.prevent="openModal('create-stream')").s-admin-create__btn Создать стрим
        UiButton(@click.prevent="openModal('create-speech')").s-admin-create__btn Создать спича
        UiButton(@click.prevent="openModal('create-speaker')").s-admin-create__btn Создать спикера
        UiButton(@click.prevent="openModal('delete-stream')").s-admin-create__btn Удалить стрим
</template>

<script>
export default {
  name: 'AdminCreate',
  methods: {
    openModal(name) {
      this.$vfm.show(name)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~/styles/mixins.scss";

.s-admin-create{
  padding: var(--main-section-padding-vertical) 0;
  background-color: var(--dark-2);

  &__form {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 50px;
    background: var(--main-positive-color);
  }

  &__btn {
    margin-bottom: 30px;
    width: 100%;

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
