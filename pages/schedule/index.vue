<template lang='pug'>
  LayoutsPageWithHeader(absoluteHeader)

    BaseIntro(
      :src='require("~/assets/img/demo/intro/intro-night.jpg")'
      title='Расписание'
      theme='schedule'
    )
      template(v-slot:kv)
        img(:src="require('~/assets/img/demo/intro/kv-3.png')")
      template(v-slot:kv-phone)
        img(:src="require('~/assets/img/demo/intro/kv-3-phone.png')")

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
