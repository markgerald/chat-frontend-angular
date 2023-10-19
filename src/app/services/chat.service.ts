import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "../environments/environment";
import { ChatModel } from "../chat/chat.model";
import { AuthService } from "../auth.service";
import { map } from "rxjs/operators";

const apiUrl = `${environment.apiUrl}/messages`;
@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private http: HttpClient, private authService: AuthService) {}
  public token = this.authService.getToken();
  public headers: HttpHeaders = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `${this.token}`
  });
  getAll(): Observable<ChatModel[]> {
    return this.http.get<ChatModel[]>(apiUrl, {headers: this.headers}).pipe(
      map(data => {
        return data.map(item => {
          return {
            sender: item.username || item.sender,
            content: item.content
          };
        });
      })
    );
  }
}
