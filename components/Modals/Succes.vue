<template lang='pug'>
  UiModal(
    name='success'
    @beforeOpen='initData'
  )
    template(v-slot:icon)
      SvgIcon.modal-icon(name='succes')
    template(v-slot:title) Письмо отправлено на почту
    | На почту {{info}} отправлено письмо для востановления пароля

</template>

<script>
export default {
  name: 'Success',
  data() {
    return {
      info: null,
    }
  },
  methods: {
    initData(event) {
      this.info = event.ref.params
    },
  },
}
</script>

<style lang='scss' scoped>
@import "~/styles/mixins.scss";

.modal-icon {
  width: 70px;
  height: 70px;
  fill: var(--main-color);
}
</style>
