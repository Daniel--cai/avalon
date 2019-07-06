import Sockette, { SocketteOptions } from "sockette";

export interface SocketService {
  onConnect: (e: Event) => any;
  onDisconnect: (e: CloseEvent) => any;
  onError: (e: Event) => any;
  onMessage: (e: MessageEvent) => any;
  sendMessage: (data: any) => any;
}

export class SocketServiceImpl implements SocketService {
  private _socket: Sockette;
  private readonly _url: string;

  constructor(url: string) {
    this._url = url;
    this._socket = (null as unknown) as Sockette;
  }
  connect = () => {
    const options: SocketteOptions = {
      onopen: this.onConnect,
      onmessage: this.onMessage,
      onclose: this.onDisconnect,
      onerror: this.onError
    };
    this._socket = new Sockette(this._url, options);
  };
  onConnect = (e: Event) => {
    console.log("connected:", e);
  };
  onDisconnect = (e: CloseEvent) => {
    console.log("Closed!", e);
  };
  onError = (e: Event) => {
    console.log("Error:", e);
  };
  sendMessage = (data: any) => {
    this._socket.send(data);
  };
  onMessage = (e: MessageEvent) => {
    console.log("message!");
    console.log(e.data);
    // store.events.push(JSON.parse(e.data));
  };
}
