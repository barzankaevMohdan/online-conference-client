import actualStream from './actualStream'

export default {
  mixins: [actualStream],
  methods: {
    getSpeechesWithSpeakers(id) {
      const speeches = this.$store.getters['speech/byStreamId'](id)
      return speeches.map((speech) => {
        return {
          ...speech,
          speakers: this.$store.getters['speaker/bySpeechId'](speech.id),
        }
      })
    },
  },
  computed: {
    streamsDayWithSpeechesAndSpeakers() {
      const arrStreams = this.streamsProgram?.map((stream) => {
        return {
          ...stream,
          speeches: this.getSpeechesWithSpeakers(stream.id),
        }
      })
      return arrStreams ?? []
    },
    streamsProgram() {
      return this.$store.getters['stream/allStreams']
    },
  },
}
