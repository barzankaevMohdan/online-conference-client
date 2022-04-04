<template lang="pug">
  BlockSchedule.s-program(
    :streams="streamsDayWithSpeechesAndSpeakers"
    :activeStreamId="activeStreamId"
    :speechModalProps="speechModalProps"
    @cardButtonClick="cardButtonClick"
    @hallClick="hallClick"
    @watchSpeech="watchSpeechModal"
  )
    template(#title)
      UiHeadline(tag="h2") Программа
</template>

<script>
import streamsWithSpeechesAndSpeakers from '../../mixins/streamsWithSpeechesAndSpeakers'

export default {
  name: 'Program',
  mixins: [streamsWithSpeechesAndSpeakers],
  data() {
    return {
      speechModalProps: {
        buttonDisabled: {
          done: true,
          online: true,
          add: true,
          delete: true,
        },
      },
    }
  },
  methods: {
    cardButtonClick(data) {
      // this.watchSpeech(data.speech)
      this.$vfm.hide('ZeenSchedule')
    },
    hallClick(stream) {
      this.$router.push(`/stream/${stream.id}`)
    },
    watchSpeechModal(data) {
      // this.watchSpeech(data.speech)
      this.$vfm.hide('ZeenSchedule')
    },
  },
  computed: {
    streams() {
      return [
        {
          id: "ed62f115-fc0b-489b-85ad-b437c857ee20",
          name: "Зал финансовой аналитики и диджитал безопасности",
          slug: "gfgfhfghf-fc0b-489b-85ad-b437c857ee20",
          speeches: [
            {
              id: "ghfm61-0937-4304-92a4-fee82f0f18f2",
              status: 'done',
              title: 'Формула лучшего КЦ: взболтать, но не смешивать',
              speakers: [
                {
                  name: 'Владимир Химаныч',
                  avatar_url: 'https://i.pinimg.com/originals/87/8f/ce/878fcef0c41b03f5f1605daad41d3a90.jpg',
                  position: 'Руководитель дирекции обслуживания корпоративных клиентов и инвестиционно-банковских операций, руководитель дирекции обслуживания корпоративных клиентов и инвестиционно-банковских операций'
                },
                {
                  name: 'Аркадий Пожарский',
                  avatar_url: 'https://klkfavorit.ru/wp-content/uploads/5/6/9/5694f516ff52f6962bec5247e92fef29.jpeg',
                  position: 'Руководитель дирекции обслуживания физических лиц и малого бизнеса',
                },
                {
                  name: 'Аркадий Пожарский',
                  avatar_url: 'https://kinpet.ru/upload/medialibrary/add/DRT8.jpg',
                  position: 'Руководитель дирекции по управлению рисками',
                },
                {
                  name: 'Аркадий Пожарский',
                  avatar_url: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/51c59160145855.5a3dbfa5da735.jpg',
                  position: 'Руководитель административно-хозяйственного управления',
                }
              ],
              time_begin: '11:00',
              time_end: '11:20',
            },
            {
              id: "fghfgh69861-0937-4304-92a4-fee82f0f18f2",
              status: 'online',
              title: 'Диджитал-привлечение в корпоративном бизнесе. Есть ли место подвигу?',
              speakers: [
                {
                  name: 'Владимир Химаныч',
                  avatar_url: 'https://i.pinimg.com/originals/87/8f/ce/878fcef0c41b03f5f1605daad41d3a90.jpg',
                  position: 'Руководитель дирекции обслуживания корпоративных клиентов и инвестиционно-банковских операций, руководитель дирекции обслуживания корпоративных клиентов и инвестиционно-банковских операций'
                },
                {
                  name: 'Аркадий Пожарский',
                  avatar_url: 'https://klkfavorit.ru/wp-content/uploads/5/6/9/5694f516ff52f6962bec5247e92fef29.jpeg',
                  position: 'Руководитель дирекции обслуживания физических лиц и малого бизнеса',
                },
                {
                  name: 'Аркадий Пожарский',
                  avatar_url: 'https://kinpet.ru/upload/medialibrary/add/DRT8.jpg',
                  position: 'Руководитель дирекции по управлению рисками',
                },
                {
                  name: 'Аркадий Пожарский',
                  avatar_url: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/51c59160145855.5a3dbfa5da735.jpg',
                  position: 'Руководитель административно-хозяйственного управления',
                }
              ],
              time_begin: '11:20',
              time_end: '11:30',
            },
            {
              id: "a4469861-0937-4304-92a4-fee82f0f18f2",
              status: 'hold',
              title: 'Формула лучшего КЦ: взболтать, но не смешивать',
              speakers: [
                {
                  name: 'Владимир Химаныч',
                  avatar_url: 'https://i.pinimg.com/originals/87/8f/ce/878fcef0c41b03f5f1605daad41d3a90.jpg',
                  position: 'Руководитель дирекции обслуживания корпоративных клиентов и инвестиционно-банковских операций, руководитель дирекции обслуживания корпоративных клиентов и инвестиционно-банковских операций'
                },
                {
                  name: 'Аркадий Пожарский',
                  avatar_url: 'https://klkfavorit.ru/wp-content/uploads/5/6/9/5694f516ff52f6962bec5247e92fef29.jpeg',
                  position: 'Руководитель дирекции обслуживания физических лиц и малого бизнеса',
                },
                {
                  name: 'Аркадий Пожарский',
                  avatar_url: 'https://kinpet.ru/upload/medialibrary/add/DRT8.jpg',
                  position: 'Руководитель дирекции по управлению рисками',
                },
                {
                  name: 'Аркадий Пожарский',
                  avatar_url: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/51c59160145855.5a3dbfa5da735.jpg',
                  position: 'Руководитель административно-хозяйственного управления',
                }
              ],
              time_begin: '11:40',
              time_end: '12:00',
            },
          ]
        },
        {
          id: "ed62asssa15-fc0b-489b-85ad-b437c857ee20",
          name: "Зал дизайна и продуктивности",
          slug: "ljkl5-fc0b-489b-85ad-b437jkljkc857ee20",
          speeches: [
            {
              id: "bnvmbnbvmvbm61-09n7-4304-92a4-fee82f0f18f2",
              status: 'done',
              title: 'Диджитал-привлечение в корпоративном бизнесе. Есть ли место подвигу?',
              speakers: [
                {
                  name: 'Владимир Химаныч',
                  avatar_url: 'https://i.pinimg.com/originals/87/8f/ce/878fcef0c41b03f5f1605daad41d3a90.jpg',
                  position: 'Руководитель дирекции обслуживания корпоративных клиентов и инвестиционно-банковских операций, руководитель дирекции обслуживания корпоративных клиентов и инвестиционно-банковских операций'
                },
                {
                  name: 'Аркадий Пожарский',
                  avatar_url: 'https://klkfavorit.ru/wp-content/uploads/5/6/9/5694f516ff52f6962bec5247e92fef29.jpeg',
                  position: 'Руководитель дирекции обслуживания физических лиц и малого бизнеса',
                },
                {
                  name: 'Аркадий Пожарский',
                  avatar_url: 'https://kinpet.ru/upload/medialibrary/add/DRT8.jpg',
                  position: 'Руководитель дирекции по управлению рисками',
                },
                {
                  name: 'Аркадий Пожарский',
                  avatar_url: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/51c59160145855.5a3dbfa5da735.jpg',
                  position: 'Руководитель административно-хозяйственного управления',
                }
              ],
              time_begin: '11:00',
              time_end: '11:20',
            },
            {
              id: "nbvmvbnm61-0937-4304-92a4-feen82f0f18f2",
              status: 'online',
              title: 'Формула лучшего КЦ: взболтать, но не смешивать',
              speakers: [
                {
                  name: 'Владимир Химаныч',
                  avatar_url: 'https://i.pinimg.com/originals/87/8f/ce/878fcef0c41b03f5f1605daad41d3a90.jpg',
                  position: 'Руководитель дирекции обслуживания корпоративных клиентов и инвестиционно-банковских операций, руководитель дирекции обслуживания корпоративных клиентов и инвестиционно-банковских операций'
                },
                {
                  name: 'Аркадий Пожарский',
                  avatar_url: 'https://klkfavorit.ru/wp-content/uploads/5/6/9/5694f516ff52f6962bec5247e92fef29.jpeg',
                  position: 'Руководитель дирекции обслуживания физических лиц и малого бизнеса',
                },
                {
                  name: 'Аркадий Пожарский',
                  avatar_url: 'https://kinpet.ru/upload/medialibrary/add/DRT8.jpg',
                  position: 'Руководитель дирекции по управлению рисками',
                },
                {
                  name: 'Аркадий Пожарский',
                  avatar_url: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/51c59160145855.5a3dbfa5da735.jpg',
                  position: 'Руководитель административно-хозяйственного управления',
                }
              ],
              time_begin: '11:25',
              time_end: '11:45',
            },
            {
              id: "a44nbvmvbn-0937-4304-92a4-fee8nbvmf0f18f2",
              status: 'hold',
              title: 'Диджитал-привлечение в корпоративном бизнесе. Есть ли место подвигу?',
              speakers: [
               {
                  name: 'Владимир Химаныч',
                  avatar_url: 'https://i.pinimg.com/originals/87/8f/ce/878fcef0c41b03f5f1605daad41d3a90.jpg',
                  position: 'Руководитель дирекции обслуживания корпоративных клиентов и инвестиционно-банковских операций, руководитель дирекции обслуживания корпоративных клиентов и инвестиционно-банковских операций'
                },
                {
                  name: 'Аркадий Пожарский',
                  avatar_url: 'https://klkfavorit.ru/wp-content/uploads/5/6/9/5694f516ff52f6962bec5247e92fef29.jpeg',
                  position: 'Руководитель дирекции обслуживания физических лиц и малого бизнеса',
                },
                {
                  name: 'Аркадий Пожарский',
                  avatar_url: 'https://kinpet.ru/upload/medialibrary/add/DRT8.jpg',
                  position: 'Руководитель дирекции по управлению рисками',
                },
                {
                  name: 'Аркадий Пожарский',
                  avatar_url: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/51c59160145855.5a3dbfa5da735.jpg',
                  position: 'Руководитель административно-хозяйственного управления',
                }
              ],
              time_begin: '11:50',
              time_end: '12:30',
            },
          ]
        },
        {
          id: "ed62f115-fc0b-489b-85ad-bsss57ee20",
          name: "Зал 3",
          slug: "ed62f115-fcjkl0b-4ljk89b-85ad-b4jkljee20",
          speeches: [
            {
              id: "ftuiti61-0937-4304-92a4-fee82uiy0f18f2",
              status: 'done',
              title: 'Перерыв',
              time_begin: '11:00',
              time_end: '11:05',
            },
            {
              id: "a4yiyi861-0937-4304-92a4-feiyif18f2",
              status: 'hold',
              title: 'Диджитал-привлечение в корпоративном бизнесе. Есть ли место подвигу?',
              speakers: [
               {
                  name: 'Владимир Химаныч',
                  avatar_url: 'https://i.pinimg.com/originals/87/8f/ce/878fcef0c41b03f5f1605daad41d3a90.jpg',
                  position: 'Руководитель дирекции обслуживания корпоративных клиентов и инвестиционно-банковских операций, руководитель дирекции обслуживания корпоративных клиентов и инвестиционно-банковских операций'
                },
                {
                  name: 'Аркадий Пожарский',
                  avatar_url: 'https://klkfavorit.ru/wp-content/uploads/5/6/9/5694f516ff52f6962bec5247e92fef29.jpeg',
                  position: 'Руководитель дирекции обслуживания физических лиц и малого бизнеса',
                },
                {
                  name: 'Аркадий Пожарский',
                  avatar_url: 'https://kinpet.ru/upload/medialibrary/add/DRT8.jpg',
                  position: 'Руководитель дирекции по управлению рисками',
                },
                {
                  name: 'Аркадий Пожарский',
                  avatar_url: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/51c59160145855.5a3dbfa5da735.jpg',
                  position: 'Руководитель административно-хозяйственного управления',
                }
              ],
              time_begin: '11:05',
              time_end: '11:20',
            },
            {
              id: "yu-0937-4304-92a4-fee82fyuf2",
              status: 'online',
              title: 'Формула лучшего КЦ: взболтать, но не смешивать',
              time_begin: '11:20',
              time_end: '11:25',
            },
          ]
        },
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/styles/mixins.scss';

.s-program {
  padding: var(--main-section-padding-vertical) 0;
  background-color: #000;
}
</style>
