import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Questionnaire, FeedbackResponse } from '../models/feedback.model';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private questionnaires: Questionnaire[] = [];
  private feedbacks: FeedbackResponse[] = [];

  getFeedbacks(): Observable<FeedbackResponse[]> {
    return of(this.feedbacks);
  }

  getQuestionnaires(): Observable<Questionnaire[]> {
    return of(this.questionnaires);
  }

  createQuestionnaire(q: Questionnaire): Observable<Questionnaire> {
    this.questionnaires.push(q);
    return of(q);
  }
}
