<template lang="pug">
UiModal.schedule-modal(:name="name" @opened="opened = true")
  .schedule-modal__main
    .schedule-modal__title
      slot(name="title")
    a.schedule-modal__more(@click.prevent="followToSchedule")
      slot(name="fullScheduleText")
    .schedule-modal__list
      template(v-if='streams')
        .schedule-modal__item(v-for='(hall, index) in streams' :key="index")
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
                  :speakersText="speakersText"
                )
              UiButton.schedule-modal__item-btn(
                v-if='speech.status === "online"'
                @click="watchSpeech({hall, speech})"
              )
                slot(name="buttonOnlineText")
          template(v-if="!hasOnlineOrNot[index].includes(true)")
            .schedule-modal__item-title
              slot(name="offlineText")
            UiButton.schedule-modal__item-btn(@click="followToHall(hall)")
              slot(name="buttonOfflineText")
</template>

<script>

export default {
  name: 'UiScheduleModal',
  props: {
    name: {
      type: String,
      require: true,
    },
    streams: {
      type: Array,
      default: () => [],
    },
    speakersText: {
      type: Object,
      default() {
        return {
          speaker: 'Спикер',
          speakers: 'Спикеры',
        }
      },
    },
  },
  data() {
    return {
      opened: false,
    }
  },
  methods: {
    watchSpeech(data) {
      this.$emit('watchSpeech', data)
    },
    followToHall(data) {
      this.$emit('followToHall', data)
    },
    followToSchedule() {
      this.$emit('followToSchedule')
    },
  },
  computed: {
    hasOnlineOrNot() {
      return this.streams.map((stream) => {
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
  --zeen-schedule-modal-padding-top: 50px;
  --zeen-schedule-modal-padding-horizon: 50px;
  --zeen-schedule-modal-padding-bottom: 50px;
  --zeen-schedule-modal-description-margin-vertical: 0;
  --zeen-schedule-modal-title-size: 36px;
  --zeen-schedule-modal-title-line-height: 1.16;
  --zeen-schedule-modal-title-font-weight: 700;
  --zeen-schedule-modal-more-size: 16px;
  --zeen-schedule-modal-more-line-height: 1.37;
  --zeen-schedule-modal-more-font-weight: 500;
  --zeen-schedule-modal-more-margin-top: 10px;
  --zeen-schedule-modal-item-padding: 40px;
  --zeen-schedule-modal-item-border-size: 1px;
  --zeen-schedule-modal-hall-size: 24px;
  --zeen-schedule-modal-hall-line-height: 1.33;
  --zeen-schedule-modal-hall-font-weight: 700;
  --zeen-schedule-modal-hall-margin-bottom: 20px;
  --zeen-schedule-modal-hall-max-width: 75%;
  --zeen-schedule-modal-time-size: 14px;
  --zeen-schedule-modal-time-line-height: 1.71;
  --zeen-schedule-modal-time-font-weight: 400;
  --zeen-schedule-modal-speach-title-size: 18px;
  --zeen-schedule-modal-speach-title-line-height: 1.33;
  --zeen-schedule-modal-speach-title-font-weight: 500;
  --zeen-schedule-modal-btn-margin-top: 40px;

  @include phones {
    --zeen-schedule-modal-padding-horizon: 30px;
    --zeen-schedule-modal-padding-bottom: 40px;
    --zeen-schedule-modal-title-size: 24px;
    --zeen-schedule-modal-title-line-height: 1.33;
    --zeen-schedule-modal-more-size: 14px;
    --zeen-schedule-modal-more-line-height: 1.42;
    --zeen-schedule-modal-item-padding: 30px;
    --zeen-schedule-modal-hall-margin-bottom: 10px;
    --zeen-schedule-modal-hall-max-width: 100%;
    --zeen-schedule-modal-btn-margin-top: 30px;
  }

  /* Цвета */
  --zeen-schedule-modal-title-color: var(--dark-1);
  --zeen-schedule-modal-more-color: var(--main-color);
  --zeen-schedule-modal-hall-color: var(--main-text-color);
  --zeen-schedule-modal-time-color: var(--gray-2);
  --zeen-schedule-modal-speach-title-color: var(--main-text-color);
  --zeen-schedule-modal-item-border-color: var(--gray-1);
}
</style>

<style scoped lang="scss">
@import '~/styles/mixins.scss';

.schedule-modal {
  --modal-padding-top: var(--zeen-schedule-modal-padding-top);
  --modal-padding-horizon: var(--zeen-schedule-modal-padding-horizon);
  --modal-padding-bottom: var(--zeen-schedule-modal-padding-bottom);
  --modal-description-margin-vertical: var(--zeen-schedule-modal-description-margin-vertical);

  &__title {
    font-weight: var(--zeen-schedule-modal-title-font-weight);
    font-size: var(--zeen-schedule-modal-title-size);
    line-height: var(--zeen-schedule-modal-title-line-height);
    color: var(--zeen-schedule-modal-title-color);
  }

  &__more {
    position: relative;
    display: flex;
    width: fit-content;
    font-weight: var(--zeen-schedule-modal-more-font-weight);
    font-size: var(--zeen-schedule-modal-more-size);
    line-height: var(--zeen-schedule-modal-more-line-height);
    color: var(--zeen-schedule-modal-more-color);
    margin-top: var(--zeen-schedule-modal-more-margin-top);
    cursor: pointer;
    text-decoration: none;
    &:before {
      position: absolute;
      content: '';
      width: 100%;
      height: 1px;
      background: var(--zeen-schedule-modal-more-color);
      top: 100%;
      left: 0;
    }
  }

  &__item {
    padding: var(--zeen-schedule-modal-item-padding) 0;
    border-bottom: var(--zeen-schedule-modal-item-border-size) solid var(--zeen-schedule-modal-item-border-color);

    &:last-of-type {
      border: none;
      padding-bottom: 0;
    }
  }

  &__item-hall {
    font-weight: var(--zeen-schedule-modal-hall-font-weight);
    font-size: var(--zeen-schedule-modal-hall-size);
    line-height: var(--zeen-schedule-modal-hall-line-height);
    color: var(--zeen-schedule-modal-hall-color);
    margin-bottom: var(--zeen-schedule-modal-hall-margin-bottom);
    max-width: var(--zeen-schedule-modal-hall-max-width);
  }

  &__item-info {
    display: flex;
    flex-direction: column;
  }

  &__item-time {
    font-weight: var(--zeen-schedule-modal-time-font-weight);
    font-size: var(--zeen-schedule-modal-time-size);
    line-height: var(--zeen-schedule-modal-time-line-height);
    color: var(--zeen-schedule-modal-time-color);
  }

  &__item-title {
    font-weight: var(--zeen-schedule-modal-speach-title-font-weight);
    font-size: var(--zeen-schedule-modal-speach-title-size);
    line-height: var(--zeen-schedule-modal-speach-title-line-height);
    color: var(--zeen-schedule-modal-speach-title-color);
  }

  &__item-btn {
    margin-top: var(--zeen-schedule-modal-btn-margin-top);
    width: 100%;
  }

  &__speakers {
    margin-top: var(--zeen-schedule-modal-btn-margin-top);
  }
}
</style>
