<template lang="pug">
  .schedule-card(
    v-if="speech && speech.status"
    @click="cardClick"
    :class="[`schedule-card__${speech.status}`, `schedule-card__${speech.status}`]"
    :style="cardStyles"
  )
    .schedule-card__wrapper-text
      p.schedule-card__title(v-if="speech.title" :class="{'schedule-card__title_mini': cardSizeHandler === 1}") {{speech.title}}
      span.schedule-card__time.schedule-card__time_mini(
        v-if="speech.time_begin && cardSizeHandler === 1"
      ) {{speech.time_begin}}-{{speech.time_end}}
      template(v-if="cardSizeHandler > 1")
        p.schedule-card__subtitle(
          v-if="speakers === 1"
        ) {{speech.speakers[0].name}}
        p.schedule-card__subtitle(
          v-else-if="speakers > 1"
        ) {{speech.speakers[0].name + ', '}}{{speech.speakers[1].name}}
        span.schedule-card__subtitle(
          v-if="speakers >  2"
        ) {{`+ ${speakers - 2} ${speakersWord}`}}
    .schedule-card__footer(
      :class="{'schedule-card__footer_mini': cardSizeHandler === 2}"
    )
      .schedule-card__live(v-if="speech.status === 'online'")
        slot(name="live-icon")
          SvgIcon.schedule-card__live-img(name="online-icon")
        span.schedule-card__live-text(v-if="cardSizeHandler === 3") LIVE
      span.schedule-card__time(
        v-if="speech.time_begin && cardSizeHandler > 1"
      ) {{speech.time_begin}}-{{speech.time_end}}
      span(v-if="cardSizeHandler === 1 && speech.status !== 'online'")
      span.schedule-card__button(@click.stop="cardButton")
        template(v-if="speech.status === 'done'")
          slot(name="button-icon-done")
            SvgIcon.schedule-card__button(name="card-button-icon-done")
        template(v-else)
          slot(name="button-icon")
            SvgIcon.schedule-card__button(name="card-button-icon")
</template>

<script>
export default {
  name: 'ScheduleCard',
  props: {
    hall: {
      type: Object,
      default: () => {},
    },
    speech: {
      type: Object,
      default: () => {},
    },
    width: {
      type: Object,
    },
    coords: {
      type: Array,
      default: () => [],
    },
    speakersText: {
      type: Object,
      default() {
        return {
          speaker: 'спикер',
          speakers: 'спикера',
        }
      },
    },
  },
  computed: {
    dataForEmit() {
      return {
        speech: this.speech ?? '',
        hall: this.hall ?? '',
      }
    },
    cardSizeHandler() {
      switch (this.cardWidth.steps) {
        case 2:
          return 2
        case 1:
          return 1
        default:
          return 3
      }
    },
    speakersWord() {
      return this.speakers < 2 ? this.speakersText.speaker : this.speakersText.speakers
    },
    speakers() {
      return this.speech.speakers?.length ?? 0
    },
    cardWidth() {
      if (this.speech?.time_begin && this.speech?.time_end) {
        let idxStart
        let idxEnd
        this.width?.timeArray?.forEach((step, idx) => {
          if (step === this.speech.time_begin) {
            idxStart = idx
          }
          if (step === this.speech.time_end) {
            idxEnd = idx
          }
        })
        const steps = idxEnd - idxStart
        const width = this.width?.width * steps - 5
        return {width, steps}
      }
      return 0
    },
    position() {
      if (this.speech.time_begin && this.coords.length) {
        const coordObj = this.coords.find((item) => item.time === this.speech.time_begin)
        return coordObj?.coord ?? 0
      }
      return 0
    },
    cardStyles() {
      return {
        width: this.cardWidth?.width ? this.cardWidth.width + 'px' : undefined,
        left: this.position + 'px',
      }
    },
  },
  methods: {
    cardClick() {
      this.$emit('cardClick', this.dataForEmit)
    },
    cardButton() {
      this.$emit('cardButtonClick', this.dataForEmit)
    },
  },
}
</script>

