<template lang='pug'>
  form.new-message(@submit.prevent='sendMessage' v-click-outside.lazy="closeEmojiPicker")
    UiInput(
      v-model="newMessageText"
      key="messageInput"
      :placeholder="newMessagePlaceholder"
      @handleKeypress="sendMessage"
      autocomplete="no-message"
    )
      template(#btn)
        span.new-message__input-icon(@click.prevent="toggleEmojiPicker")
          SvgIcon(name='emoji')
        button.new-message__input-icon
          SvgIcon(name='send-message')

    VEmojiPicker.new-message__emoji-picker(
      v-if="isEmojiPickerVisible"
      id="emoji-picker-panel"
      @select="selectEmoji"
    )
</template>

<script>
import {VEmojiPicker} from 'v-emoji-picker'

export default {
  name: 'NewMessage',
  components: {
    VEmojiPicker,
  },
  props: {
    newMessagePlaceholder: {
      type: String,
      default: 'Написать...',
    },
  },
  data() {
    return {
      newMessageText: '',
      isEmojiPickerVisible: false,
    }
  },
  methods: {
    toggleEmojiPicker() {
      this.isEmojiPickerVisible = !this.isEmojiPickerVisible
    },
    closeEmojiPicker() {
      this.isEmojiPickerVisible = false
    },
    selectEmoji(emoji) {
      this.newMessageText += emoji.data
    },
    sendMessage() {
      if (!this.newMessageText) {
        return
      }
      this.$emit('sendMessage', this.newMessageText)
      this.newMessageText = ''
      this.closeEmojiPicker()
    },
  },
}
</script>
<style lang="scss">
:root {
  --chat-input-icon-width: 26px;
  --chat-input-icon-height: 20px;

  --chat-emoji-btn-color: var(--gray-2);
}
</style>
<style lang="scss" scoped>
@import '~/styles/mixins.scss';

.new-message {
  position: relative;

  &__input-icon {
    width: var(--chat-input-icon-width);
    height: var(--chat-input-icon-height);
    background: transparent;
    border: 0;
    padding: 0;
    margin: 0;
    outline: none;
    cursor: pointer;
    color: var(--chat-emoji-btn-color);

    svg {
      max-width: var(--chat-input-icon-width);
      max-height: var(--chat-input-icon-height);
      fill: currentColor;
    }

    &:last-child {
      margin-left: 10px;
      color: var(--chat-general-color);
    }
  }

  &__emoji-picker#{&}__emoji-picker {
    --ep-color-active: var(--main-color);
    --ep-color-bg: var(--dark-1);
    --ep-color-border: transparent;
    --ep-color-sbg: var(--main-light);

    position: absolute;
    bottom: 100%;
    right: 0;
    max-width: 100%;
    border-radius: 0;
    border-top: 1px solid var(--gray-4);

    ::-webkit-scrollbar {
      height: 3px;
    }

    ::v-deep {
      .category.active {
        border-bottom: 0;
        border-top: none;
        filter: none;

        svg {
          fill: var(--main-color);
          width: 15px;
        }
      }

      .container-emoji {
        max-height: 300px;
      }
    }

    @include phones-small {
      max-width: 100%;
      left: 0;
      right: 0;
      margin: 0 auto;
    }
  }
}
</style>
