import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class PersonDataService {

  messages: Subject<any>;

  constructor(private wsService: WebsocketService) {
    this.messages = wsService
      .connect()
      .pipe(map((response: any): any => {
        return response;
      })) as Subject<any>;
   }

  initConnection(msg) {
    console.log('initConnection');
    this.messages.next(msg);
  }
}
