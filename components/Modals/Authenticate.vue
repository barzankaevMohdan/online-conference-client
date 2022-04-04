<template lang='pug'>
  UiModal(
    name='authenticate'
  )
    LoginForm
</template>

<script>
import LoginForm from '../Auth/LoginForm'
import UiModal from "~/components/Ui/UiModal";

export default {
  name: 'AuthenticateModal',
  components: {LoginForm, UiModal},
}
</script>

<style scoped lang='scss'>
@import "~/styles/mixins.scss";

.modal-conent-form {
  margin-top: 30px;
}
</style>
