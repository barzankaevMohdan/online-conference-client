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
    streamsWithSpeechesAndSpeakers() {
      const arrStreams = this.streams?.map((stream) => {
        return {
          ...stream,
          speeches: this.getSpeechesWithSpeakers(stream.id),
        }
      })
      return arrStreams ?? []
    },
    streams() {
      return this.$store.getters['stream/allStreams']
    },
  },
}
