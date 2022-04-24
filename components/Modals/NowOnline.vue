<template lang="pug">
UiModal.schedule-modal(name="now-online" @opened="opened = true")
    template(#title) Сейчас онлайн
    a.schedule-modal__more(@click.prevent="followToSchedule") Расписание
    .schedule-modal__list
      template(v-if='streamsWithSpeechesAndSpeakers')
        .schedule-modal__item(v-for='(hall, index) in streamsWithSpeechesAndSpeakers' :key="index")
          .schedule-modal__item-hall {{hall.name}}
          template(v-for="(speech, speechIndex) in hall.speeches")
            template(v-if="speech.status === 'online'")
              .schedule-modal__item-info
                span.schedule-modal__item-time
                  | {{speech.time_begin}}-{{speech.time_end}}
                .schedule-modal__item-title {{speech.title}}
              .schedule-modal__speaker
                UiScheduleSpeakers(
                  :speakers='speech.speakers'
                  :key='speech.speakers.id'
                  :opened='opened'
                )
              UiButton.schedule-modal__item-btn(
                @click="watchSpeech({hall, speech})"
              ) Сейчас онлайн
          template(v-if="!hasOnlineOrNot[index].includes(true)")
            .schedule-modal__item-title Сейчас нету онлайн стримов
            UiButton.schedule-modal__item-btn(@click="followToHall(hall)") Перейти в зал
</template>

<script>
import streamsWithSpeechesAndSpeakers from '~/mixins/streamsWithSpeechesAndSpeakers'

export default {
  name: 'NowOnline',
  mixins: [streamsWithSpeechesAndSpeakers],
  data() {
    return {
      opened: false,
    }
  },
  methods: {
    close() {
      this.$vfm.hide('now-online')
    },
    followToSchedule() {
      this.$router.push('schedule')
      this.close()
    },
    followToHall(stream) {
      this.$router.push(`/stream/${stream.id}`)
      this.close()
    },
    watchSpeech(data) {
      this.$router.push(`/stream/${data.hall.id}`)
      this.close()
    },
  },
  computed: {
    hasOnlineOrNot() {
      return this.streamsWithSpeechesAndSpeakers.map((stream) => {
        return stream.speeches.map((speech) => speech.status === 'online')
      })
    },
  },
}
</script>

<style lang="scss">
@import '~/styles/mixins.scss';

:root {
  /* Размеры */
  --schedule-modal-more-size: 16px;
  --schedule-modal-more-margin-top: 10px;
  --schedule-modal-item-padding: 40px;
  --schedule-modal-item-border-size: 1px;
  --schedule-modal-hall-size: 24px;
  --schedule-modal-hall-margin-bottom: 20px;
  --schedule-modal-hall-max-width: 75%;
  --schedule-modal-time-size: 14px;
  --schedule-modal-speach-title-size: 18px;
  --schedule-modal-btn-margin-top: 40px;

  @include phones {
    --schedule-modal-more-size: 14px;
    --schedule-modal-item-padding: 30px;
    --schedule-modal-hall-margin-bottom: 10px;
    --schedule-modal-hall-max-width: 100%;
    --schedule-modal-btn-margin-top: 30px;
  }

  /* Цвета */
  --schedule-modal-title-color: var(--main-light);
  --schedule-modal-more-color: var(--main-color);
  --schedule-modal-hall-color: var(--main-light);
  --schedule-modal-time-color: var(--gray-2);
  --schedule-modal-speach-title-color: var(--main-light);
  --schedule-modal-item-border-color: var(--dark-1);
}
</style>

<style scoped lang="scss">
@import '~/styles/mixins.scss';

.schedule-modal {
  --modal-description-margin-vertical: 0;

  &__more {
    position: relative;
    display: flex;
    width: fit-content;
    font-weight: 600;
    font-size: var(--schedule-modal-more-size);
    line-height: 1.37;
    color: var(--schedule-modal-more-color);
    margin-top: var(--schedule-modal-more-margin-top);
    cursor: pointer;
    text-decoration: none;
    &:before {
      position: absolute;
      content: '';
      width: 100%;
      height: 1px;
      background: var(--schedule-modal-more-color);
      top: 100%;
      left: 0;
    }
  }

  &__item {
    padding: var(--schedule-modal-item-padding) 0;
    border-bottom: var(--schedule-modal-item-border-size) solid var(--schedule-modal-item-border-color);

    &:last-of-type {
      border: none;
      padding-bottom: 0;
    }
  }

  &__item-hall {
    font-weight: 700;
    font-size: var(--schedule-modal-hall-size);
    line-height: 1.33;
    color: var(--schedule-modal-hall-color);
    margin-bottom: var(--schedule-modal-hall-margin-bottom);
    max-width: var(--schedule-modal-hall-max-width);
  }

  &__item-info {
    display: flex;
    flex-direction: column;
    margin-bottom: var(--schedule-modal-btn-margin-top);
  }

  &__item-time {
    font-weight: 400;
    font-size: var(--schedule-modal-time-size);
    line-height: 1.71;
    color: var(--schedule-modal-time-color);
  }

  &__item-title {
    font-weight: 600;
    font-size: var(--schedule-modal-speach-title-size);
    line-height: 1.33;
    color: var(--schedule-modal-speach-title-color);
  }

  &__item-btn {
    margin-top: var(--schedule-modal-btn-margin-top);
    width: 100%;
  }
}
</style>

