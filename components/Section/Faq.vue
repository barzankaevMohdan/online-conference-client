<template lang="pug">
  section#faq.s-faq
    .s-faq__bg
    LayoutsContainer
      UiHeadline(tag='h2') Помощь
      ul.s-faq__list
        li(
          v-for="(item, idx) in faq"
          :key="idx"
        )
          UiFaq(
            :title='item.title'
            :description='item.description'
          )
</template>

<script>
export default {
  name: 'Faq',
  data() {
    return {
      faq: [
        {
          title: 'Вопрос 1',
          description: 'Вопрос 1',
        },
        {
          title: 'Вопрос 2',
          description: 'Вопрос 2',
        },
        {
          title: 'Вопрос 3',
          description: 'Вопрос 3',
        },
        {
          title: 'Вопрос 4',
          description: 'Вопрос 4',
        },
        {
          title: 'Вопрос 5',
          description: 'Вопрос 5',
        },
        {
          title: 'Вопрос 6',
          description: 'Вопрос 6',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
@import "~/styles/mixins.scss";

.s-faq {
  position: relative;
  padding: var(--main-section-padding-vertical) 0;
  background-color: var(--dark-2);
  overflow: hidden;
  z-index: 0;

  &__bg {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
    background: url('~/assets/img/faq/faq-bg.png');
  }

  &__list{
    list-style: none;
    padding: 0;
    margin: 0;
    overflow: hidden;
    border-radius: 10px;
  }
}
</style>
