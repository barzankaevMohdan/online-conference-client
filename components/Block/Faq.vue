<template lang="pug">
  LayoutsContainer
    UiHeadline
      slot(name='title')
    ul.faq-list
      li(
        v-for="(item, idx) in list"
        :key="idx"
      )
        UiFaq(
          v-model="checked"
          :value="idx"
          v-bind="propsBind(item)"
        )
</template>

<script>
export default {
  name: 'Faq',
  props: {
    list: Array,
  },
  data() {
    return {
      checked: [],
    }
  },
  methods: {
    propsBind(item) {
      return {...this.UiFaq, ...item}
    },
  },

}
</script>

<style lang="scss" scoped>
@import "~/styles/mixins.scss";

.faq-list{
  list-style: none;
  padding: 0;
  margin: 0;
  overflow: hidden;
  border-radius: 10px;
}
</style>
