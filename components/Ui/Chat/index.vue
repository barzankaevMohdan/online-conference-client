<template  lang='pug'>
  .zeen-chat
    UiTab(:tab-options='tabOptions')
      template(#tab-name)
        slot(name='tab-name')
      template(#tab-content-chat)
        slot(name='tab-content-chat')
          ChatContainer(
            key='chat'
            :data='data'
            v-on='chatBlockEvents'
            v-bind='$props'
          )
            template(v-for='(slot, slotName) in chatSlots' v-slot:[slotName]='params')
              slot(:name='`${chatPrefix}${slotName}`' v-bind='params')
      template(#tab-content-questions)
        slot(name='tab-content-questions')
          ChatContainer(
            key='questions'
            :data='speakerData'
            isSpeakerSection
            v-on='chatBlockEvents'
            v-bind='$props'
          )
            template(#chat-footer)
              slot(name='chat-footer')
                UiButton.zeen-chat__question-btn(
                  @click.prevent='$emit("startQuestion")'
                  no-radius
                ) {{ speakerBtnText }}
            template(v-for='(slot, slotName) in chatSlots' v-slot:[slotName]='params')
              slot(:name='`${chatPrefix}${slotName}`' v-bind='params')
</template>

<script>
import {createEventsFor, createSlotsFor} from '../../../helpers/createBlockData'
import ChatContainer from './ChatContainer'

export default {
  name: 'ZeenChat',
  components: {
    ChatContainer,
  },
  props: {
    tabOptions: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Array,
      default: () => [],
    },
    speakerData: {
      type: Array,
      default: () => [],
    },
    speakerBtnText: {
      type: String,
      default: 'Задать вопрос',
    },
    sortByNew: String,
    sortByLikes: String,
    hideLikes: Boolean,
    hideSort: Boolean,
    newMessagePlaceholder: String,
    messageProps: Object,
  },
  computed: {
    chatBlockEvents() {
      return createEventsFor(this, this.chatPrefix)
    },
    chatPrefix() {
      return 'chatBlock_'
    },
    chatSlots() {
      return createSlotsFor(this, this.chatPrefix)
    },
  },
}
</script>
<style lang="scss">
:root {
  /* Размеры */
  --zeen-chat-scrollable-height: 511px;
  --zeen-chat-sm-gap: 5px;
  --zeen-chat-md-gap: 10px;
  --zeen-chat-lg-gap: 20px;
  --zeen-chat-xl-gap: 30px;

  /* Цвета */
  --zeen-chat-general-color: var(--main-color);
  --zeen-chat-new-message-icon-bgcolor: var(--main-danger-color);
  --zeen-chat-white: var(--main-light);
}
</style>
<style lang="scss" scoped>
.zeen-chat {
  --zeen-tab-full-size: calc(100% + 4px);

  flex: 1 1 auto;
  width: 100%;
  height: 100%;

  &__question-btn {
    height: var(--player-footer-height)
  }
}
</style>
