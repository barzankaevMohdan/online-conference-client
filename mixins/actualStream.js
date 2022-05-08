
export default {
  computed: {
    activeStreamId() {
      const id = this.$route.params.id ?? this.$store.getters['stream/firstStream']?.id
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
