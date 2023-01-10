<template lang="pug">
  section.schedule
    LayoutsContainer
      .schedule__top
        slot(name='title')

        .schedule__arrows
          UiActionIcon.schedule__arrow(
            @click='prev'
            :disabled='prevDisabled'
          )
            SvgIcon(name="arrow-slider")

          UiActionIcon(
            @click='next'
            :disabled='nextDisabled'
          )
            SvgIcon(name="arrow-slider")

    .schedule__container
      .schedule__hall(
        v-for='(hall, i) in streams' :key='hall.id'
        :class='activeHall[i]'
        @click='hallClick(hall)'
        :style='hallLinkStyles[i]'
      ) {{hall.name}}
        slot(name='hall-arrow')
          SvgIcon.schedule__hall-arrow(name="arrow")

      .schedule__main(ref='schWidth')
        .swiper-slider
          .swiper-container(ref='slider')
            .swiper-wrapper(:style='{transform: `translateX(${customTranslate}px)`}')
              .swiper-slide
                .schedule__wrapper
                  .schedule__online-line(
                    :style='onlineLeftSpacing'
                    v-if='onlineLeftSpacing'
                  )
                      span.schedule__online-circle
                        span.schedule__online-img
                          slot(name='online-line-icon')
                            SvgIcon(name="online-icon")

                  ul.schedule__col(ref='timeRow')
                    li.schedule__time(
                      v-for='(time, idx) in timeArray'
                      :key='idx'
                      ref='timeCol'
                      :class='timeRowDone[idx]'
                    ) {{time}}
                      span.schedule__time-line(ref='colLine')
                        svg(width='100%' height='100%' viewBox='0 0 1 730' fill='none' xmlns='http://www.w3.org/2000/svg')
                          line(x1='0.5' y1='-2.12908e-08' x2='0.50005' y2='1113' stroke-dasharray='6 10')

                  .schedule__row(v-for='(hall, i) in streams' :key='hall.id' ref='cardsRow')
                    UiScheduleCard.schedule__card(
                      v-for='(speech, i) in hall.speeches'
                      :key='speech.id'
                      :speech='speech'
                      :width='colWidthAndTimeArray'
                      :coords='timeCoordsAndTime'
                      :hall='hall'
                      :speakersText='cardSpeakersText'
                      @cardClick='cardClick'
                      @cardButtonClick='cardButtonClick'
                      ref='cards'
                    )
                      template(#live-icon)
                        slot(name='live-icon-card')
                      template(#button-icon-done)
                        slot(name='button-icon-done-card')
                      template(#button-icon)
                        slot(name='button-icon-card')

              .swiper-slide
                span.schedule__span-slider

</template>

<script>
import Swiper from 'swiper/bundle'
import {getMinutes, toStringTime, getCurrentTime} from '~/helpers/timeConverter'

export default {
  name: 'Schedule',
  props: {
    streams: {
      type: Array,
      require: true,
    },
    activeStreamId: {
      type: Number,
      default: 0,
    },
    timeFormat: {
      type: String,
      default: 'HH:mm',
    },
    marginBeforeOnline: {
      type: Number,
      default: 50,
    },
    cardSpeakersText: Object,
    timeRowStep: {
      type: Number,
      default: 5,
    },
  },
  data() {
    return {
      slider: null,
      customTranslate: 0,
      diffBetweenSliderAndSch: 0,
      nextDisabled: false,
      prevDisabled: false,
      timeCoordsAndTime: [],
      colWidthAndTimeArray: null,
      coordsToHall: [],
      date: null,
      intervalToCurrentTime: null,
    }
  },
  async mounted() {
    await this.$nextTick()
    this.slider = new Swiper(this.$refs.slider, {
      slidesPerView: 'auto',
      grabCursor: true,
      freeMode: true,
      virtualTranslate: true,
      on: {
        setTranslate: () => {
          this.customScroll()
        },
        touchEnd: () => {
          this.prevOrNextDisabled()
        },
        resize: () => {
          this.getDiffBetweenSliderAndSch()
          this.coordsToHallFunc()
        }
      },
    })
    this.updateSlider()
    this.date = getCurrentTime(this.timeFormat)
    this.intervalToCurrentTime = setInterval(() => {
      this.date = getCurrentTime(this.timeFormat)
    }, 60 * 1000)
  },
  destroyed() {
    this.slider?.destroy(true, true)
    if (this.intervalToCurrentTime) clearInterval(this.intervalToCurrentTime)
  },
  methods: {
    // Получаем координаты времени в временной шкале и само время
    getTimeCoordsAndTime() {
      const colCoord = this.$refs.timeRow?.getBoundingClientRect().left
      const coords = this.$refs.colLine?.map((line) => line?.getBoundingClientRect().right - colCoord)
      const coordsWithTime = coords?.map((coord, index) => {
        return {
          coord,
          time: this.timeArray[index],
        }
      })
      this.timeCoordsAndTime = coordsWithTime ?? []
    },
    // Достаем ширину колонки времени и весь массив временой шкалы
    getColWidthAndTimeArray() {
      this.colWidthAndTimeArray = {
        width: this.$refs.timeCol?.[0].clientWidth,
        timeArray: this.timeArray,
      }
    },
    async updateSlider() {
      await this.$nextTick()
      this.slider.update()
      this.getDiffBetweenSliderAndSch()
      this.getTimeCoordsAndTime()
      this.getColWidthAndTimeArray()
      this.coordsToHallFunc()
      this.scrollToOnline()
    },
    // Кастом для слайдера кнопка next
    next() {
      this.slider.translate = this.slider.translate - this.$refs.schWidth.clientWidth
      this.slider.translateTo(this.slider.translate, 250, false)
      this.prevOrNextDisabled()
    },
    // Кастом для слайдера кнопка prev
    prev() {
      this.slider.translate = this.slider.translate + this.$refs.schWidth.clientWidth
      this.slider.translateTo(this.slider.translate, 250, false)
      this.prevOrNextDisabled()
    },
    prevOrNextDisabled() {
      this.nextDisabled = this.slider.translate <= -this.diffBetweenSliderAndSch
      this.prevDisabled = this.slider.translate >= 0
    },                                                                                
    // Скролл до онлайн карточки
    async scrollToOnline() {
      await this.$nextTick()
      if (this.onlineCardId) {
        const firstOnlineCardPosition = this.$refs.cards?.find((card) => card.speech.id === this.onlineCardId)?.position
        this.slider.translateTo(-firstOnlineCardPosition + this.marginBeforeOnline, 250, false)
      }
    },
    // Разница между шириной слайдера и секции
    getDiffBetweenSliderAndSch() {
      if (!this.slider || !this.$refs.schWidth) return
      const sliderWidth = this.slider.width
      const schWidth = this.$refs.schWidth.clientWidth
      this.diffBetweenSliderAndSch = sliderWidth > schWidth ? sliderWidth - schWidth : 0
    },
    // Кастомный скролл для слайдера
    customScroll() {
      if (!this.slider) return
      if (this.slider.translate <= -this.diffBetweenSliderAndSch) {
        this.slider.translate = -this.diffBetweenSliderAndSch
        this.customTranslate = -this.diffBetweenSliderAndSch
      } else {
        this.customTranslate = this.slider.translate
      }
    },
    cardClick(data) {
      this.$emit('cardClick', data)
    },
    cardButtonClick(data) {
      this.$emit('cardButtonClick', data)
    },
    hallClick(data) {
      this.$emit('hallClick', data)
    },
    coordsToHallFunc() {
      const col = this.$refs.timeRow?.getBoundingClientRect().top
      const hall = this.$refs.cardsRow?.map((row) => {
        return row?.getBoundingClientRect().top - col
      })
      this.coordsToHall = hall ?? []
    },
  },
  computed: {
    // получаем координаты для линии показывающее текущее время
    onlineLineCoords() {
      const timeColWidthAndDiff = this.timeArray.map((time, i) => {
        if (i >= this.timeArray.length - 1) return null
        const diff = getMinutes(this.timeArray[i + 1]) - getMinutes(time)
        return {
          width: this.colWidthAndTimeArray?.width / diff,
          diff,
        }
      })
      let now = getMinutes(this.date) - this.beginTime
      let coord = this.colWidthAndTimeArray?.width * 0.25
      timeColWidthAndDiff.forEach((item) => {
        switch (true) {
          case now > item?.diff:
            coord += item?.diff * item?.width
            break
          case now > 0:
            coord += now * item?.width
            break
        }
        now -= item?.diff
      })
      return coord
    },
    // получаем массив для временной шкалы
    timeArray() {
      let speechesTime = this.speechesTime
      // Дополнительное время для временной шкалы
      this.speechesTimeBeginEnd.forEach((speech) => {
        // Разница между началом спича и окончанием
        let diff = speech.time_end - speech.time_begin
        // Временные отрезки которые будут добавлены между началом спича и окончанием
        const timeStep = 5
        const bigTimeStep = 10
        let count = 1
        const toMoreSteps = () => {
          diff -= timeStep
          ++count
          speechesTime.push(diff + speech.time_begin)
          if (diff >= bigTimeStep && count < this.timeRowStep) {
            toMoreSteps()
          }
        }
        switch (true) {
          case diff < bigTimeStep && diff > timeStep:
            speechesTime.push(bigTimeStep - diff + speech.time_begin)
            break
          case diff >= bigTimeStep:
            toMoreSteps()
        }
      })
      // Удаляем одинаковые временные отрезки и сортируем по возрастанию
      speechesTime = [...new Set(speechesTime)].sort((a, b) => a - b)
      // Преобразуем минуты в часовой формат
      speechesTime = speechesTime.map((step) => toStringTime(step * 60 * 1000, this.timeFormat))
      return speechesTime
    },
    // получаем всех спичей со всех стримов
    speeches() {
      const arrSpeeches = []
      this.streams.forEach((stream) => {
        stream.speeches?.forEach((speech) => arrSpeeches.push(speech))
      })
      return arrSpeeches
    },
    // получаем id первого по времение онлайн спича из всех стримов
    onlineCardId() {
      const arrOnlineCards = []
      this.speeches.forEach((speech) => {
        if (speech.status === 'online') {
          arrOnlineCards.push(speech)
        }
      })
      if (arrOnlineCards?.length) {
        const minTime = Math.min(...arrOnlineCards.map((card) => getMinutes(card.time_begin)))
        const firstOnlineCard = arrOnlineCards.find((card) => {
          if (getMinutes(card.time_begin) === minTime) {
            return card
          } return null
        })
        return firstOnlineCard?.id
      }
      return 0
    },
    // получаем времена спичей в формате начало спича и конец
    speechesTimeBeginEnd() {
      const speechesTimeBeginEnd = []
      this.speeches.forEach((speech) => {
        speechesTimeBeginEnd.push({
          time_begin: getMinutes(speech.time_begin),
          time_end: getMinutes(speech.time_end),
        })
      })
      return speechesTimeBeginEnd
    },
    // получаем все времена спичей
    speechesTime() {
      const speechTimeArr = []
      this.speeches.forEach((speech) => {
        speechTimeArr.push(getMinutes(speech.time_begin))
        speechTimeArr.push(getMinutes(speech.time_end))
      })
      return speechTimeArr
    },
    // получаем время начала первого спича
    beginTime() {
      return Math.min(...this.speechesTime)
    },
    // получаем время окончания последнего спича
    endTime() {
      return Math.max(...this.speechesTime)
    },
    // меняем класс у времени если текущее время больше
    timeRowDone() {
      const arrTimeDone = this.timeCoordsAndTime.map((item) => {
        return this.onlineLineCoords > item.coord ? 'schedule__time_done' : ''
      })
      return arrTimeDone ?? []
    },
    // меняем класс у активного зала
    activeHall() {
      return this.streams.map((stream) => {
        if (stream.id === this.activeStreamId) {
          return 'schedule__hall_active'
        }
        return undefined
      })
    },
    hallLinkStyles() {
      return this.streams.map((_, i) => {
        return {top: this.coordsToHall[i] + 'px'}
      })
    },
    // меняем поизицию у линии показывающее текущее время в соответсвии с полученными координатами
    onlineLeftSpacing() {
      return this.onlineLineCoords ? {left: `${this.onlineLineCoords}px`} : false
    },
  },
  watch: {
    onlineCardId() {
      setTimeout(() => {
        this.updateSlider()
      }, 1000)
    },
    streams() {
      setTimeout(() => {
        this.updateSlider()
      }, 1000)
    },
  },
}
</script>

<style lang="scss">
@import "~/styles/mixins.scss";

:root {
  /* Размеры */
  --schedule-header-margin-bottom: 32px;
  --schedule-container-max-width: 100%;
  --schedule-arrow-margin: 30px;
  --schedule-col-padding-bottom: 36px;
  --schedule-time-text-size: var(--main-large-size);
  --schedule-time-line-height: 1.5;
  --schedule-time-font-weight: 400;
  --schedule-time-width: 130px;
  --schedule-col-line-size: 750px;
  --schedule-row-height: 235px;
  --schedule-hall-text-size: var(--main-small-text);
  --schedule-hall-line-height: 1.42;
  --schedule-hall-font-weight: 700;
  --schedule-hall-padding-vertical: 5px;
  --schedule-hall-padding-horizontal: 30px;
  --schedule-hall-arrow-size: 11px;
  --schedule-hall-arrow-margin-left: 10px;
  --schedule-online-img-size: 16px;
  --schedule-card-height: 160px;

  @include phones {
    --schedule-col-padding-bottom: 28px;
    --schedule-row-height: 210px;
    --schedule-time-text-size: 14px;
    --schedule-time-line-height: 1.42;
    --schedule-hall-text-size: 10px;
    --schedule-hall-line-height: 1.6;
    --schedule-hall-padding-vertical: 6px;
    --schedule-hall-padding-horizontal: 15px;
    --schedule-online-img-size: 13px;
    --schedule-card-height: 131px;
  }

  /* Цвета */
  --schedule-background: var(--dark-2);
  --schedule-col-border: var(--dark-1);
  --schedule-time-color: var(--main-light);
  --schedule-time-color-done: var(--dark-1);
  --schedule-col-line: var(--dark-1);
  --schedule-online-line: var(--main-danger-color);
  --schedule-online-img: var(--main-light);
  --schedule-hall: rgba(144, 132, 148, 0.1);
  --schedule-hall-active: var(--main-transparent);
  --schedule-hall-hover: var(--main-transparent);
  --schedule-hall-text: var(--gray-2);
  --schedule-hall-text-active: var(--main-color);
}
</style>

<style scoped lang="scss">
@import "~/styles/mixins.scss";

.schedule {
  background: var(--schedule-background);
  overflow: hidden;

  &__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--schedule-header-margin-bottom);
  }

  &__arrows {
    --action-icon-size: 25px;
    display: flex;
    align-items: center;
    @include phones {
      display: none;
    }
  }

  &__arrow {
    margin-right: var(--schedule-arrow-margin);
    transform: rotateY(180deg);
  }

  &__container {
    position: relative;
    width: 100%;
    max-width: var(--schedule-container-max-width);
    margin-left: auto;
    margin-right: auto;
  }

  &__main {
    box-sizing: border-box;
    display: flex;
  }

  &__col {
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0;
    margin: 0;
    list-style-type: none;
    padding-bottom: var(--schedule-col-padding-bottom);
    border-bottom: 1px solid var(--schedule-col-border);
  }

  &__time {
    user-select: none;
    position: relative;
    font-size: var(--schedule-time-text-size);
    line-height: var(--schedule-time-line-height);
    font-weight: var(--schedule-time-font-weight);
    color: var(--schedule-time-color);
    width: var(--schedule-time-width);

    &:nth-child(2n) {
      color: transparent;
      &:before {
        content: '';
        position: absolute;
        width: 2px;
        height: 10px;
        background: var(--schedule-time-color);
        border-radius: 2px;
        top: 50%;
        transform: translateY(-50%);
        left: 25%;
        @include phones {
          left: 20%;
        }
      }
    }

    &_done {
      color: var(--schedule-time-color-done);

      &:nth-child(2n) {
        &:before {
          background: var(--schedule-time-color-done);
        }
      }
    }
  }

  &__time-line {
    position: absolute;
    top: calc(100% + var(--schedule-col-padding-bottom));
    left: 25%;
    height: var(--schedule-col-line-size);
    width: 1px;
    stroke: var(--schedule-col-line);
    @include phones {
      left: 20%;
    }
  }

  &__online {
    display: flex;
    position: absolute;
    top: 32px;
    left: 50px;
    @include phones {
      top: 22px;
    }
  }

  &__online-line {
    position: absolute;
    top: 32px;
    left: 50px;
    background: var(--schedule-online-line);
    width: 2px;
    height: 100%;
   
    @include phones {
      top: 22px;
    }
  }

  &__online-circle {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 9px;
    left: 50%;
    transform: translateX(-50%);
    width: 26px;
    height: 26px;
    background: var(--schedule-online-line);
    border-radius: 100%;
    @include phones {
      top: 5px;
      width: 20px;
      height: 20px;
    }
  }

  &__online-img {
    display: flex;
    justify-content: center;
    align-items: center;
    fill: var(--schedule-online-img);
    width: var(--schedule-online-img-size);
    height: auto;
  }

  &__row {
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    height: var(--schedule-row-height);
    border-bottom: 1px solid var(--schedule-col-border);
    &:last-child {
      border-bottom: none;
    }
  }

  &__hall {
    position: absolute;
    top: 0;
    left: 0;
    padding: var(--schedule-hall-padding-vertical) var(--schedule-hall-padding-horizontal);
    background: var(--schedule-hall);
    color: var(--schedule-hall-text);
    font-size: var(--schedule-hall-text-size);
    font-weight: var(--schedule-hall-font-weight);
    line-height: var(--schedule-hall-line-height);
    text-transform: uppercase;
    cursor: pointer;
    transition: 0.2s;
    z-index: 2;
    &:hover {
      background: var(--schedule-hall-hover);
    }
    &_active {
      color: var(--schedule-hall-text-active);
      background: var(--schedule-hall-active);
    }
  }

  &__hall-arrow {
    width: var(--schedule-hall-arrow-size);
    height: var(--schedule-hall-arrow-size);
    fill: var(--schedule-hall-text-active);
    margin-left: var(--schedule-hall-arrow-margin-left);
    transform: rotate(-90deg);
  }

  &__card {
    position: absolute;
    left: 0;
    bottom: 25px;
    z-index: 1;
    --schedule-card-footer-margin-top: 0;
    height: var(--schedule-card-height);
  }
}
</style>
