<template lang='pug'>
  LayoutsPageWithHeader
    BaseIntro(
      :src='require("~/assets/img/demo/intro/intro-night.jpg")'
      title='IT Nights 2022'
      :description='activeStreamName'
    )
      template(#kv)
        img(:src="require('~/assets/img/demo/intro/kv-2.svg')")

    SectionPlayer

    SectionProgram

    SectionFaq

</template>

<script>
import actualStream from '~/mixins/actualStream'

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
