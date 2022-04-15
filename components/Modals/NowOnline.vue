<template lang="pug">
  UiScheduleModal.now-online(
    name="nowOnline"
    :streams="streamsDayWithSpeechesAndSpeakers"
    @watchSpeech="watchAndClose"
    @followToHall="followToHall"
    @followToSchedule="followToSchedule"
    ref="nowOnline"
  )
    template(#title) Сейчас онлайн
    template(#fullScheduleText) Расписание
    template(#buttonOnlineText) Сейчас онлайн
    template(#buttonOfflineText) Перейти в зал
    template(#offlineText) Сейчас нету онлайн стримов
</template>

<script>
import streamsWithSpeechesAndSpeakers from '../../mixins/streamsWithSpeechesAndSpeakers'

export default {
  name: 'NowOnlineModal',
  mixins: [streamsWithSpeechesAndSpeakers],
  methods: {
    followToSchedule() {
      this.$router.push('schedule')
      this.$vfm.hide('nowOnline')
    },
    followToHall(stream) {
      this.$router.push(`/stream/${stream.id}`)
      this.$vfm.hide('nowOnline')
    },
    watchAndClose(data) {
      this.$router.push(`/stream/${data.hall.id}`)
      this.$vfm.hide('nowOnline')
    },
  },
}
</script>
