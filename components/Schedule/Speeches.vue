<template lang="pug">
  section.s-speeches
    LayoutsContainer
      ScheduleNotFound(v-if='isHaveSpeech')
      template(v-for='(speeches, streamId) in groupSpeeches')
        .s-speeches__content
          .s-speeches__header(@click="showProgramm(streamId)")
            UiHeadline(v-if='streamsInSchedule[streamId]' tag='h4') {{streamsInSchedule[streamId].name}}
            SvgIcon.s-speeches__icon(name='arrow' :class="{'s-speeches__icon_rotate': open(streamId)}")

          UiSlideToggle(
            :open='open(streamId)'
          )
            .stream-group__speech(v-for='speech in speeches')
              .stream-group__time-speech {{speech.time_begin}} - {{speech.time_end}}
              .stream-group__content-speech(:class='`stream-group__content-speech_${speech.status}`')
                div
                  .stream-group__time-speech.stream-group__time-speech_phone {{speech.time_begin}} - {{speech.time_end}}
                  .stream-group__title-speech {{speech.title}}
                  .stream-group__description-speech {{speech.info}}
                  ScheduleSpeakerBlock(
                    :speechId='speech.id'
                  )
                .stream-group__action(v-if="speech.status === 'online'")
                  UiButton(
                    @click.prevent='watchSpeech(speech)'
                  ) Смотреть
                  span.stream-group__live LIVE
</template>

<script>
import watchSpeech from '~/mixins/watchSpeech'

export default {
  name: 'ScheduleSpeeches',
  props: {
    groupSpeeches: Object,
    streamsInSchedule: Object,
    isHaveSpeech: Boolean,
  },
  mixins: [watchSpeech],
  data() {
    return {
      programVisible: [],
    }
  },
  methods: {
    showProgramm(streamId) {
      this.programVisible.includes(streamId)
        ? (this.programVisible = this.programVisible.filter((id) => streamId !== id))
        : this.programVisible.push(streamId)
    },
    open(streamId) {
      return !this.programVisible.includes(streamId)
    },
  },
}
</script>

<style scoped lang="scss">
@import "~/styles/mixins.scss";

.s-speeches {
  background: var(--dark-2);
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
    max-width: 24px;
    max-height: 12px;
    transition: 0.6s;

    &_rotate {
      transform: rotate(180deg);
      fill: var(--gray-3);
    }
  }
}

.stream-group {
  &__speech {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }

    @include phones {
      flex-direction: column;
    }
  }

  &__time-speech {
    flex: 0 0 auto;
    font-weight: bold;
    font-size: var(--main-size);
    line-height: 1.3;
    color: var(--main-light);
    margin-right: 43px;

    @include tablets {
      display: none;
    }
 
    @include phones {
      font-size: 12px;
      margin-bottom: 10px;
    }

    &_phone {
      display: none;
      @include tablets {
        display: block;
      }
    }
  }

  &__content-speech {
    position: relative;
    display: flex;
    justify-content: space-between;
    padding: 35px;
    background: var(--main-positive-color);
    border: 1px solid var(--dark-1);
    border-radius: 5px;
    width: 100%;
    
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
      .stream-group__time-speech {
        color: var(--main-light-color);
      }
    }
  }

  &__title-speech {
    font-weight: bold;
    font-size: 24px;
    line-height: 1.3;
    color: var(--main-light);
    margin-bottom: 20px;

    @include desktop {
      font-size: 18px;
    }
    
    @include tablets {
      margin-bottom: 40px;
    }

    @include phones {
      margin-bottom: 17px;
      font-size: 16px;
    }
  }

  &__description-speech {
    font-weight: 400;
    font-size: 16px;
    line-height: 1.5;
    color: var(--main-light);
    margin-bottom: 5px;

    @include phones {
      margin-bottom: 17px;
      font-size: 14px;
    }
  }

  &__action {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    @include phones {
      align-items: flex-start;
    }

    & button {
      @include phones {
        width: 100%;
      }
    }
  }

  &__live {
    font-weight: bold;
    font-size: 20px;
    line-height: 1,2;
    color: var(--main-danger-color);
    margin-top: 20px;

    @include phones {
      display: none;
    }
  }
}
</style>
