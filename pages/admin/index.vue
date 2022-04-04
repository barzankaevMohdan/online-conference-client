<template lang='pug'>
  LayoutsPageWithHeader(absoluteHeader)
    BaseIntro(
      :src='require("~/assets/img/demo/intro/intro-night.jpg")'
      title='Master'
    )

    SectionAdminCreate
</template>

<script>

export default {
  name: 'Admin',
  head() {
    return {
      title: 'Панель Админа',
    }
  },
}
</script>
