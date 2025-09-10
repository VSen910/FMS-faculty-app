import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environments';
import { Observable } from 'rxjs';
import { Feedback } from './feedback.model';

@Injectable({
  providedIn: 'root'
})
export class Faculty {
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  getAllFeedbacks(): Observable<Feedback[]> {
    const token = this.cookieService.get('token');
    return this.http.get<Feedback[]>(`${environment.apiUrl}/api/faculty/forms`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
