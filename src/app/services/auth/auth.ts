import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from './login.model';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  login(credentials: { email: string; password: string }): Observable<LoginModel> {
    console.log('Login attempted with', credentials);
    return this.http.post<LoginModel>('http://127.0.0.1:8080/api/auth/login/faculty', credentials);
  }

  validateToken(): Observable<boolean> {
    const token = this.cookieService.get('token');
    return this.http.get<boolean>('http://127.0.0.1:8080/api/auth/validate', { headers: { Authorization: `Bearer ${token}` } });
  }
}
