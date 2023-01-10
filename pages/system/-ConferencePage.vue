<template lang='pug'>
  LayoutsPageWithHeader
    BaseIntro(
      :src='require("~/assets/img/demo/intro/intro-night.jpg")'
      title='IT Nights 2022'
      description='конференция / Онлайн'
    )
      template(#kv)
        img(:src="require('~/assets/img/demo/intro/kv.svg')")

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
