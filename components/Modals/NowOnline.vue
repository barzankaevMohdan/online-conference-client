<template lang="pug">
UiModal.schedule-modal(name="now-online" @opened="opened = true")
  .schedule-modal__main
    .schedule-modal__title Сейчас онлайн
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
  --schedule-modal-padding-top: 50px;
  --schedule-modal-padding-horizon: 50px;
  --schedule-modal-padding-bottom: 50px;
  --schedule-modal-description-margin-vertical: 0;
  --schedule-modal-title-size: 36px;
  --schedule-modal-title-line-height: 1.16;
  --schedule-modal-title-font-weight: 700;
  --schedule-modal-more-size: 16px;
  --schedule-modal-more-line-height: 1.37;
  --schedule-modal-more-font-weight: 600;
  --schedule-modal-more-margin-top: 10px;
  --schedule-modal-item-padding: 40px;
  --schedule-modal-item-border-size: 1px;
  --schedule-modal-hall-size: 24px;
  --schedule-modal-hall-line-height: 1.33;
  --schedule-modal-hall-font-weight: 700;
  --schedule-modal-hall-margin-bottom: 20px;
  --schedule-modal-hall-max-width: 75%;
  --schedule-modal-time-size: 14px;
  --schedule-modal-time-line-height: 1.71;
  --schedule-modal-time-font-weight: 400;
  --schedule-modal-speach-title-size: 18px;
  --schedule-modal-speach-title-line-height: 1.33;
  --schedule-modal-speach-title-font-weight: 600;
  --schedule-modal-btn-margin-top: 40px;

  @include phones {
    --schedule-modal-padding-horizon: 30px;
    --schedule-modal-padding-bottom: 40px;
    --schedule-modal-title-size: 24px;
    --schedule-modal-title-line-height: 1.33;
    --schedule-modal-more-size: 14px;
    --schedule-modal-more-line-height: 1.42;
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
  --modal-padding-top: var(--schedule-modal-padding-top);
  --modal-padding-horizon: var(--schedule-modal-padding-horizon);
  --modal-padding-bottom: var(--schedule-modal-padding-bottom);
  --modal-description-margin-vertical: var(--schedule-modal-description-margin-vertical);

  &__title {
    font-weight: var(--schedule-modal-title-font-weight);
    font-size: var(--schedule-modal-title-size);
    line-height: var(--schedule-modal-title-line-height);
    color: var(--schedule-modal-title-color);
  }

  &__more {
    position: relative;
    display: flex;
    width: fit-content;
    font-weight: var(--schedule-modal-more-font-weight);
    font-size: var(--schedule-modal-more-size);
    line-height: var(--schedule-modal-more-line-height);
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
    font-weight: var(--schedule-modal-hall-font-weight);
    font-size: var(--schedule-modal-hall-size);
    line-height: var(--schedule-modal-hall-line-height);
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
    font-weight: var(--schedule-modal-time-font-weight);
    font-size: var(--schedule-modal-time-size);
    line-height: var(--schedule-modal-time-line-height);
    color: var(--schedule-modal-time-color);
  }

  &__item-title {
    font-weight: var(--schedule-modal-speach-title-font-weight);
    font-size: var(--schedule-modal-speach-title-size);
    line-height: var(--schedule-modal-speach-title-line-height);
    color: var(--schedule-modal-speach-title-color);
  }

  &__item-btn {
    margin-top: var(--schedule-modal-btn-margin-top);
    width: 100%;
  }

  &__speakers {
    margin-top: var(--schedule-modal-btn-margin-top);
  }
}
</style>

