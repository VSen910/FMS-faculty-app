import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackService } from '../../services/feedback.service';
import { Questionnaire, FeedbackResponse } from '../../models/feedback.model';

@Component({
  selector: 'app-feedback-analysis',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feedback-analysis.component.html',
  styleUrls: ['./feedback-analysis.component.css']
})
export class FeedbackAnalysisComponent implements OnInit {
  feedbacks: FeedbackResponse[] = [];
  questionnaire: Questionnaire | null = null;
  isLoading: boolean = true;
  error: string | null = null;

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.loadFeedbackData();
  }

  loadFeedbackData(): void {
    this.feedbackService.getFeedbacks().subscribe({
      next: (data: FeedbackResponse[]) => {
        this.feedbacks = data;
        this.isLoading = false;
      },
      error: (err: any) => {
        this.error = 'Failed to load feedback data';
        this.isLoading = false;
        console.error(err);
      }
    });

    this.feedbackService.getQuestionnaire().subscribe({
      next: (data: Questionnaire) => {
        this.questionnaire = data;
      },
      error: (err: any) => {
        console.error('Failed to load questionnaire', err);
      }
    });
  }

  getAverageRating(questionId: string): number {
    if (!this.feedbacks.length) return 0;
    let sum = 0, count = 0;
    this.feedbacks.forEach(fb => {
      const ans = fb.answers.find(a => a.questionId === questionId);
      if (ans && typeof ans.value === 'number') {
        sum += ans.value;
        count++;
      }
    });
    return count ? +(sum / count).toFixed(2) : 0;
  }
}
