import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private apiUrl = `${environment.apiUrl}/register`;

  constructor(private http: HttpClient) {}

  register(name: string, email: string, password: string) {
    const payload = { name, email, password };
    return this.http.post(this.apiUrl, payload).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }
}
