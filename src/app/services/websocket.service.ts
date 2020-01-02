import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import * as Rx from 'rxjs';
import { config } from '../config';

// import {SOCKET_EVENTS} from '../config';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private socket;


  constructor() {

   }

  connect(): Rx.Subject<MessageEvent> {
    // const token = localStorage.getItem('token');
    // const payload = token.split('.')[1];
    // const obj = window.atob(payload);

    this.socket = io('http://localhost:3000');

    const observable = new Observable(observer => {
        this.socket.on('message', (data) => {
          observer.next(data);
        });
        return () => {
          this.socket.disconnect();
        };
    });

    const observer = {
        next: (data) => {
          this.socket.emit('message',  JSON.stringify(data));
        },
    };

    return Rx.Subject.create(observer, observable);
  }


}
