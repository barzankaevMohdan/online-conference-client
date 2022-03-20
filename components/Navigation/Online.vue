<template lang='pug'>
  NavigationLinkBase(@click="showModalNowOnline" :theme='theme')
    slot
</template>

<script>

export default {
  name: 'Online',
  props: {
    theme: String,
  },
  methods: {
    showModalNowOnline() {
      this.$emit('open')
      this.$vfm.show('nowOnline')
    },
  },
}
</script>
