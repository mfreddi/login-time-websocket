import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { MessageInterface } from '../model/message-interface';

@Injectable()
export class SocketService {
    private socket: WebSocket;

    constructor() {}

    init(url?): Observable<Event> {
      this.socket = new WebSocket(url);

      return new Observable<Event>(observer => {
        this.socket.onopen = (data) => {
          observer.next(data);
        };
      });
    }
    onmessage(): Observable<MessageInterface> {
        return new Observable<MessageInterface>(observer => {
          this.socket.onmessage = ({data}) => {
            observer.next(JSON.parse(data));
          };
        });
    }
    onclose(): Observable<Event> {
        return new Observable<Event>(observer => {
          this.socket.onclose = () => {
            observer.next();
          };
        });
    }
    close(): void {
      this.socket.close();
    }
}
