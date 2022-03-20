<template>
  <div class="message" :class="messageClass">
    <div class="message__header">
      <div :class="{'message__admin--container': isAdmin}">
        <div class="text" :class="{'message__name-user-ask': askToSpeaker}" @click="openBadge">
          <p class="message__name">
            {{ author.name }}
          </p>
          <p class="message__name company" v-if="author.company">
            {{ author.company }}
          </p>
        </div>
        <p v-if="askToSpeaker" class="message__speaker-name">
          <span>
            <svg width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1 0.272461V3.66841C1 5.32526 2.34315 6.66841 4 6.66841H6.97103M6.97103 6.66841L4.98069 4.77331M6.97103 6.66841L4.98069 8.56351"
                stroke="var(--zeen-chat-general-color)"
              />
            </svg>
          </span>
          {{ message.speaker.name }}
        </p>
      </div>

      <div class="text message__time" v-if="statusPending">
        {{ onModeration }}
      </div>
      <div class="text message__time message__time_reject" v-else-if="statusRejected">
        {{ rejected }}
      </div>
      <p class="text message__time" v-else>{{ message.time }}</p>
    </div>
    <div class="message__body">
      <div
        v-if="message.is_reply"
        class="message__reply"
        :class="{message__reply_my: message.reply_my}"
        @mouseover="showTooltip"
        @mouseleave="hideTooltip"
        @click="showTooltip"
        v-click-outside="hideTooltip"
      >
        <p class="text message__name message__reply-name">{{ message.reply_name }}</p>
        <div class="text message__text message__reply-text">
          {{ questionText }}
          <div class="message__tooltip" v-show="tooltipHandler">
            <div class="message__tooltip-wrapper">
              <div class="text">{{ message.text }}</div>
            </div>
          </div>
        </div>
      </div>
      <p class="text message__text">{{ messageText }}</p>
    </div>
    <div class="message__footer">
      <slot name="message-footer" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Message',
  props: {
    onModeration: {
      type: String,
      default: 'На модерации',
    },
    rejected: {
      type: String,
      default: 'Отклонено',
    },
    maxQuestionLength: {
      type: Number,
      default: 100,
    },
    message: {
      type: Object,
      default: () => ({
        status: null,
        isMy: null,
        reply_my: null,
        is_reply: null,
        reply_text: null,
        reply_name: null,
        text: null,
        admin: null,
        speaker: null,
        time: null,
        user: null,
      })
    },
  },
  data() {
    return {
      tooltip: false,
    }
  },
  methods: {
    openBadge() {
      if (this.message.user) {
        this.$emit('openBadge', this.message.user)
      }
    },
    showTooltip() {
      this.tooltip = true
    },
    hideTooltip() {
      this.tooltip = false
    },
  },
  computed: {
    author() {
      if (!this.message.user && !this.message.admin && this.message.speaker) {
        return this.message.speaker
      }
      if (this.message.user && !this.message.admin && !this.message.speaker) {
        return this.message.user
      }
      if (this.message.admin && !this.message.speaker) {
        return this.message.admin
      }
      return this.message.user
    },
    isAdmin() {
      return this.message.admin
    },
    askToSpeaker() {
      return this.message.user && this.message.speaker
    },
    questionText() {
      const text = this.message.text
      if (text.length > this.maxQuestionLength) {
        const textResize = text.slice(0, this.maxQuestionLength).split(' ')
        const textDeleteLast = textResize.length > 1 ? textResize.slice(0,-1) : textResize
        return `${textDeleteLast.join(' ')}...`
      }
      return text
    },
    messageText() {
      return this.message.is_reply ? this.message.reply_text : this.message.text
    },
    tooltipHandler() {
      return this.message.text.length > this.maxQuestionLength && this.tooltip
    },
    messageClass() {
      return {
        'message_my': this.message.isMy && !this.message.is_reply,
        'message_replay': this.message.is_reply,
      }
    },
    statusPending() {
      return this.message.status === 'pending'
    },
    statusRejected() {
      return this.message.status === 'rejected'
    },
  },
}
</script>
<style lang="scss">
:root {
  /* Размеры */
  --zeen-message-border-width: 1px;
  --zeen-message-radius: 30px;
  --zeen-message-line-height: 1.5;
  --zeen-message-small-gap: 5px;
  --zeen-message-gap: calc(var(--zeen-message-small-gap) * 2);
  --zeen-message-font-size: var(--main-smallest-text);
  --zeen-message-small-font-size: var(--main-input-label-size);
  --zeen-message-border: var(--zeen-message-border-width) solid var(--zeen-chat-general-color);
  --zeen-message-margin: var(--zeen-chat-md-gap) 0;
  --zeen-chat-tooltip-padding-vertical: 5px;
  --zeen-chat-tooltip-padding-horizontal: 10px;
  --zeen-chat-tooltip-border-radius: 5px;
  --zeen-chat-tooltip-max-height: 200px;

  /* Цвета */
  --zeen-message-text-color-secondary: var(--gray-4);
  --zeen-message-text-color: var(--main-positive-color);
  --zeen-chat-tooltip-background: var(--dark-1);
  --zeen-chat-tooltip-color: var(--main-light);
}
</style>
<style lang="scss" scoped>

