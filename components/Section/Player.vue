<template lang="pug">
  section.s-player
    LayoutsContainer
      .s-player__block
        BlockPlayer
        .s-player__chat
          BlockChat
</template>

<script>

export default {
  name: 'Player',
}
</script>

<style lang="scss" scoped>
@import "~/styles/mixins.scss";

.s-player {
  padding-top: 100px;

  &__block {
    position: relative;
    display: grid;
    grid-template-columns: 1fr;
  }

  &__chat {
    width: 300px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 1;

    @include desktop {
      flex: 1 1 auto;
      width: 100%;
      min-height: 450px;
      grid-row-start: 3;
      grid-row-end: 3;
      grid-column-start: 1;
      grid-column-end: 3;
    }
  }
}
</style>
