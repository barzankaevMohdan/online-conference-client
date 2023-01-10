<template lang="pug">
  LayoutsPageWithHeader
    LayoutsContainer
      .form
        AuthRecoveryForm

</template>

<script>

export default {
  name: 'RegistrationStart',
  head() {
    return {
      title: 'Востановление пароля',
    }
  },
}
</script>

<style scoped lang="scss">
@import '~/styles/mixins.scss';
.form {
  max-width: 350px;
  margin: 100px auto;
}
</style>
