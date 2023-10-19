import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { UserModel } from "./user.model";
import { environment } from "../environments/environment";
import { AuthService } from "../auth.service";
import jwt_decode from "jwt-decode";

const apiUrl = `${environment.apiUrl}/users`;

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient, private authService: AuthService) { }
  user: UserModel | undefined;
  public token = this.authService.getToken();
  public headers: HttpHeaders = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `${this.token}`
  });
  get(id: string): Observable<UserModel> {
    return this.http.get<UserModel>(`${apiUrl}/${id}`, {headers: this.headers});
  }

  decodeJwt(): any {
    let token = String(this.authService.getToken())
    console.log(jwt_decode(token))
    return jwt_decode(token);
  }

  getId(): string {
    return this.decodeJwt()['Id']
  }

  getUser(): UserModel | undefined {
    this.get(this.getId()).subscribe({
      next: (data) => {
        this.user = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    })
    return this.user
  }
}
