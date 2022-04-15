
export default {
  computed: {
    activeStreamId() {
      const stream = this.$store.getters['stream/firstStream']
      const id = this.$route.params.id ?? stream?.id ?? 1
      return +id
    },
    activeStream() {
      return this.$store.getters['stream/byId'](this.activeStreamId)
    },
    activeStreamName() {
      return this.activeStream?.name ?? ''
    },
  },
}
