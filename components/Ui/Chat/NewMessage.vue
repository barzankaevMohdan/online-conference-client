<template lang='pug'>
  form.new-message(@submit.prevent v-click-outside.lazy="closeEmojiPicker")
    UiInput(
      v-model="newMessageText"
      key="messageInput"
      :placeholder="newMessagePlaceholder"
      @handleKeypress="sendMessage"
      no-radius
      autocomplete="no-message"
    )
      template(#btn)
        span.new-message__input-icon(@click.prevent="toggleEmojiPicker")
          svg(width="100%" height="100%" viewBox="0 0 19 19" xmlns="http://www.w3.org/2000/svg")
            path(
              d="M6.76562 9.10938C7.07643 9.10938 7.3745 8.98591 7.59427 8.76614C7.81404 8.54637 7.9375 8.2483 7.9375 7.9375C7.9375 7.6267 7.81404 7.32863 7.59427 7.10886C7.3745 6.88909 7.07643 6.76562 6.76562 6.76562C6.45482 6.76562 6.15675 6.88909 5.93698 7.10886C5.71721 7.32863 5.59375 7.6267 5.59375 7.9375C5.59375 8.2483 5.71721 8.54637 5.93698 8.76614C6.15675 8.98591 6.45482 9.10938 6.76562 9.10938Z"
            )
            path(
              d="M6.58784 12.1054C6.51972 12.0279 6.43691 11.9646 6.34419 11.9193C6.25148 11.8739 6.1507 11.8474 6.04768 11.8412C5.94466 11.8351 5.84144 11.8494 5.74398 11.8833C5.64652 11.9173 5.55675 11.9702 5.47986 12.039C5.40297 12.1079 5.34048 12.1913 5.296 12.2844C5.25152 12.3775 5.22594 12.4785 5.22072 12.5816C5.21551 12.6847 5.23077 12.7878 5.26562 12.8849C5.30047 12.9821 5.35423 13.0713 5.42378 13.1476C5.93643 13.7215 6.56466 14.1805 7.26722 14.4945C7.96978 14.8085 8.73081 14.9703 9.50034 14.9695C10.2699 14.9703 11.0309 14.8085 11.7335 14.4945C12.436 14.1805 13.0642 13.7215 13.5769 13.1476C13.7128 12.9929 13.7822 12.7908 13.7699 12.5852C13.7576 12.3796 13.6646 12.1872 13.5112 12.0498C13.3577 11.9125 13.1562 11.8412 12.9506 11.8516C12.7449 11.862 12.5516 11.9532 12.4128 12.1054C12.0468 12.5157 11.598 12.8438 11.096 13.0681C10.594 13.2925 10.0502 13.4079 9.50034 13.407C8.34409 13.407 7.30503 12.9054 6.58784 12.1054Z"
            )
            path(
              d="M13.4062 7.9375C13.4062 8.2483 13.2828 8.54637 13.063 8.76614C12.8432 8.98591 12.5452 9.10938 12.2344 9.10938C11.9236 9.10938 11.6255 8.98591 11.4057 8.76614C11.186 8.54637 11.0625 8.2483 11.0625 7.9375C11.0625 7.6267 11.186 7.32863 11.4057 7.10886C11.6255 6.88909 11.9236 6.76563 12.2344 6.76562C12.5452 6.76563 12.8432 6.88909 13.063 7.10886C13.2828 7.32863 13.4062 7.6267 13.4062 7.9375Z"
            )
            path(
              d="M18.875 9.5C18.875 8.26886 18.6325 7.04977 18.1614 5.91234C17.6902 4.77492 16.9997 3.74142 16.1291 2.87087C15.2586 2.00032 14.2251 1.30977 13.0877 0.838629C11.9502 0.367492 10.7311 0.125 9.5 0.125C8.26886 0.125 7.04977 0.367492 5.91234 0.838629C4.77492 1.30977 3.74142 2.00032 2.87087 2.87087C2.00032 3.74142 1.30977 4.77492 0.838629 5.91234C0.367491 7.04977 0.125 8.26886 0.125 9.5C0.125 11.9864 1.11272 14.371 2.87087 16.1291C4.62903 17.8873 7.0136 18.875 9.5 18.875C11.9864 18.875 14.371 17.8873 16.1291 16.1291C17.8873 14.371 18.875 11.9864 18.875 9.5ZM1.6875 9.5C1.6875 7.428 2.5106 5.44086 3.97573 3.97573C5.44086 2.5106 7.428 1.6875 9.5 1.6875C11.572 1.6875 13.5591 2.5106 15.0243 3.97573C16.4894 5.44086 17.3125 7.428 17.3125 9.5C17.3125 11.572 16.4894 13.5591 15.0243 15.0243C13.5591 16.4894 11.572 17.3125 9.5 17.3125C7.428 17.3125 5.44086 16.4894 3.97573 15.0243C2.5106 13.5591 1.6875 11.572 1.6875 9.5Z"
            )
        button.new-message__input-icon.new-message__send-button(@click.prevent="sendMessage")
          svg(width="100%" height="100%" viewBox="0 0 21 20" xmlns="http://www.w3.org/2000/svg")
            path(
              d="M19.6552 8.63074L2.71996 0.163137C2.45174 0.0283047 2.14981 -0.0247122 1.85171 0.0106794C1.5536 0.0460709 1.27247 0.16831 1.04328 0.362195C0.813517 0.556227 0.645974 0.813622 0.561559 1.10227C0.477145 1.39091 0.479596 1.69802 0.568608 1.98528L2.80418 9.23557H10.7282C10.9312 9.23557 11.126 9.31623 11.2696 9.45981C11.4131 9.60339 11.4938 9.79812 11.4938 10.0012C11.4938 10.2042 11.4131 10.399 11.2696 10.5425C11.126 10.6861 10.9312 10.7668 10.7282 10.7668H2.80418L0.568608 18.0171C0.497904 18.2461 0.481946 18.4885 0.522018 18.7248C0.56209 18.9611 0.657073 19.1847 0.799324 19.3776C0.941575 19.5705 1.12712 19.7273 1.34103 19.8354C1.55494 19.9435 1.79124 19.9999 2.03092 20C2.27 20.0009 2.50598 19.9459 2.71996 19.8392L19.6552 11.3716C19.91 11.2446 20.1243 11.0491 20.2742 10.807C20.424 10.5649 20.5034 10.2859 20.5034 10.0012C20.5034 9.71648 20.424 9.43742 20.2742 9.19533C20.1243 8.95325 19.91 8.75773 19.6552 8.63074Z"
            )

    VEmojiPicker(
      v-if="isEmojiPickerVisible"
      id="emoji-picker-panel"
      class="new-message__emoji-picker"
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
      showSmiles: false,
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
  --zeen-chat-footer-height: 70px;
  --zeen-chat-input-icon-width: 26px;
  --zeen-chat-input-icon-height: 20px;

  --zeen-chat-emoji-btn-color: var(--gray-2);
}
</style>
<style lang="scss" scoped>
@import '~/styles/mixins.scss';

.new-message {
  min-height: var(--zeen-chat-footer-height);
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  position: relative;

  ::v-deep {
    .zeen-text-input {
      flex: 1 1 auto;
      display: flex;
      flex-direction: column;
    }

    .zeen-text-input__label {
      display: none;
    }

    .zeen-text-input__wrapper {
      display: flex;
      flex: 1 1 auto;
    }
  }

  &__input-icon {
    width: var(--zeen-chat-input-icon-width);
    height: var(--zeen-chat-input-icon-height);
    background: transparent;
    border: 0;
    padding: 0;
    margin: 0;
    outline: none;
    cursor: pointer;
    color: var(--zeen-chat-emoji-btn-color);

    svg {
      fill: currentColor;
    }
  }

  &__send-button {
    margin-left: 10px;
    color: var(--zeen-chat-general-color);
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
