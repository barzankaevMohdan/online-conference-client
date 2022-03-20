import { io } from "socket.io-client"
import config from "~/config";

export default {
  data() {
    return {
      socket: null,
    }
  },
  mounted() {
    const options = {
      "force new connection" : true,
      reconnectionAttempts: "Infinity",
      timeout : 10000,
      transports : ["websocket"]
    }
    this.socket = io(config.SOCKET_URL, options)
  },
}
