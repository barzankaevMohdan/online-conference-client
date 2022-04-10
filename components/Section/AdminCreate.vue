<template lang="pug">
  section.s-admin-create
    LayoutsContainer
      .s-admin-create__form
        UiButton(@click.prevent="openModal('create-stream-modal')").s-admin-create__btn Создать стрим
        UiButton(@click.prevent="openModal('create-speech-modal')").s-admin-create__btn Создать спича
        UiButton(@click.prevent="openModal('create-speaker-modal')").s-admin-create__btn Создать спикера
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
  background-color: #000;

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
