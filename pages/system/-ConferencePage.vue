<template lang='pug'>
  LayoutsPageWithHeader(absoluteHeader)
    BaseIntro(
      :src='require("~/assets/img/demo/intro/intro-night.jpg")'
      title='IT Nights 2022'
    )
      template(v-slot:description) конференция / Онлайн
    SectionPlayer
    SectionProgram
    SectionFaq
</template>

<script>

export default {
  name: 'ConferencePage',
  head() {
    return {
      title: 'Страница эфира',
    }
  },
}
</script>
