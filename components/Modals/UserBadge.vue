<template lang="pug">
  UiModal.user-badge(
    name='user-badge'
    @beforeOpen="beforeOpen"
  )
    .user-badge__part
      UiAvatar.user-badge__avatar(
        :userName='userBadge.name'
        :size='100'
        :src='userBadge.picture'
      )
      .user-badge__block
        .user-badge__name {{ userBadge.name }}
        .user-badge__message {{ message.text }}
    UiButton.user-badge__btn(
      @click='deleteMessage'
      :isLoading='isLoading'
    ) Удалить сообщение
</template>

<script>
import { ACTIONS } from '~/helpers/socketActions'
import socketIO from "~/mixins/socketIO"

export default {
  name: 'ModalsUserBadge',
  mixins: [socketIO],
  data() {
    return {
      userBadge: {},
      message: {},
      isLoading: false,
    }
  },
  mounted() {
    this.socket.on(ACTIONS.DELETE_MESSAGE, (id) => {
      console.log(ACTIONS.DELETE_MESSAGE, id)
      this.$store.commit('chat/deleteMessage', id)
    })
  },
  methods: {
    async deleteMessage() {
      this.isLoading = true
      this.socket.emit(ACTIONS.DELETE_MESSAGE, this.message.id)
      await this.$store.dispatch('chat/deleteMessage', this.message.id)
      this.isLoading = false
      this.$vfm.hide('user-badge')
    },
    beforeOpen(event) {
      const data = JSON.parse(JSON.stringify(event.ref.params))
      this.userBadge = data.user
      this.message = data
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/styles/mixins.scss';
.user-badge {
  --modal-padding-top: 40px;
  --modal-description-margin-vertical: 0;
  --modal-padding-bottom: 40px;

  @include phones {
    --modal-padding-top: 30px;
    --modal-padding-bottom: 30px;
    --modal-padding-horizon: 30px;
  }

  &__part {
    display: flex;
    flex-shrink: 0;
    align-items: center;

    @include phones {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  &__avatar {
    flex-shrink: 0;
    margin-right: 24px;

    @include phones {
      margin: 0 0 15px 0;
      justify-content: flex-start;
    }
  }

  &__name {
    font-size: var(--main-large-size);
    font-weight: 600;
    margin-bottom: 10px;

    @include phones {
      margin-bottom: 15px;
    }
  }

  &__message {
    font-weight: normal;
    font-size: 14px;
    line-height: 1.5;
    color: var(--gray-4);
  }

  &__btn {
    width: 100%;
    margin-top: 20px;
  }
}
</style>

