<template lang='pug'>
  NavigationLinkBase(@click='linkTo' :theme='theme')
    slot

</template>

<script>

export default {
  name: 'Link',
  props: {
    to: [String, Object],
    theme: String,
  },
  methods: {
    linkTo() {
      this.$emit('click')
      this.$router.push(this.to)
    }
  }
}
</script>
