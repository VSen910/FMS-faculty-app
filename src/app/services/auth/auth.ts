import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../../models/login.model';
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
    const token = this.cookieService.get('facultyToken');
    return this.http.get<boolean>(`${environment.apiUrl}/api/auth/validate`, { headers: { Authorization: `Bearer ${token}` } });
  }

  logout(): void {
    this.cookieService.delete('facultyToken');
    this.cookieService.delete('fullName');
    console.log('User logged out, cookies cleared.');
  }

  changePassword(passwords: { oldPassword: string; newPassword: string }): Observable<{ message: string, status: string }> {
    const token = this.cookieService.get('facultyToken');
    return this.http.post<{ message: string, status: string }>(`${environment.apiUrl}/api/auth/change-password`, passwords, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
}
