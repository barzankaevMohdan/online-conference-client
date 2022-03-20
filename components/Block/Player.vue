<template lang="pug">
  UiOverMini(
    @mini-active="miniActive"
    @mini-disabled="miniDisabled"
  )
    UiButton.player__join-btn(
      v-if="!clients.length && !miniHandler && !streamStarted"
      @click="joinToRoom"
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

const id = Date.now()

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
    this.socket.on(ACTIONS.ICE_CANDIDATE, ({peerID, iceCandidate}) => {
      this.peerConnections[peerID]?.addIceCandidate(
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
      return this.room?.roomID ?? id
    },
    streamStarted() {
      return this.roomId !== id
    }
  },
  methods: {
    miniActive(data) {
      this.miniHandler = data
    },
    miniDisabled(data) {
      this.miniHandler = data
    },
    async joinToRoom() {
      this.isLoading = true
      await this.startCapture()
        .then(() => this.socket.emit(ACTIONS.JOIN, {roomID: this.roomId, streamID: this.activeStreamId}))
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
      }, 0)
    },
    handleRoom({roomID, streamID}) {
      this.$store.commit('player/createRoom', {roomID, streamID})
    },
    async handleNewPeer({peerID, createOffer}) {
      if (peerID in this.peerConnections) {
        return console.warn(`Already connected to peer ${peerID}`)
      }

      this.peerConnections[peerID] = new RTCPeerConnection({
        iceServers: freeice(),
      })

      this.peerConnections[peerID].onicecandidate = event => {
        if (event.candidate) {
          this.socket.emit(ACTIONS.RELAY_ICE, {
            peerID,
            iceCandidate: event.candidate,
          })
        }
      }

      let tracksNumber = 0
      this.peerConnections[peerID].ontrack = ({streams: [remoteStream]}) => {
        tracksNumber++

        if (tracksNumber === 2) { // video & audio tracks received
          tracksNumber = 0
          this.addNewClient(peerID, remoteStream)
        }
      }

      this.localMediaStream?.getTracks().forEach(track => {
        this.peerConnections[peerID].addTrack(track, this.localMediaStream)
      })

      if (createOffer) {
        const offer = await this.peerConnections[peerID].createOffer()

        await this.peerConnections[peerID].setLocalDescription(offer)

        this.socket.emit(ACTIONS.RELAY_SDP, {
          peerID,
          sessionDescription: offer,
        })
      }
    },
    async setRemoteMedia({peerID, sessionDescription: remoteDescription}) {
      await this.peerConnections[peerID]?.setRemoteDescription(
        new RTCSessionDescription(remoteDescription)
      )

      if (remoteDescription.type === 'offer') {
        const answer = await this.peerConnections[peerID].createAnswer()

        await this.peerConnections[peerID].setLocalDescription(answer)

        this.socket.emit(ACTIONS.RELAY_SDP, {
          peerID,
          sessionDescription: answer,
        })
      }
    },
    handleRemovePeer({peerID}) {
      if (this.peerConnections[peerID]) {
        this.peerConnections[peerID].close();
      }

      delete this.peerConnections[peerID];
      delete this.peerMediaElements[peerID];

      this.clients = this.clients.filter(c => c !== peerID)
    },
    handleRemoveRoom({roomID}) {
      this.$store.commit('player/deleteRoom', roomID)
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
