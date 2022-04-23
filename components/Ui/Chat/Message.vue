<template lang='pug'>
  .message(@click='openBadge')
    .message__header
      .text(:class='{"message__admin": isAdmin}') {{ author.name }}
      .text {{ message.time }}
    .message__body
      .text {{ message.text }}
</template>

<script>
export default {
  name: 'Message',
  props: {
    message: {
      type: Object,
      default: () => ({
        text: null,
        admin: null,
        time: null,
        user: null,
      })
    },
  },
  methods: {
    openBadge() {
      this.$emit('openBadge', this.message)
    },
  },
  computed: {
    author() {
      return this.message.admin ?? this.message.user
    },
    isAdmin() {
      return this.message.admin
    },
  },
}
</script>
<style lang="scss">
:root {
  /* Размеры */
  --message-radius: 30px;
  --message-line-height: 1.5;
  --message-font-size: var(--main-smallest-text);

  /* Цвета */
  --message-text-color: var(--main-light);
}
</style>
<style lang="scss" scoped>

.message {
  margin-top: var(--chat-lg-gap);
  cursor: pointer;

  .text {
    font-size: var(--message-font-size);
    line-height: var(--message-line-height);
    color: var(--message-text-color);
    margin: 0;
  }

  &__name {
    font-weight: bold;
  }

  &__header {
    display: flex;
    justify-content: space-between;
  }

  &__admin {
    color: var(--chat-white);
    background: var(--chat-general-color);
    border-radius: var(--message-radius);
    padding: 0 var(--chat-md-gap);
  }

  &__body {
    margin-top: var(--chat-md-gap);
  }
}
</style>
