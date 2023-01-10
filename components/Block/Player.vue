<template lang="pug">
  UiOverMini(
    @mini-active="miniActive"
    @mini-disabled="miniDisabled"
  )
    template(v-if="!clients.length")
      .player__btn(v-show='!miniHandler')
        UiButton(
          v-if="!streamStarted"
          @click="createRoom"
          :isLoading="isLoading"
        ) Начать стрим

        template(v-else)
          UiButton(
            @click="joinToRoom"
            :isLoading="isLoading"
          ) Присоединиться

          UiButton(
            @click="removeRoom"
            :isLoading="isLoading"
          ) Закончить стрим

      img.player__cover(
        :src="require('~/assets/img/demo/hold.png')"
      )

    .player__video-wrapper(v-else)
      .player__toggle-btn-wrapper
        SvgIcon.player__toggle-btn(@click='toggleCamera' name='video')

        SvgIcon.player__toggle-btn(@click='toggleAudio' name='microphone')

        SvgIcon.player__toggle-btn(@click='leave' name='phone')

      template(v-for="client in clients")
        video.player__video(
          @click="activeVideo = client"
          :id='client'
          v-show="miniHandler ? activeVideo === client : client"
          autoplay
          playsinline
          :muted="client === 'LOCAL_VIDEO'"
          :class="{'player__video_active': activeVideo === client}"
        )

</template>

