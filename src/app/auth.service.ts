import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from "./environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}`;
  constructor(private http: HttpClient) { }
  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(this.apiUrl + `/login`, credentials).pipe(
      map((response: any) => {
        if (response && response.token) {
          return response.token;
        }
        return null;
      })
    );
  }

  // Função para checar se o usuário está autenticado
  isAuthenticated(): boolean {
    return !! window.sessionStorage.getItem('token');
  }

  // Função para obter o token JWT
  getToken(): string | null {
    return window.sessionStorage.getItem('token');
  }

  // Função para fazer logout
  logout(): void {
    window.sessionStorage.removeItem('token');
  }
}