.message {
  margin-top: var(--zeen-chat-lg-gap);

  .text {
    font-size: var(--zeen-message-font-size);
    line-height: var(--zeen-message-line-height);
    color: var(--zeen-message-text-color);
    margin: 0;
  }

  &__name {
    display: inline;
    font-weight: bold;
  }

  &__header {
    display: flex;
    justify-content: space-between;
  }

  &__speaker-name {
    margin: 0;
    font-size: var(--zeen-message-small-font-size);
    color: var(--zeen-chat-general-color);
  }

  &__name-user-ask {
    font-weight: bold;
  }

  &__admin--container {
    .text {
      color: var(--zeen-chat-white);
      background: var(--zeen-chat-general-color);
      border-radius: var(--zeen-message-radius);
      padding: 0 var(--zeen-chat-md-gap);
    }
  }

  &__text {
    position: relative;
  }

  &__tooltip {
    position: absolute;
    display: flex;
    justify-content: center;
    padding: var(--zeen-chat-tooltip-padding-vertical)  var(--zeen-chat-tooltip-padding-horizontal);
    top: 100%;
    left: 0;
    width: 100%;
    max-height: var(--zeen-chat-tooltip-max-height);
    background: var(--zeen-chat-tooltip-background);
    border-radius: var(--zeen-chat-tooltip-border-radius);
    z-index: 10;

    .text {
      color: var(--zeen-chat-tooltip-color);
    }

    &::after {
      content: '';
      position: absolute;
      bottom: 100%;
      left: 10%;
      margin-left: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: transparent transparent var(--zeen-chat-tooltip-background) transparent;
    }
  }

  &__tooltip-wrapper {
    overflow-y: auto;
    padding-right: 5px;

    &::-webkit-scrollbar {
      width: var(--zeen-chat-scrollbar-width);
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: transparent;
      border-radius: var(--zeen-chat-scrollbar-thumb-borderradius);
    }

    &::-webkit-scrollbar-button {
      background: transparent;
      height: 3px;
    }

    &:hover {
      &::-webkit-scrollbar-thumb {
        background: var(--zeen-chat-general-color);
      }
    }
  }

  &__time {
    color: var(--zeen-message-text-color);

    &_reject {
      color: var(--danger-color);
    }
  }

  &__body {
    margin-top: var(--zeen-chat-md-gap);

    .message__reply {
      margin: var(--zeen-message-margin);
      padding-left: var(--zeen-chat-md-gap);
      border-left: var(--zeen-message-border);

      .message__reply-name {
        color: var(--zeen-chat-general-color);
      }

      .message__reply-text {
        color: var(--zeen-message-text-color-secondary);
        margin-top: var(--zeen-chat-sm-gap);
      }
    }
  }
  &__footer {
    margin-top: var(--zeen-message-gap);
  }
}
</style>
