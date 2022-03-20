<template lang='pug'>
  .chat-container
    .chat-container__sort-wrapper(v-if='hasSortBtn')
      ZeenButtonSmall.chat-container__sort-btn.option(
        @click='toggleSort'
        size='parentWidth'
      ) {{ sortText }}
        template(#leftIcon)
          svg(width='12' height='7' viewBox='0 0 12 7' xmlns='http://www.w3.org/2000/svg')
            path(
              d='M4.98958 7H6.44792C6.64844 7 6.8125 6.7375 6.8125 6.41667C6.8125 6.09583 6.64844 5.83333 6.44792 5.83333H4.98958C4.78906 5.83333 4.625 6.09583 4.625 6.41667C4.625 6.7375 4.78906 7 4.98958 7ZM4.625 0.583333C4.625 0.904167 4.78906 1.16667 4.98958 1.16667H10.8229C11.0234 1.16667 11.1875 0.904167 11.1875 0.583333C11.1875 0.2625 11.0234 0 10.8229 0H4.98958C4.78906 0 4.625 0.2625 4.625 0.583333ZM4.98958 4.08333H8.63542C8.83594 4.08333 9 3.82083 9 3.5C9 3.17917 8.83594 2.91667 8.63542 2.91667H4.98958C4.78906 2.91667 4.625 3.17917 4.625 3.5C4.625 3.82083 4.78906 4.08333 4.98958 4.08333Z'
            )
            path(
              d='M1.31842 1.56864L1.31842 6.58419C1.31842 6.81289 1.52752 7 1.78308 7C2.03864 7 2.24773 6.81289 2.24773 6.58419L2.24773 1.56864L3.07946 1.56864C3.28855 1.56864 3.39078 1.3441 3.24209 1.2152L1.94571 0.0592528C1.85277 -0.0197509 1.70873 -0.0197508 1.6158 0.0592528L0.319417 1.2152C0.170727 1.3441 0.277597 1.56864 0.482045 1.56864L1.31842 1.56864Z'
            )
    .chat-container__scroll
      .chat-container__messages(ref='messagesContent')
        InfiniteLoading(
          v-if='isInfiniteLoadingTop'
          direction='top'
          @infinite='loadData'
        )
        Message(
          v-for='(message, index) in data'
          :key='`${message.id}-${index}`'
          :id='`${message.id}-${index}`'
          :message='message'
          v-bind='messageProps'
          v-on='messageEvents'
        )
          template(v-if='hasLikes' #message-footer)
            .chat-container__messages__footer
              ZeenButton.option(
                :style=`{
                  '--button-text-color': message.liked
                    ? 'var(--zeen-chat-new-message-icon-bgcolor)'
                    : 'var(--zeen-chat-message-like-text-color)',
                }`
                @click='$emit("like", message)'
                theme='no-padding'
              )
                template(v-if='message.liked')
                  slot(name='liked')
                    svg(width='13' height='13' viewBox='0 0 13 13' xmlns='http://www.w3.org/2000/svg')
                      path(
                        d='M0 4.89302C0 7.67734 2.33686 10.4159 6.0287 12.7688C6.16616 12.8538 6.36254 12.9453 6.5 12.9453C6.63746 12.9453 6.83384 12.8538 6.97784 12.7688C10.6631 10.4159 13 7.67734 13 4.89302C13 2.5793 11.4094 0.945312 9.28852 0.945312C8.07754 0.945312 7.09567 1.52048 6.5 2.40283C5.91742 1.52701 4.92246 0.945312 3.71148 0.945312C1.59063 0.945312 0 2.5793 0 4.89302Z'
                      )
                template(v-else)
                  slot(name='like')
                    svg(width='13' height='13' viewBox='0 0 13 13' xmlns='http://www.w3.org/2000/svg')
                      path(
                        d='M0 4.42037C0 7.20468 2.33686 9.94324 6.0287 12.2962C6.16616 12.3812 6.36254 12.4727 6.5 12.4727C6.63746 12.4727 6.83384 12.3812 6.97784 12.2962C10.6631 9.94324 13 7.20468 13 4.42037C13 2.10664 11.4094 0.472656 9.28852 0.472656C8.07754 0.472656 7.09567 1.04782 6.5 1.93017C5.91742 1.05436 4.92246 0.472656 3.71148 0.472656C1.59063 0.472656 0 2.10664 0 4.42037ZM1.05388 4.42037C1.05388 2.68181 2.17976 1.52494 3.69839 1.52494C4.929 1.52494 5.63595 2.28965 6.05488 2.94324C6.23162 3.20468 6.3429 3.27658 6.5 3.27658C6.6571 3.27658 6.75529 3.19815 6.94512 2.94324C7.39678 2.30272 8.07754 1.52494 9.30161 1.52494C10.8202 1.52494 11.9461 2.68181 11.9461 4.42037C11.9461 6.85174 9.37362 9.47266 6.63746 11.2896C6.572 11.3354 6.52618 11.3681 6.5 11.3681C6.47382 11.3681 6.428 11.3354 6.36908 11.2896C3.62638 9.47266 1.05388 6.85174 1.05388 4.42037Z'
                      )
              p.chat-container__messages__like-text(v-if='message.likes && message.likes.length') {{ message.likes.length }}
        InfiniteLoading(
          v-if='isInfiniteLoadingBottom'
          @infinite='loadData'
        )
      button.chat-container__down-arrow(@click='scroll' :class='arrowClass')
        slot(name='down-arrow')
          svg(width='20' height='20' viewBox='0 0 52 58' xmlns='http://www.w3.org/2000/svg')
            path(
              d='M26 58L-1.54953e-06 32.0895L3.97604 28.0512L23.1751 47.1841L23.1751 5.10944e-06L28.8249 5.60337e-06L28.8249 47.1841L48.024 28.0512L52 32.0895L26 58Z'
            )
    slot(name='chat-footer')
      NewMessage(@sendMessage='$emit("sendMessage", $event)' :newMessagePlaceholder='newMessagePlaceholder')

</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import {createEventsFor} from '../../../helpers/createBlockData'
import NewMessage from './NewMessage'
import Message from './Message'

let lastScrollTop = 0

export default {
  name: 'ChatContainer',
  components: {
    NewMessage,
    Message,
    InfiniteLoading,
  },
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      },
    },
    newMessageCount: Number,
    isSpeakerSection: {
      type: Boolean,
      default: false,
    },
    sortByLikes: {
      type: String,
      default: 'По количеству лайков',
    },
    sortByNew: {
      type: String,
      default: 'Новые вопросы',
    },
    newMessagePlaceholder: String,
    hideLikes: Boolean,
    hideSort: Boolean,
    messageProps: Object,
  },
  data() {
    return {
      showButton: false,
      initialized: false,
      loadCompleted: false,
      sortedByLikes: false,
    }
  },
  mounted() {
    if (!this.isSpeakerSection) {
      this.$refs.messagesContent.scrollTop = this.$refs.messagesContent.scrollHeight
    }
    this.initScrollPosition()
  },
  destroyed() {
    this.$refs?.messagesContent?.removeEventListener('scroll', this.scrollHandler)
  },
  methods: {
    scroll() {
      this.showButton = false
      this.newMessage = 0
      this.$nextTick(() => {
        this.$refs.messagesContent.scrollTo({
          top: this.isSpeakerSection ? 0 : this.$refs.messagesContent.scrollHeight,
          behavior: 'smooth',
        })
      })
    },
    loadData($state) {
      this.$emit(this.loadDataEmit, (isCompleted) => {
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
        case sizeToTop >= lastScrollTop && !this.isSpeakerSection:
          this.showButton = false
          this.newMessage = 0
          break
        case sizeToTop < heightDiff && !this.isSpeakerSection:
          this.$nextTick(() => {
            this.showButton = true
          })
          break
        case sizeToTop <= lastScrollTop || sizeToTop <= 0:
          this.showButton = false
          this.newMessage = 0
          break
        case sizeToTop > 0:
          this.$nextTick(() => {
            this.showButton = true
          })
          break
      }
      lastScrollTop = sizeToTop
    },
    toggleSort() {
      this.$emit('sort')
      this.sortedByLikes = !this.sortedByLikes
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
    hasSortBtn() {
      return this.isSpeakerSection && !this.hideSort
    },
    hasLikes() {
      return this.isSpeakerSection && !this.hideLikes
    },
    haveInfiniteLoading() {
      return this.data.length && this.haveScroll && !this.loadCompleted
    },
    isInfiniteLoadingTop() {
      return this.haveInfiniteLoading && !this.isSpeakerSection
    },
    isInfiniteLoadingBottom() {
      return this.haveInfiniteLoading && this.isSpeakerSection
    },
    sortText() {
      return this.sortedByLikes ? this.sortByLikes : this.sortByNew
    },
    arrowClass() {
      return {
        'chat-container__down-arrow_hidden': !this.showButton,
        'chat-container__top-arrow': this.isSpeakerSection,
      }
    },
    loadDataEmit() {
      return this.isInfiniteLoadingTop ? 'loadMoreMessages' : 'loadMoreQuestions'
    }
  },
  watch: {
    'data.length'() {
      if (!this.showButton && !this.isSpeakerSection) {
        this.scroll()
      }
    },
  },
}
</script>

<style lang="scss">
:root {
  --zeen-chat-scrollbar-width: 6px;
  --zeen-chat-scrollbar-thumb-borderradius: 4px;
  --zeen-chat-down-arrow-size: 40px;
  --zeen-chat-down-arrow-radius: 50%;
  --zeen-chat-down-arrow-bottom: var(--zeen-chat-md-gap);
  --zeen-chat-down-arrow-hidden-bottom: -50px;
  --zeen-chat-message-likes-gap: calc(var(--zeen-chat-down-arrow-bottom) / 2);
  --zeen-chat-message-likes-text-size: var(--main-smallest-text);
  --zeen-chat-message-likes-font-weight: 700;

  --zeen-chat-sort-wrapper-background-color: var(--gray-5);
  --zeen-chat-new-message-icon-bgcolor: var(--notify-color);
  --zeen-chat-message-like-text-color: var(--main-positive-color);
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

  &__sort-btn {
    --button-small-border-radius: 0;
    --button-small-background-private: var(--zeen-chat-sort-wrapper-background-color);
    --button-small-border-color-private: var(--zeen-chat-sort-wrapper-background-color);
    --button-small-color-private: var(--zeen-chat-message-like-text-color);
    --button-small-color: var(--zeen-chat-message-like-text-color);

    svg {
      fill: currentColor;
    }
  }

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
    padding: 0 var(--zeen-chat-lg-gap) var(--zeen-chat-xl-gap);

    &::-webkit-scrollbar {
      width: var(--zeen-chat-scrollbar-width);
    }

    /* Track */
    &::-webkit-scrollbar-track {
      background: transparent;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: transparent;
      border-radius: var(--zeen-chat-scrollbar-thumb-borderradius);
    }

    &:hover {
      &::-webkit-scrollbar-thumb {
        background: var(--zeen-chat-general-color);
      }
    }

    &__footer {
      display: flex;
    }

    &__like-text {
      color: var(--zeen-chat-message-like-text-color);
      margin: 0 var(--zeen-chat-message-likes-gap);
      font-size: var(--zeen-chat-message-likes-text-size);
      font-weight: var(--zeen-chat-message-likes-font-weight);
    }
  }

  &__down-arrow {
    &_hidden {
      bottom: var(--zeen-chat-down-arrow-hidden-bottom);
      transition: bottom 0.3s ease;
    }

    width: var(--zeen-chat-down-arrow-size);
    height: var(--zeen-chat-down-arrow-size);
    background: var(--zeen-chat-general-color);
    border-radius: var(--zeen-chat-down-arrow-radius);
    border: 0;
    position: absolute;
    margin: 0 auto;
    left: 0;
    right: 0;
    bottom: var(--zeen-chat-down-arrow-bottom);
    cursor: pointer;
    color: var(--zeen-chat-white);
    display: flex;
    transition: bottom 0.3s ease;

    svg {
      display: block;
      margin: auto;
      fill: currentColor;
    }
  }

  &__top-arrow {
    transform: rotate(-180deg);
  }
}
</style>
