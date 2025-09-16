import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environments';
import { Observable } from 'rxjs';
import { Feedback } from '../../models/feedback.model';
import { CreateFormRequest } from '../../models/createFormRequest.model';
import { AnalyticsResponse } from '../../models/analyticsResponse.model';
import { AssigneesResponse } from '../../models/assignee.model';

@Injectable({
  providedIn: 'root',
})
export class Faculty {
  token: string;

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.token = this.cookieService.get('facultyToken');
  }

  getAllFeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(
      `${environment.apiUrl}/api/faculty/forms`,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
  }

  createForm(feedbackForm: CreateFormRequest) {
    return this.http.post(
      `${environment.apiUrl}/api/faculty/forms`,
      feedbackForm,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
  }

  getAnalytics(formId: number): Observable<AnalyticsResponse> {
    return this.http.get<AnalyticsResponse>(
      `${environment.apiUrl}/api/faculty/forms/${formId}/analytics`,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
  }

  addAssignees(emails: string[], formId: number) {
    return this.http.post(
      `${environment.apiUrl}/api/faculty/forms/${formId}/assign`,
      {
        emails,
      },
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
  }

  getAssignees(formId: number): Observable<AssigneesResponse> {
    return this.http.get<AssigneesResponse>(
      `${environment.apiUrl}/api/faculty/forms/${formId}/assignees`,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
  }

  deleteAssignee(formId: number, email: string) {
    return this.http.delete(
      `${environment.apiUrl}/api/faculty/forms/${formId}/assignees?email=${email}`,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
  }
}
