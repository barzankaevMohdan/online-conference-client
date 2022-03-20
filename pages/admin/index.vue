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
  name: 'index',
  head() {
    return {
      title: 'Панель Админа',
    }
  },
}
</script>
