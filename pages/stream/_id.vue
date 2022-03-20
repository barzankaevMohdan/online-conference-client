<template lang='pug'>
  LayoutsPageWithHeader(absoluteHeader)
    BaseIntro(
      :src='require("~/assets/img/demo/intro/intro-night.jpg")'
      title='IT Nights 2022'
    )
      template(v-slot:description) Зал {{activeStreamId}}
    SectionPlayer
    SectionProgram
    SectionFaq
</template>

<script>
import actualStream from '../../mixins/actualStream'

export default {
  name: 'ConferencePage',
  head() {
    return {
      title: 'Страница эфира',
    }
  },
  mixins: [actualStream],
}
</script>
