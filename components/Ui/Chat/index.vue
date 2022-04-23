<template lang='pug'>
  .chat
    .chat__header Чат
    .chat__content
      UiChatContainer(
        :data='data'
        v-on='chatBlockEvents'
        v-bind='$props'
      )
</template>

<script>
import {createEventsFor} from '~/helpers/createBlockData'

export default {
  name: 'Chat',
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    newMessagePlaceholder: String,
  },
  computed: {
    chatBlockEvents() {
      return createEventsFor(this, 'chatBlock_')
    },
  },
}
</script>
<style lang="scss">
:root {
  /* Размеры */
  --chat-sm-gap: 5px;
  --chat-md-gap: 10px;
  --chat-lg-gap: 20px;
  --chat-xl-gap: 30px;

  /* Цвета */
  --chat-general-color: var(--main-color);
  --chat-white: var(--main-light);
}
</style>
<style lang="scss" scoped>

.chat {
  position: relative;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  width: 100%;

  &__content {
    position: relative;
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    background: var(--dark-2);
  }

  &__header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: var(--chat-md-gap);
    font-size: var(--main-smallest-text);
    color: var(--main-color);
    border-bottom: 1px solid var(--main-color);
    background: var(--dark-2);
  }
}
</style>