<style lang="scss">
@import '~/styles/mixins.scss';
:root {
  /* Размеры */
  --zeen-schedule-card-min-width: 110px;
  --zeen-schedule-card-padding-vertical: var(--main-padding);
  --zeen-schedule-card-padding-horizontal: var(--main-padding);
  --zeen-schedule-card-border-radius: 5px;

  --zeen-schedule-card-title-size: var(--main-small-text);
  --zeen-schedule-card-title-line-height: 1.42;
  --zeen-schedule-card-title-font-weight: 500;

  --zeen-schedule-card-subtitle-size: var(--main-smallest-text);
  --zeen-schedule-card-subtitle-line-height: 1.5;
  --zeen-schedule-card-subtitle-font-weight: 400;
  --zeen-schedule-card-subtitle-margin-top: 10px;

  --zeen-schedule-card-live-padding-vertical: 4px;
  --zeen-schedule-card-live-padding-horizontal: 5px;
  --zeen-schedule-card-live-margin-right: 10px;
  --zeen-schedule-card-live-border-radius: 5px;
  --zeen-schedule-card-live-img-size: var(--action-icon-min-width-middle);
  --zeen-schedule-card-live-text: var(--main-smallest-text);
  --zeen-schedule-card-live-text-line-height: 1.33;
  --zeen-schedule-card-live-text-font-weight: 600;
  --zeen-schedule-card-live-text-margin-left: 4px;

  --zeen-schedule-card-time-text: var(--main-small-text);
  --zeen-schedule-card-time-text-line-height: 1.42;
  --zeen-schedule-card-time-text-font-weight: 400;

  --zeen-schedule-card-button-size: 16px;
  --zeen-schedule-card-footer-margin-top: 30px;

  @include phones {
    --zeen-schedule-card-padding-vertical: 10px;
    --zeen-schedule-card-padding-horizontal: 15px;
    --zeen-schedule-card-live-text: 10px;
    --zeen-schedule-card-live-text-line-height: 1.4;
  }

  /* Цвета */
  --zeen-schedule-card-color: var(--main-color);
  --zeen-schedule-card-color-hold: rgba(24, 24, 24, 0.9);
  --zeen-schedule-card-color-done: rgba(24, 24, 24, 0.9);
  --zeen-schedule-card-box-shadow-color: rgba(0, 0, 0, 0.05);

  --zeen-schedule-card-live-color: var(--main-light);
  --zeen-schedule-card-text-color: var(--main-light);
  --zeen-schedule-card-text-color-hold: var(--main-text-color);
  --zeen-schedule-card-text-color-done: var(--dark-1);

  --zeen-schedule-card-live-img-color: var(--main-danger-color);
  --zeen-schedule-card-button-color: var(--main-light);
  --zeen-schedule-card-button-color-hold: var(--main-color);
  --zeen-schedule-card-button-color-done: var(--main-color);
}
</style>

<style scoped lang="scss">
@import '../../styles/mixins.scss';

.schedule-card {
  box-sizing: border-box;
  min-width: var(--zeen-schedule-card-min-width);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: var(--zeen-schedule-card-padding-vertical) var(--zeen-schedule-card-padding-horizontal);
  background: var(--zeen-schedule-card-color);
  border-radius: var(--zeen-schedule-card-border-radius);
  box-shadow: 0px 3px 20px var(--zeen-schedule-card-box-shadow-color);
  cursor: pointer;

  &__wrapper-text {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }

  &__title {
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;

    margin: 0;
    font-size: var(--zeen-schedule-card-title-size);
    line-height: var(--zeen-schedule-card-title-line-height);
    font-weight: var(--zeen-schedule-card-title-font-weight);
    color: var(--zeen-schedule-card-text-color);
  }

  &__subtitle {
    margin: 0;
    font-size: var(--zeen-schedule-card-subtitle-size);
    line-height: var(--zeen-schedule-card-subtitle-line-height);
    font-weight: var(--zeen-schedule-card-subtitle-font-weight);
    color: var(--zeen-schedule-card-text-color);
    margin-top: var(--zeen-schedule-card-subtitle-margin-top);
    &:nth-child(3) {
      margin-top: 0;
    }
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: var(--zeen-schedule-card-footer-margin-top);
    &_mini {
      .schedule-card__time {
        flex: 0 0 auto;
      }
      .schedule-card__live {
        margin-right: 0;
      }
    }
  }

  &__live {
    flex: 0 0 auto;
    padding: var(--zeen-schedule-card-live-padding-vertical) var(--zeen-schedule-card-live-padding-horizontal);
    margin-right: var(--zeen-schedule-card-live-margin-right);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background: var(--zeen-schedule-card-live-color);
    border-radius: var(--zeen-schedule-card-live-border-radius);
  }

  &__live-img {
    width: var(--zeen-schedule-card-live-img-size);
    height: var(--zeen-schedule-card-live-img-size);
    fill: var(--zeen-schedule-card-live-img-color);
  }

  &__live-text {
    font-size: var(--zeen-schedule-card-live-text);
    line-height: var(--zeen-schedule-card-live-text-line-height);
    font-weight: var(--zeen-schedule-card-live-text-font-weight);
    color: var(--zeen-schedule-card-live-img-color);
    margin-left: var(--zeen-schedule-card-live-text-margin-left);
  }

  &__time {
    flex: 1 1 auto;
    color: var(--zeen-schedule-card-text-color);
    font-size: var(--zeen-schedule-card-time-text);
    line-height: var(--zeen-schedule-card-time-text-line-height);
    font-weight: var(--zeen-schedule-card-time-text-font-weight);
    white-space: nowrap;
    &_mini {
      margin-top: 10px;
    }
  }

  &__button {
    width: var(--zeen-schedule-card-button-size);
    height: var(--zeen-schedule-card-button-size);
    fill: var(--zeen-schedule-card-button-color);
    cursor: pointer;
  }

  &__hold {
    background: var(--zeen-schedule-card-color-hold);
    .schedule-card__title {
      color: var(--zeen-schedule-card-text-color-hold);
    }
    .schedule-card__subtitle {
      color: var(--zeen-schedule-card-text-color-hold);
    }
    .schedule-card__time {
      color: var(--zeen-schedule-card-button-color-hold);
    }
    .schedule-card__button {
      fill: var(--zeen-schedule-card-button-color-hold);
    }
  }

  &__done {
    background: var(--zeen-schedule-card-color-done);
    .schedule-card__title {
      color: var(--zeen-schedule-card-text-color-done);
    }
    .schedule-card__subtitle {
      color: var(--zeen-schedule-card-text-color-done);
    }
    .schedule-card__time {
      color: var(--zeen-schedule-card-text-color-done);
    }
    .schedule-card__button {
      fill: var(--zeen-schedule-card-button-color-done);
    }
  }
}
</style>
