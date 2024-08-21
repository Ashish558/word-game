import io, { Socket as ClientSocket } from "socket.io-client";
const baseUrl : string = process.env.REACT_APP_BASE_URL  || ''
class Socket {
  static socket: ClientSocket | undefined;

  public static initializeSocket(username: string): void {
    Socket.socket = io(baseUrl, {
      transports: ["websocket"],
      query: { username },
    });
  }

  public static getSocket(): ClientSocket {
    return this.socket as ClientSocket;
  }
}
export default Socket;
