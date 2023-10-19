import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket$: WebSocketSubject<any> | undefined;

  public connect(): void {
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = webSocket('ws://localhost:8000/ws');
    }
  }

  public getMessages(): Observable<any> {
    // @ts-ignore
    return this.socket$.asObservable();
  }

  public sendMessage(message: any): void {
    // @ts-ignore
    this.socket$.next(message);
  }

  public close(): void {
    // @ts-ignore
    this.socket$.complete();
  }
}
