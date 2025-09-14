import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environments';
import { Observable } from 'rxjs';
import { Feedback } from '../../models/feedback.model';
import { CreateFormRequest } from '../../models/createFormRequest.model';

@Injectable({
  providedIn: 'root',
})
export class Faculty {
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  getAllFeedbacks(): Observable<Feedback[]> {
    const token = this.cookieService.get('token');
    return this.http.get<Feedback[]>(
      `${environment.apiUrl}/api/faculty/forms`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  createForm(feedbackForm: CreateFormRequest) {
    const token = this.cookieService.get('token');
    return this.http.post(
      `${environment.apiUrl}/api/faculty/forms`,
      feedbackForm,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
}
