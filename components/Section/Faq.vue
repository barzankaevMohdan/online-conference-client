<template lang="pug">
  section.s-faq(id="faq")
    .s-faq__bg
    BlockFaq(:list="faq")
      template(#title) Помощь
</template>

<script>
export default {
  name: 'Faq',
  data() {
    return {
      faq: [
        {
          id: 1,
          title: 'TextTextText',
          description: 'TextTextText',
        },
        {
          id: 2,
          title: 'TextTextText',
          description: 'TextTextText',
        },
        {
          id: 3,
          title: 'TextTextText',
          description: 'TextTextText',
        },
        {
          id: 4,
          title: 'TextTextText',
          description: 'TextTextText',
        },
        {
          id: 5,
          title: 'TextTextText',
          description: 'TextTextText',
        },
        {
          id: 6,
          title: 'TextTextText',
          description: 'TextTextText',
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
  background-color: #000;
  overflow: hidden;
  z-index: 0;

  &__bg {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
    background: url(~/assets/img/faq/faq-bg.png);
  }
}
</style>
