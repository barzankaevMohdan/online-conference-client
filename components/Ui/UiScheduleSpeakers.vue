<template lang="pug">
  div.schedule-speakers
    .schedule-speakers__top(v-if="speakers.length")
      .schedule-speakers__title {{speakersWord}}:
      .schedule-speakers__actions(v-if='speakers.length > 2')
        slot(name="arrows")
          button.schedule-speakers__arrow.rotate(ref='btnPrev')
            SvgIcon(name="arrow-slider")
          button.schedule-speakers__arrow(ref='btnNext')
            SvgIcon(name="arrow-slider")
    .swiper-container(ref='slider' )
      .swiper-wrapper
        .swiper-slide(v-for='speaker in speakers' :key="speaker.id")
          UiSpeakerItem.schedule-speakers__speaker(:speaker='speaker')
</template>

<script>
import Swiper from 'swiper/bundle'

export default {
  name: 'ZeenScheduleSpeakers',
  props: {
    speakers: {
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
    opened: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      slider: null,
    }
  },
  computed: {
    speakersWord() {
      return this.speakers?.length > 1 ? this.speakersText.speakers : this.speakersText.speaker
    },
  },
  watch: {
    opened() {
      this.initSlider()
    },
    speakers() {
      setTimeout(() => {
        this.updateSlider()
      }, 1000)
    },
  },
   destroyed() {
    this.slider?.destroy(true, true)
  },
  methods: {
    initSlider() {
      const config = {
        slidesPerView: 1.5,
        spaceBetween: 20,
        navigation: {
          prevEl: this.$refs.btnPrev,
          nextEl: this.$refs.btnNext,
        },
        breakpoints: {
          320: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
        },
      }
      this.slider = new Swiper(this.$refs.slider, config)
      this.updateSlider()
    },
    async updateSlider() {
      if (!this.slider) {
        return
      }
      await this.$nextTick()
      this.slider.update()
    },
  },
}
</script>

<style lang="scss">
@import '../../styles/mixins.scss';

:root {
  /* Размеры */
  --zeen-schedule-speakers-top-margin-bottom: 30px;
  --zeen-schedule-speakers-title-size: var(--main-bigger-size);
  --zeen-schedule-speakers-title-font-weight: 500;
  --zeen-schedule-speakers-title-line-height: 1.33;
  --zeen-schedule-speakers-arrow-margin-right: 25px;

  /* Цвета */
  --zeen-schedule-speakers-title-color: var(--main-text-color);
  --zeen-schedule-speakers-speaker-color: var(--gray-4);
}
</style>

<style lang="scss" scoped>
@import '../../styles/mixins.scss';

.schedule-speakers {
  &__actions {
    @include phones {
      display: none;
    }
  }

  &__top {
    display: flex;
    justify-content: space-between;
    margin-bottom: var(--zeen-schedule-speakers-top-margin-bottom);
  }

  &__title {
    font-weight: var(--zeen-schedule-speakers-title-font-weight);
    font-size: var(--zeen-schedule-speakers-title-size);
    line-height: var(--zeen-schedule-speakers-title-line-height);
    color: var(--zeen-schedule-speakers-title-color);
  }

  &__arrow {
    background-color: transparent;
    padding: 0;
    outline: none;
    border: 0;
    cursor: pointer;
    fill: var(--action-icon-color);
    &.rotate {
      margin-right: var(--zeen-schedule-speakers-arrow-margin-right);
      transform: rotateY(180deg);
    }
    &:hover {
      fill: var(--action-icon-hover-color);
    }
    &:focus {
      fill: var(--action-icon-focus-color);
    }
    &:active {
      fill: var(--action-icon-active-color);
    }
    &:disabled {
      cursor: auto;
      fill: var(--action-icon-disable-color);
    }
  }
  &__speaker {
    --speaker-item-post-color: var(--zeen-schedule-speakers-speaker-color);
  }
}
</style>
