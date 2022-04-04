<template lang="pug">
  UiOverMini(
    @mini-active="miniActive"
    @mini-disabled="miniDisabled"
  )
    UiButton.player__join-btn(
      v-if="!clients.length && !miniHandler && !streamStarted"
      @click="createRoom"
      :isLoading="isLoading"
    ) Начать стрим
    UiButton.player__join-btn(
      v-else-if="!clients.length && !miniHandler && streamStarted"
      @click="joinToRoom"
      :isLoading="isLoading"
    ) Присоединиться
    img.player__cover(
      :src="require('~/assets/img/demo/hold.png')"
      v-if="!clients.length"
    )
    .player__video-wrapper
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

const id = 45

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
  mounted() {
    this.socket.on(ACTIONS.ADD_ROOM, this.handleRoom)
    this.socket.on(ACTIONS.ADD_PEER, this.handleNewPeer)
    this.socket.on(ACTIONS.SESSION_DESCRIPTION, this.setRemoteMedia)
    this.socket.on(ACTIONS.ICE_CANDIDATE, ({peerId, iceCandidate}) => {
      this.peerConnections[peerId]?.addIceCandidate(
        new RTCIceCandidate(iceCandidate)
      )
    })
    this.socket.on(ACTIONS.REMOVE_PEER, this.handleRemovePeer)
    this.socket.on(ACTIONS.LEAVE, this.handleRemoveRoom)
  },
  beforeDestroy() {
    this.localMediaStream?.getTracks().forEach(track => track.stop());
    this.socket.emit(ACTIONS.LEAVE);
  },
  computed: {
    room() {
      return this.$store.getters['player/roomById'](this.activeStreamId)
    },
    roomId() {
      return this.room?.id ?? id
    },
    streamStarted() {
      return this.room ?? false
    },
  },
  methods: {
    miniActive(data) {
      this.miniHandler = data
    },
    miniDisabled(data) {
      this.miniHandler = data
    },
    async createRoom() {
      this.isLoading = true
      const data = {
        roomId: this.roomId,
        streamId: this.activeStreamId
      }
      await this.$store.dispatch('player/createStreamRoom', data)
      await this.startCapture()
        .then(() => {
          this.socket.emit(ACTIONS.JOIN, data)
          this.socket.emit(ACTIONS.ADD_ROOM, data)
        })
        .catch(e => console.error(e))
      this.addNewClient('LOCAL_VIDEO', this.localMediaStream)
      this.isLoading = false
    },
    async joinToRoom() {
      this.isLoading = true
      const data = {
        roomId: this.roomId,
        streamId: this.activeStreamId
      }
      await this.startCapture()
        .then(() => this.socket.emit(ACTIONS.JOIN, data))
        .catch(e => console.error(e))
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
      if (!this.clients.includes(newClient)) {
        this.clients.push(newClient)
      }
      setTimeout(() => {
        this.peerMediaElements[newClient] = document.getElementById(newClient)
        const videoElement = this.peerMediaElements[newClient]
        videoElement.srcObject = stream
      }, 100)
    },
    handleRoom({roomId, streamId}) {
      this.$store.commit('player/createRoom', {roomId, streamId})
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

      // let tracksNumber = 0
      this.peerConnections[peerId].ontrack = ({streams: [remoteStream]}) => {
        // tracksNumber++
        this.addNewClient(peerId, remoteStream)

        // if (tracksNumber === 2) { // video & audio tracks received
        //   tracksNumber = 0
        //   this.addNewClient(peerId, remoteStream)
        // }
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
    handleRemoveRoom({roomId}) {
      console.log(roomId);
      // this.$store.commit('player/deleteRoom', roomId)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~/styles/mixins.scss";

.player {
  &__join-btn {
    position: absolute !important;
    top: 15px;
    left: 15px;
    z-index: 10;
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

  &__cover {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
  }

  &__video {
    max-width: 100%;
    max-height: 100px;
    padding: 1px;
    border: 1px solid var(--dark-1);
    z-index: 1;
    object-fit: cover;

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
}
</style>
