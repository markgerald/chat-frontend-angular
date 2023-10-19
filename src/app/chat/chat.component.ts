import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from "../services/chat.service";
import { WebsocketService } from "./websocket.service";
import { Subscription } from "rxjs";
import { ChatModel } from "./chat.model";
import {LoginService} from "../login/login.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  public messages: ChatModel[] = [];
  public currentMessage: string | undefined;
  private wsSubscription: Subscription | undefined;

  constructor(private chatService: ChatService, private wsService: WebsocketService, private loginService: LoginService) { }

  ngOnInit(): void {
    this.wsService.connect();
    this.wsSubscription = this.wsService.getMessages().subscribe(message => {
      this.messages.push(message);
    });
    console.log(window.sessionStorage.getItem("sender"))
    console.log(this.loginService.getUser()?.name)
    this.chatService.getAll()
      .subscribe((data: ChatModel[]) => {
        this.messages = [...this.messages, ...data];
      });
  }

  sendMessage(): void {
    if (this.currentMessage) {
      const newMessage = { sender: 'You', content: this.currentMessage };
      //this.messages.push(newMessage);
      this.wsService.sendMessage(newMessage);
      this.currentMessage = '';
    }
  }

  ngOnDestroy(): void {
    this.wsService.close();
    if (this.wsSubscription) {
      this.wsSubscription.unsubscribe();
    }
  }

  protected readonly Component = Component;
}
