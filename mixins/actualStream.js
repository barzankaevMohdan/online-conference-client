
export default {
  computed: {
    activeStreamId() {
      const id = this.$route.params.id ?? 1
      return +id
    },
  },
}
