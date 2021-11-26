import {io} from "socket.io-client";

const {REACT_APP_SOCKET_URL} = process.env

export default class socketAPI {
  private socket: any

  constructor() {
    const token = localStorage.getItem('token')
    this.socket = io(REACT_APP_SOCKET_URL as string, {
      auth: {
        Bearer: `${token}`
      },
      transports: [ 'websocket', 'polling' ]
    });
  }

  disconnect() {
    return new Promise((resolve) => {
      this.socket.disconnect(() => {
        this.socket = null;
        resolve('disconnected');
      });
    });
  }

  emit(event: string, data: any) {
    return this.socket.emit(event, data)
  }

  on(event: string, cb: Function) {
    return this.socket.on(event, cb);
  }
}
