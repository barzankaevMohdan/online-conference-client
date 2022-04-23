<template lang='pug'>
  LayoutsPageWithHeader(absoluteHeader)
    BaseIntro(
      :src='require("~/assets/img/demo/intro/intro-night.jpg")'
      title='Master'
    )
      template(#kv)
        img(:src="require('~/assets/img/demo/intro/kv-2.svg')")
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
