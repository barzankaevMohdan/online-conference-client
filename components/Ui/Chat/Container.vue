<template lang='pug'>
  .chat-container
    .chat-container__scroll
      .chat-container__messages(ref='messagesContent')
        InfiniteLoading(
          v-if='haveInfiniteLoading'
          direction='top'
          @infinite='loadData'
        )
        UiChatMessage(
          v-for='(message, index) in data'
          :key='`${message.id}-${index}`'
          :id='`${message.id}-${index}`'
          :message='message'
          v-on='messageEvents'
        )
      button.chat-container__down-arrow(@click='scroll' :class='arrowClass')
        SvgIcon(name='arrow')
    UiChatNewMessage(@sendMessage='$emit("sendMessage", $event)' :newMessagePlaceholder='newMessagePlaceholder')

</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import {createEventsFor} from '~/helpers/createBlockData'

let lastScrollTop = 0

export default {
  name: 'Container',
  components: {
    InfiniteLoading,
  },
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      },
    },
    newMessagePlaceholder: String,
  },
  data() {
    return {
      showButton: false,
      initialized: false,
      loadCompleted: false,
    }
  },
  mounted() {
    this.initScrollPosition()
  },
  destroyed() {
    this.$refs?.messagesContent?.removeEventListener('scroll', this.scrollHandler)
  },
  methods: {
    scroll() {
      this.showButton = false
      this.$nextTick(() => {
        this.$refs.messagesContent.scrollTo({
          top: this.$refs.messagesContent.scrollHeight,
          behavior: 'smooth',
        })
      })
    },
    loadData($state) {
      this.$emit('loadMoreMessages', (isCompleted) => {
        if (isCompleted) {
          this.loadCompleted = true
          $state.complete()
        } else {
          $state.loaded()
        }
      })
    },
    initScrollPosition() {
      this.$refs.messagesContent.addEventListener('scroll', this.scrollHandler)
    },
    scrollHandler() {
      this.initialized = true
      const messagesContent = this.$refs.messagesContent
      const sizeToTop = messagesContent.scrollTop
      const messageContentHeight = messagesContent.clientHeight
      const heightDiff = messagesContent.scrollHeight - messageContentHeight
      switch (true) {
        case sizeToTop >= lastScrollTop:
          this.showButton = false
          break
        case sizeToTop < heightDiff:
          this.$nextTick(() => {
            this.showButton = true
          })
          break
      }
      lastScrollTop = sizeToTop
    },
  },
  computed: {
    messageEvents() {
      return createEventsFor(this, 'message_')
    },
    haveScroll() {
      if (!this.initialized) return
      return this.$refs.messagesContent.scrollHeight > this.$refs.messagesContent.offsetHeight
    },
    haveInfiniteLoading() {
      return this.data.length && this.haveScroll && !this.loadCompleted
    },
    arrowClass() {
      return {
        'chat-container__down-arrow_hidden': !this.showButton,
      }
    },
  },
  watch: {
    'data.length'() {
      if (!this.showButton) {
        this.scroll()
      }
    },
  },
}
</script>

<style lang="scss">
:root {
  --chat-scrollbar-width: 6px;
  --chat-scrollbar-thumb-borderradius: 4px;
  --chat-down-arrow-size: 40px;
  --chat-down-arrow-radius: 50%;
  --chat-down-arrow-bottom: var(--chat-md-gap);
  --chat-down-arrow-hidden-bottom: -50px;
}
</style>

<style lang="scss" scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  max-height: 100%;

  &__scroll {
    position: relative;
    flex: 1 1 auto;
  }

  &__messages {
    height: 100%;
    flex: 1 1 auto;
    overflow-y: auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 0 var(--chat-lg-gap) var(--chat-xl-gap);

    /* Track */
    &::-webkit-scrollbar-track {
      background: transparent;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: transparent;
    }

    &:hover {
      &::-webkit-scrollbar-thumb {
        background: var(--chat-general-color);
      }
    }

    &__footer {
      display: flex;
    }
  }

  &__down-arrow {
    width: var(--chat-down-arrow-size);
    height: var(--chat-down-arrow-size);
    background: var(--chat-general-color);
    border-radius: var(--chat-down-arrow-radius);
    border: 0;
    position: absolute;
    margin: 0 auto;
    left: 0;
    right: 0;
    bottom: var(--chat-down-arrow-bottom);
    cursor: pointer;
    color: var(--chat-white);
    display: flex;
    transition: bottom 0.3s ease;

    svg {
      display: block;
      margin: auto;
      fill: currentColor;
      max-width: 65%;
      max-height: 65%;
    }

    &_hidden {
      bottom: var(--chat-down-arrow-hidden-bottom);
      transition: bottom 0.3s ease;
    }
  }
}
</style>
