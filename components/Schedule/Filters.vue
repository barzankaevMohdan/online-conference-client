<template lang="pug">
  section.filter
    LayoutsContainer(:key='`filters_mount${isMount}`')
      .filter__header
        UiHeadline(tag='h4') Фильтры

        UiButton(@click.prevent="reset" theme="fill-additional") Сбросить

      .filter__content
        //- временной интервал
        .filter__time
          .filter__time-col
            UiInput.time-filter.time-filter_start(:value='fromValue' readonly)

          .filter__time-col
            UiInput.time-filter.time-filter_end(:value='toValue' readonly)

          .filter__time-slider
            VueSlider(
              v-model="slider"
              :min="range[0]"
              :max="range[1]"
              tooltip="none"
              :disabled="range[0] === range[1]"
              :interval="interval"
            )
        //- выбор зала
        UiSelect(
          placeholder='Выберите зал'
          v-model='stream'
          :options='streamsData'
        )
        //- выбор спикера
        UiSelect(
          placeholder='Выберите спикера'
          v-model='speaker'
          :options='speakersData'
        )
        //- поиск
        UiInput(v-model='text' autocomplete='off' placeholder='Поиск')
          template(#btn)
            SvgIcon.filter__search-icon(name="magnifier")

</template>

<script>
import {toStringTime} from '~/helpers/timeConverter'
import {SPEECH_TIME_FORMAT} from '~/store/speech'

export default {
  name: 'ScheduleFilters',
  props: {
    speakers: Array,
    streams: Array,
    range: {
      type: Array,
      default: () => [0, 0],
    },
  },
  data() {
    return {
      isMount: false,
      text: '',
      speaker: null,
      stream: null,
      slider: [0, 0],
    }
  },
  mounted() {
    this.isMount = true
    this.initRang()
  },
  methods: {
    initRang() {
      const [rMin = 0, rMax = 0] = this.range
      const [sMin, sMax] = this.slider
      const inRange = (count) => {
        return rMin <= count && count <= rMax
      }
      const newMin = inRange(sMin) ? sMin : rMin
      const newMax = inRange(sMax) ? sMax : rMax

      this.slider = [newMin, newMax]
    },
    reset() {
      this.speaker = null
      this.stream = null
      this.slider = [0, 0]
      this.text = ''
    },
  },
  computed: {
    interval() {
      return 1
    },
    fromValue() {
      return toStringTime(this.slider[0] * 60 * 1000, SPEECH_TIME_FORMAT)
    },
    toValue() {
      return toStringTime(this.slider[1] * 60 * 1000, SPEECH_TIME_FORMAT)
    },
    speakersData() {
      return [
        {
          label: 'Все',
          value: null,
        },
        ...this.speakers.map((speaker) => {
          return {
            label: speaker.name,
            value: speaker.id,
          }
        }),
      ]
    },
    streamsData() {
      return [
        {
          label: 'Все',
          value: null,
        },
        ...this.streams.map((stream) => {
          return {
            label: stream.name,
            value: stream.id,
          }
        }),
      ]
    },
    filterData() {
      return {
        fromTime: this.slider[0],
        toTime: this.slider[1],
        text: this.text || undefined,
        speaker: this.speaker?.value,
        stream: this.stream?.value,
      }
    },
  },
  watch: {
    range() {
      this.initRang()
    },
    stream(newVal) {
      if (!newVal) {
        return
      }
      if (!newVal?.value) {
        this.reset()
      }
    },
    speaker(newVal) {
      if (!newVal) {
        return
      }
      if (!newVal?.value) {
        this.reset()
      }
    },
    filterData(newValue, oldValue) {
      if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
        this.$emit('filter', this.filterData)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/styles/mixins.scss';

.filter {
  --select-border-radius: 5px;
  --text-input-border-radius: 5px;
  --select-placeholder-color: var(--gray-2);
  --select-arrow-color: var(--gray-2);
  --text-input-placeholder-color: var(--gray-2);
  --text-input-border-color: transparent;
  --select-border-color: transparent;
  --text-input-background: var(--main-positive-color);
  --select-background-color: var(--main-positive-color);

  background: var(--dark-2);
  padding-top: 80px;
  padding-bottom: 20px;

  @include tablets {
    padding-top: 33px;
  }

  @include phones {
    padding-top: 20px;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--main-positive-color);
    padding-bottom: 20px;

    @include phones {
      display: none;
    }
  }

  &__content {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 10px;
    grid-row-gap: 15px;
    margin-top: 15px;

    @include phones {
      grid-template-columns: repeat(1, 1fr);
      grid-column-gap: 0;
    }
  }

  &__time {
    position: relative;
    display: flex;

    ::v-deep {
      .vue-slider-dot-handle {
        background: var(--main-color);
        width: 16px;
        height: 16px;
        border-radius: 100%;
        cursor: pointer;
      }

      .vue-slider-process {
        background: var(--main-color);
      }
    }
  }

  &__time-col {
    width: 50%;
  }

  &__time-slider {
    position: absolute;
    bottom: 0;
    transform: translateY(50%);
    left: 0;
    right: 0;
  }

  &__search-icon {
    fill: var(--gray-2);
    max-width: 15px;
    max-height: 15px;
  }
}

.time-filter {
  --text-input-border-base-focus-color: transparent;
  --text-input-color: var(--gray-2);

  ::v-deep .text-input__input {
    text-align: center;
  }

  &_start {
    border-right: 1px solid #363636;

    ::v-deep .zeen-text-input__input {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }

  &_end {
    ::v-deep .zeen-text-input__input {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
}
</style>
