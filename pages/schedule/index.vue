<template lang='pug'>
  LayoutsPageWithHeader

    BaseIntro(
      :src='require("~/assets/img/demo/intro/intro-night.jpg")'
      title='Расписание'
      theme='schedule'
    )
      template(#kv)
        img(:src="require('~/assets/img/demo/intro/kv-3.svg')")

    ScheduleContent

</template>

<script>

export default {
  name: 'Schedule',
  head() {
    return {
      title: 'Страница расписания',
    }
  },
}
</script>
