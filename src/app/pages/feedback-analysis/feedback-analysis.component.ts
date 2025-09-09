import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Needed for *ngIf / *ngFor
import { FeedbackService } from '../../services/feedback.service';
import { Questionnaire, Question, FeedbackResponse } from '../../models/feedback.model';

@Component({
  selector: 'app-feedback-analysis',
  templateUrl: './feedback-analysis.component.html',
  styleUrls: ['./feedback-analysis.component.css'],
  // If using Angular 15+ standalone component, uncomment below:
  // standalone: true,
  // imports: [CommonModule]
})
export class FeedbackAnalysisComponent implements OnInit {
  questionnaires: Questionnaire[] = [];
  feedbacks: FeedbackResponse[] = [];
  selectedQ?: Questionnaire;
  error: string = '';
  isLoading: boolean = true;

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.loadQuestionnaires();
    this.loadFeedbacks();
  }

  loadQuestionnaires() {
    this.feedbackService.getQuestionnaires().subscribe({
      next: (qs) => (this.questionnaires = qs),
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load questionnaires';
      }
    });
  }

  loadFeedbacks() {
    this.feedbackService.getFeedbacks().subscribe({
      next: (fs) => {
        this.feedbacks = fs;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load feedbacks';
        this.isLoading = false;
      }
    });
  }

  // Filter responses by questionnaire ID
  responsesFor(qId: number): FeedbackResponse[] {
    return this.feedbacks.filter(fb => fb.questionnaireId === qId);
  }

  avgLikert(question: Question, responses: FeedbackResponse[]): number {
    let sum = 0, count = 0;
    responses.forEach(r => {
      const ans = r.answers.find(a => a.questionId === question.id);
      if (ans && !isNaN(Number(ans.response))) {
        sum += Number(ans.response);
        count++;
      }
    });
    return count ? +(sum / count).toFixed(2) : 0;
  }

  distribution(question: Question, responses: FeedbackResponse[]): Record<number, number> {
    const dist: Record<number, number> = {};
    responses.forEach(r => {
      const ans = r.answers.find(a => a.questionId === question.id);
      if (ans && !isNaN(Number(ans.response))) {
        const val = Number(ans.response);
        dist[val] = (dist[val] || 0) + 1;
      }
    });
    return dist;
  }

  textAnswers(question: Question, responses: FeedbackResponse[]): string[] {
    return responses
      .map(r => {
        const ans = r.answers.find(a => a.questionId === question.id);
        return typeof ans?.response === 'string' ? ans.response : null;
      })
      .filter((v): v is string => v !== null);
  }

  selectQuestionById(qId: string | number) {
    this.selectedQ = this.questionnaires.find(q => q.id == qId);
  }
}
