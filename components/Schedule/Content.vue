<template lang='pug'>
  div
    ScheduleFilters(
      @filter='setFilter'
      :speakers='speakers'
      :streams='streams'
      :range='minMaxRange'
    )
    ScheduleSpeeches(
      v-if="!notFound"
      :groupSpeeches='groupSpeeches'
      :streamsInSchedule='streamsForId'
    )
    ScheduleNotFound(v-else)
</template>

<script>
import {getMinutes} from '../../helpers/timeConverter'

export default {
  name: 'ScheduleContent',
  data() {
    return {
      filter: {},
      notFound: false,
    }
  },
  computed: {
    speeches() {
      let speeches = this.$store.getters['speech/allSpeeches']

      if (this.filter?.stream) {
        speeches = this.$store.getters['speech/byStreamId'](this.filter.stream)
      }

      if (this.filter?.speaker) {
        speeches = speeches.filter(speech => {
          return speech.id === this.filter?.speaker
        })
      }

      if (this.filter?.text) {
        const text = this.filter.text.toLowerCase()
        speeches = speeches.filter(speech => {
          return Object.values(speech).some(field => {
            if (typeof field === 'string') {
              return field.toLowerCase().includes(text)
            }
            return false
          })
        })
      }

      return speeches.map(speech => {
        return {
          ...speech,
          speakers: this.$store.getters['speaker/bySpeechId'](speech.id),
        }
      })
    },
    speechesByTime() {
      return this.speeches.filter(speech => {
        const timeBegin = getMinutes(speech.time_begin)
        const timeEnd = getMinutes(speech.time_end)


        return timeBegin >= this.filter?.fromTime && timeEnd <= this.filter?.toTime
      })
    },
    speakers() {
      return this.$store.getters['speaker/allSpeakers']
    },
    streams() {
      return this.$store.getters['stream/allStreams']
    },
    streamsForId() {
      return this.streams?.reduce((acc, stream) => {
        acc[stream.id] = stream
        return acc
      }, {})
    },
    groupSpeeches() {
      return this.speechesByTime.reduce((acc, speech) => {
        const streamId = this.$store.getters['stream/bySpeechId'](speech.streamId)?.id
        acc[streamId] = [
          ...acc[streamId] ?? [],
          speech,
        ]

        return acc
      }, {})
    },
    minMaxRange() {
      const speeches = this.speeches
      if (!speeches.length) {
        return
      }

      let min = getMinutes(speeches[0].time_begin)
      let max = getMinutes(speeches[0].time_end)

      speeches.forEach(speech => {
        max = Math.max(getMinutes(speech.time_end), max)
        min = Math.min(getMinutes(speech.time_begin), min)
      })

      return [min, max]
    },
  },
  watch: {
    groupSpeeches(newValue) {
      this.notFound = !Object.keys(newValue).length
    },
  },
  methods: {
    setFilter(data) {
      this.filter = data
    },
  }
}
</script>

<style scoped lang='scss'>
@import "~/styles/mixins.scss";

.speakers-desktop {
  @include phones {
    display: none;
  }
}

.speakers-phone {
  display: none;
  @include phones {
    display: block;
  }
}
</style>
