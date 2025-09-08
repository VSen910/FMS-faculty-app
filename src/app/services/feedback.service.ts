import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DetailedQuestionnaire, FeedbackResponse } from '../models/feedback.model';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  private questionnaires: DetailedQuestionnaire[] = [];
  private feedbacks: FeedbackResponse[] = [];

  private questionnairesSubject = new BehaviorSubject<DetailedQuestionnaire[]>([]);
  questionnairesObs = this.questionnairesSubject.asObservable();

  private feedbacksSubject = new BehaviorSubject<FeedbackResponse[]>([]);
  feedbacksObs = this.feedbacksSubject.asObservable();

  constructor() {}

  /** Questionnaire methods */
  getQuestionnaires(): DetailedQuestionnaire[] {
    return this.questionnaires;
  }

  upsertQuestionnaire(q: DetailedQuestionnaire) {
    const idx = this.questionnaires.findIndex((x) => x.id === q.id);
    if (idx > -1) {
      this.questionnaires[idx] = q;
    } else {
      this.questionnaires.push(q);
    }
    this.questionnairesSubject.next([...this.questionnaires]);
  }

  deleteQuestionnaire(id: string) {
    this.questionnaires = this.questionnaires.filter((q) => q.id !== id);
    this.questionnairesSubject.next([...this.questionnaires]);
  }

  /** Feedback methods */
  getFeedbacks(): FeedbackResponse[] {
    return this.feedbacks;
  }

  addFeedback(response: FeedbackResponse) {
    this.feedbacks.push(response);
    this.feedbacksSubject.next([...this.feedbacks]);
  }
}