<script>
import freeice from "freeice";
import socketIO from "~/mixins/socketIO";
import {ACTIONS} from "~/helpers/socketActions.js";
import actualStream from "~/mixins/actualStream"
export default {
  name: 'Player',
  mixins: [socketIO, actualStream],
  data() {
    return {
      isLoading: false,
      localMediaStream: null,
      clients: [],
      peerMediaElements: {},
      peerConnections: {},
      activeVideo: 'LOCAL_VIDEO',
      miniHandler: false,
    }
  },
  async mounted() {
    this.socket.on(ACTIONS.ADD_ROOM, (room) => {
      console.log(ACTIONS.ADD_ROOM, room);
      this.$store.commit('player/updateRoom', room)
    })
    this.socket.on(ACTIONS.ADD_PEER, this.handleNewPeer)
    this.socket.on(ACTIONS.SESSION_DESCRIPTION, this.setRemoteMedia)
    this.socket.on(ACTIONS.ICE_CANDIDATE, ({peerId, iceCandidate}) => {
      this.peerConnections[peerId]?.addIceCandidate(
        new RTCIceCandidate(iceCandidate)
      )
    })
    this.socket.on(ACTIONS.REMOVE_PEER, this.handleRemovePeer)
    this.socket.on(ACTIONS.DELETE_ROOM, (roomId) => {
      console.log(ACTIONS.DELETE_ROOM, roomId);
      this.$store.commit('player/deleteRoom', roomId)
    })
    await this.$store.dispatch('player/getAllRooms')
  },
  beforeDestroy() {
    this.localMediaStream?.getTracks().forEach(track => track.stop());
  },
  computed: {
    room() {
      return this.$store.getters['player/roomByStreamId'](this.activeStreamId)
    },
    roomId() {
      return this.room?.id
    },
    streamStarted() {
      return this.room ?? false
    },
  },
  methods: {
    leave() {
      this.localMediaStream?.getTracks().forEach(track => track.stop());
      this.clients = []
    },
    toggleCamera() {
      const video = this.localMediaStream?.getTracks().find(track => track.kind === 'video')
      
      if (video) {
        video.enabled = !video.enabled
      }
    },
    toggleAudio() {
      const audio = this.localMediaStream?.getTracks().find(track => track.kind === 'audio')

      if (audio) {
        audio.enabled = !audio.enabled
      }
    },
    miniActive(data) {
      this.miniHandler = data
    },
    miniDisabled(data) {
      this.miniHandler = data
    },
    async createRoom() {
      this.isLoading = true
      let room
      await this.$store.dispatch('player/createStreamRoom', this.activeStreamId).then((data) => {
        room = data
      })
      try {
        await this.startCapture()
      } catch(e) {
        console.log(e);
      }
      this.socket.emit(ACTIONS.JOIN, room.id)
      this.socket.emit(ACTIONS.ADD_ROOM, room)
      this.addNewClient('LOCAL_VIDEO', this.localMediaStream)
      this.isLoading = false
    },
    async joinToRoom() {
      this.isLoading = true
      try {
        await this.startCapture()
      } catch(e) {
        console.log(e);
      }
      this.socket.emit(ACTIONS.JOIN, this.roomId)
      this.addNewClient('LOCAL_VIDEO', this.localMediaStream)
      this.isLoading = false
    },
    async startCapture() {
      this.localMediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      })
    },
    addNewClient(newClient, stream) {
      console.log('stream', stream);
      if (!this.clients.includes(newClient)) {
        this.clients.push(newClient)
      }
      setTimeout(() => {
        this.peerMediaElements[newClient] = document.getElementById(newClient)
        const videoElement = this.peerMediaElements[newClient]
        videoElement.srcObject = stream
      }, 100)
    },
    async handleNewPeer({peerId, createOffer}) {
      if (peerId in this.peerConnections) {
        return console.warn(`Already connected to peer ${peerId}`)
      }
      this.peerConnections[peerId] = new RTCPeerConnection({
        iceServers: freeice(),
      })
      this.peerConnections[peerId].onicecandidate = event => {
        if (event.candidate) {
          this.socket.emit(ACTIONS.RELAY_ICE, {
            peerId,
            iceCandidate: event.candidate,
          })
        }
      }
      let tracksNumber = 0
      this.peerConnections[peerId].ontrack = ({streams: [remoteStream]}) => {
        console.log('remoteStream', remoteStream);
        tracksNumber++
        // this.addNewClient(peerId, remoteStream)
        if (tracksNumber === 2) { // video & audio tracks received
          tracksNumber = 0
          this.addNewClient(peerId, remoteStream)
        }
      }
      this.localMediaStream?.getTracks().forEach(track => {
        this.peerConnections[peerId].addTrack(track, this.localMediaStream)
      })
      if (createOffer) {
        const offer = await this.peerConnections[peerId].createOffer()
        await this.peerConnections[peerId].setLocalDescription(offer)
        this.socket.emit(ACTIONS.RELAY_SDP, {
          peerId,
          sessionDescription: offer,
        })
      }
    },
    async setRemoteMedia({peerId, sessionDescription: remoteDescription}) {
      await this.peerConnections[peerId]?.setRemoteDescription(
        new RTCSessionDescription(remoteDescription)
      )
      if (remoteDescription.type === 'offer') {
        const answer = await this.peerConnections[peerId].createAnswer()
        await this.peerConnections[peerId].setLocalDescription(answer)
        this.socket.emit(ACTIONS.RELAY_SDP, {
          peerId,
          sessionDescription: answer,
        })
      }
    },
    handleRemovePeer({peerId}) {
      if (this.peerConnections[peerId]) {
        this.peerConnections[peerId].close();
      }
      delete this.peerConnections[peerId];
      delete this.peerMediaElements[peerId];
      this.clients = this.clients.filter(c => c !== peerId)
    },
    removeRoom() {
      this.$store.dispatch('player/deleteStreamRoom', this.roomId)
      this.socket.emit(ACTIONS.DELETE_ROOM, this.roomId)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~/styles/mixins.scss";
.player {

  &__btn {
    position: absolute;
    top: 15px;
    left: 15px;
    z-index: 1;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-row-gap: 10px;
  }

  &__cover {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
  }

  &__video-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    overflow-x: auto;
  }

  &__video {
    position: relative;
    max-height: 100px;
    padding: 1px;
    border: 1px solid var(--dark-1);
    z-index: 1;
    object-fit: cover;
    transition: border .2s;

    &:hover {
      border-color: var(--main-color);
    }

    &_active {
      position: absolute;
      padding: 0;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      max-height: 100%;
      height: 100%;
      z-index: 0;
      border: none;
    }
  }

  &__toggle-btn-wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 50px;
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
  }

  &__toggle-btn {
    max-width: 30px;
    max-height: 40px;
    fill: var(--main-color);
    cursor: pointer;
    transition: .2s;

    &:hover {
      fill: var(--main-hover-color);
    }

    &:active {
      fill: var(--main-active-color);
    }
  }
}
</style>