import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from './login.model';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  login(credentials: { email: string; password: string }): Observable<LoginModel> {
    console.log('Login attempted with', credentials);
    return this.http.post<LoginModel>(`${environment.apiUrl}/api/auth/login/faculty`, credentials);
  }

  validateToken(): Observable<boolean> {
    const token = this.cookieService.get('token');
    return this.http.get<boolean>(`${environment.apiUrl}/api/auth/validate`, { headers: { Authorization: `Bearer ${token}` } });
  }
}
