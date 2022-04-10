<template lang="pug">
  section.stream-group
    LayoutsContainer
      div(v-for='(speeches, streamId) in groupSpeeches')
        .stream-group__content(:class="{'stream-group__collapsed': !programVisible.includes(streamId)}")
          .stream-group__header(@click="showProgramm(streamId)")
            div(v-if='streamsInSchedule[streamId]')
              span.stream-group__time(v-if='getMinMaxDate(streamId)') {{getMinMaxDate(streamId)[0]}} - {{getMinMaxDate(streamId)[1]}}
              h3.stream-group__title {{streamsInSchedule[streamId].name}}
            SvgIcon.stream-group__icon(name='arrow')

          transition(name="slide")
            .stream-group__speeches(v-show="!programVisible.includes(streamId)")
              .stream-group__speech(v-for='speech in speeches')
                .stream-group__time-speech.stream-group__time-speech_desktop {{speech.time_begin}} - {{speech.time_end}}
                .stream-group__content-speech(:class='"stream-group__content-speech_" + speech.status')
                  .stream-group__body
                    //Над заголовком время
                    .stream-group__time-speech.stream-group__time-speech_phone {{speech.time_begin}} - {{speech.time_end}}
                    .stream-group__title-speech {{speech.title}}
                    //.stream-group__description-speech {{speech.info}}
                    .stream-group__speakers
                      ScheduleSpeakerBlock(
                        :speechId='speech.id'
                      )
                  .stream-group__action(v-if="speech.status === 'done' || speech.status === 'online'")
                    template(v-if='speech.status === "online"')
                      UiButton(
                        @click.prevent='watchSpeech(speech)'
                      ) Смотреть
                      span.stream-group__live
                        svg(xmlns='http://www.w3.org/2000/svg' fill='none' viewbox='0 0 31 11')
                          path(fill='#FF4D4D' d='M.97 11H7.5V9.23H3.13V.82H.97V11ZM11.07.82H8.92V11h2.15V.82Zm3.61 0h-2.4L15.8 11h2.78L22.08.82H19.7l-2.47 7.73h-.09L14.68.82ZM23.3 11h6.88V9.23h-4.72V6.79h4.35V5.02h-4.35V2.59h4.7V.82h-6.86V11Z')

</template>

<script>
import {getMinutes, toStringTime} from '../../helpers/timeConverter'
import {SPEECH_TIME_FORMAT} from '../../store/speech'

export default {
  name: 'ScheduleSpeeches',
  props: {
    groupSpeeches: Object,
    streamsInSchedule: Object,
  },
  data() {
    return {
      programVisible: [],
      isOpen: true,
    }
  },
  methods: {
    getMinMaxDate(streamId) {
      const speeches = this.$store.getters['speech/byStreamId'](streamId) || []
      if (!speeches.length) {
        return
      }

      let min = getMinutes(speeches[0].time_begin)
      let max = getMinutes(speeches[0].time_end)

      speeches.forEach((speech) => {
        max = Math.max(getMinutes(speech.time_end), max)
        min = Math.min(getMinutes(speech.time_begin), min)
      })

      return [toStringTime(min * 60 * 1000, SPEECH_TIME_FORMAT), toStringTime(max * 60 * 1000, SPEECH_TIME_FORMAT)]
    },
    showProgramm(streamId) {
      this.programVisible.includes(streamId)
        ? (this.programVisible = this.programVisible.filter((id) => streamId !== id))
        : this.programVisible.push(streamId)
    },
  },
  computed: {},
}
</script>

<style scoped lang="scss">
@import "~/styles/mixins.scss";

.stream-group {
  background: #000;
  padding-top: 80px;
  padding-bottom: 80px;

  @include tablets {
    padding: 10px 0 50px;
  }

  @include phones {
    padding: 30px 0;
  }

  &__content {
    margin-bottom: 80px;
  }

  &__title {
    font-size: var(--main-large-size);
    line-height: 32px;
    font-weight: 700;
    color: var(--main-light);
    @include desktop {
      line-height: 24px;
    }
    @include phones {
      font-size: 14px;
      line-height: 20px;
    }
  }

  &__time {
    font-size: var(--main-size);
    color: var(--gray-3);
    line-height: 24px;
    font-weight: 400;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    border-bottom: 1px solid var(--main-positive-color);
    padding-bottom: 20px;
    margin-bottom: 20px;
    cursor: pointer;
  }

  &__icon {
    fill: var(--main-color);
    width: 24px;
    height: 12px;
    cursor: pointer;
    transition: 0.2s linear;

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

  &__speech {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__time-speech {
    flex: 0 0 auto;
    font-weight: bold;
    font-size: var(--main-size);
    line-height: 22px;
    color: var(--main-light);
    margin-right: 43px;
    @include desktop {
      line-height: 20px;
    }
    @include phones {
      line-height: 18px;
      font-size: 12px;
      margin-bottom: 3px;
    }

    &_desktop {
      display: block;
      @include tablets {
        display: none;
      }
    }

    &_phone {
      display: none;
      @include tablets {
        display: block;
        margin-bottom: 12px;
      }
      @include phones {
        margin-bottom: 3px;
      }
    }
  }

  &__content-speech {
    display: flex;
    justify-content: space-between;
    padding: 35px;
    background: var(--main-positive-color);
    border: 1px solid var(--dark-1);
    border-radius: 5px;
    width: 100%;
    position: relative;
    @include desktop {
      padding: 30px 35px;
    }
    @include tablets {
      padding: 30px;
    }
    @include phones {
      padding: 20px;
      flex-direction: column;
      gap: 20px;
    }

    &_online {
      border: 1px solid var(--main-light-color);
    }
  }

  &__title-speech {
    font-weight: bold;
    font-size: 24px;
    line-height: 32px;
    color: var(--main-light);
    margin-bottom: 20px;
    @include desktop {
      font-size: 18px;
      line-height: 24px;
    }
    @include tablets {
      margin-bottom: 40px;
    }

    @include phones {
      margin-bottom: 17px;
      font-size: 14px;
      line-height: 20px;
    }
  }

  &__description-speech {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: var(--main-light);
    margin-top: 10px;
    margin-bottom: 5px;
  }

  &__action {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    @include phones {
      align-items: flex-start;
    }
    @include phones-small {
      button {
        width: 100%;
      }
    }
  }

  &__live {
    margin: 0;
    position: absolute;
    right: 32px;
    bottom: 23px;
    @include tablets {
      right: 30px;
      bottom: 26px;
    }
    @include phones-small {
      top: 17px;
      right: 15px;
      bottom: initial;
    }

    svg {
      width: 31px;
      height: 11px;

      & > * {
        fill: var(--main-danger-color);
      }
    }
  }

  &__collapsed {
    .stream-group__icon {
      transform: rotate(180deg);
      transition: 0.6s;
      fill: var(--gray-3);
    }
  }
}

.slide-enter {
  opacity: 0;
  transform: translateY(30%);
  transition: all 0.5s ease-in;
}

.slide-enter-active {
  transition: all 0.5s ease-in;
}

.slide-leave-active {
  transition: all 0.5s ease-in;
}

.slide-leave-to {
  transform: translateY(-5%);
  opacity: 0;
}

.speaker-item__speaker-name {
  font-size: 14px;
  line-height: 20px;
}

.speaker-item__company {
  font-size: 12px;
  line-height: 18px;
}
</style>
