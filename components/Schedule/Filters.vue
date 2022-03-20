<template lang="pug">
  section.filter
    LayoutsContainer(:key='`filters_mount${isMount}`')
      .filter__header
        h2.filter__title Фильтры
        UiButton(@click.prevent="reset" theme="fill-additional") Сбросить
      .filter__content
        .filter__col
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
        .filter__col
          //- выбор зала
          UiSelect(
            placeholder='Выберите зал'
            v-model='stream'
            :options='streamsData'
          )
      .filter__content
        .filter__col
          //- выбор спикера
          UiSelect(
            placeholder='Выберите спикера'
            v-model='speaker'
            :options='speakersData'
          )
        .filter__col
          //- поиск
          UiInput(v-model='text' autocomplete='off' placeholder='Поиск')
            template(#btn)
              SvgIcon.filter__search-icon(name="magnifier")
</template>

<script>
import {toStringTime} from '../../helpers/timeConverter'
import {SPEECH_TIME_FORMAT} from '../../store/speech'

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
          value: undefined,
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
          label: "Все",
          value: undefined,
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
        this.stream = null
      }
    },
    speaker(newVal) {
      if (!newVal) {
        return
      }
      if (!newVal?.value) {
        this.speaker = null
      }
    },
    filterData(newValue, oldValue) {
      if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
        this.$emit('filter', this.filterData)
      }
    },
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
      this.isMount = false
      this.text = ''
      this.speaker = null
      this.stream = null
      this.slider = [0, 0]
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/styles/mixins.scss';

.filter {
  --select-options-background-color: #000;
  --text-input-horizontal-padding: 25px;
  --select-border-radius: 5px;
  --text-input-border-radius: 5px;
  --select-placeholder-color: var(--gray-2);
  --select-arrow-color: var(--gray-2);
  --text-input-placeholder-color: var(--gray-2);
  --text-input-border-color: transparent;
  --text-input-background: var(--main-positive-color);

  background: #000;
  padding-top: 80px;
  padding-bottom: 20px;

  @include tablets {
    padding-top: 33px;
  }

  @include phones {
    --text-input-text-size: 14px;

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

  &__title {
    font-size: var(--main-large-size);
    line-height: 32px;
    font-weight: 700;
    color: var(--main-light);
  }

  &__content {
    display: flex;
    margin: 0 -10px;

    @include phones() {
      flex-direction: column;
    }
  }

  &__col {
    flex: 1 1 auto;
    width: 50%;
    padding: 10px 10px 0;
    align-content: center;
    justify-content: center;

    @include phones {
      width: 100%;
    }

    @include phones() {
      width: 100%;
    }
  }

  &__time {
    display: flex;
    position: relative;
    border-radius: 5px;

    ::v-deep {
      .vue-slider-dot-handle {
        box-shadow: none;
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

    &-col {
      width: 50%;
    }

    &-slider {
      position: absolute;
      bottom: 0;
      transform: translateY(50%);
      left: 0;
      right: 0;
    }
  }

  &__search-icon {
    max-width: 15px;
  }
}

.time-filter {
  --text-input-border-focus-color: transparent;
  --text-input-color: var(--gray-2);

  ::v-deep .zeen-text-input__input {
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
