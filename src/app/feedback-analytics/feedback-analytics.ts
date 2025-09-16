import { Component, Input, OnInit } from '@angular/core';
import {
  FormAnalytics,
  QuestionAnalytics,
} from '../models/analyticsResponse.model';
import { Faculty } from '../services/faculty/faculty';
import { ActivatedRoute, Router } from '@angular/router';
import { AgCharts } from 'ag-charts-angular';
import { AgChartOptions } from 'ag-charts-community';
import { QuestionChart } from '../models/questionChart.model';
import { Dialog } from '@angular/cdk/dialog';
import { AnswersModal } from '../components/answers-modal/answers-modal';
import { Assignee } from '../models/assignee.model';
import { ViewAssignees } from '../components/view-assignees/view-assignees';
import { FormsModule } from '@angular/forms';
import { Auth } from '../services/auth/auth';

@Component({
  selector: 'app-feedback-analytics',
  imports: [AgCharts, FormsModule],
  templateUrl: './feedback-analytics.html',
  styleUrl: './feedback-analytics.css',
})
export class FeedbackAnalytics implements OnInit {
  analytics!: FormAnalytics;
  formId: number;
  avgBarOptions!: AgChartOptions;
  avgPieOptions!: AgChartOptions;
  options!: QuestionChart[];
  textQuestions!: QuestionAnalytics[];
  assignees: Assignee[] = [];
  newAssigneeEmails: string = '';

  constructor(
    private faculty: Faculty,
    private route: ActivatedRoute,
    private dialog: Dialog,
    private auth: Auth,
    private router: Router
  ) {
    this.formId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.auth.validateToken().subscribe({
      next: (isValid) => {
        if (!isValid) {
          this.router.navigate(['/login']);
        }
      },
      error: (error) => {
        console.error('Token validation failed', error);
        this.router.navigate(['/login']);
      },
    });
    this.faculty.getAnalytics(this.formId).subscribe({
      next: (response) => {
        if (response.status === 'success' && response.analytics) {
          this.analytics = response.analytics;
          this.createAvgOptions();
          this.createOptions();
          this.getTextQuestions();
        }
      },
      error: (err) => {
        console.error(err);
      },
    });

    this.getAssignees();
  }

  createAvgOptions() {
    const data = Object.entries(this.analytics.overallRatingCounts).map(
      ([rating, count]) => ({ rating: `${rating} ★`, count })
    );
    this.avgBarOptions = {
      title: {
        enabled: true,
        text: 'Overall ratings',
      },
      data,
      series: [{ type: 'bar', xKey: 'rating', yKey: 'count' }],
    };
    this.avgPieOptions = {
      title: {
        enabled: true,
        text: 'Overall ratings %',
      },
      data,
      series: [
        {
          type: 'pie',
          legendItemKey: 'rating',
          angleKey: 'count',
          tooltip: {
            enabled: true,
            renderer: (params) => {
              const { datum, angleKey } = params;
              const value = datum[angleKey];
              const percentage = (
                (value / this.analytics.overallRatingCount) *
                100
              ).toFixed(1);
              return {
                title: datum.rating,
                data: [
                  { label: 'Count', value: value },
                  { label: 'Percentage', value: `${percentage}%` },
                ],
              };
            },
          },
        },
      ],
    };
  }

  createOptions() {
    const ratingQuestions = this.analytics.questions.filter(
      (q) => q.type === 'RATING'
    );
    this.options = ratingQuestions.map((q) => {
      const data = Object.entries(q.ratingCounts ?? {}).map(
        ([rating, count]) => ({
          rating: `${rating} ★`,
          count,
        })
      );
      return {
        prompt: q.prompt,
        barOptions: {
          title: {
            enabled: true,
            text: 'Ratings',
          },
          data,
          series: [{ type: 'bar', xKey: 'rating', yKey: 'count' }],
        },
        pieOptions: {
          title: {
            enabled: true,
            text: 'Ratings %',
          },
          data,
          series: [
            {
              type: 'pie',
              legendItemKey: 'rating',
              angleKey: 'count',
              tooltip: {
                enabled: true,
                renderer: (params) => {
                  const { datum, angleKey } = params;
                  const value = datum[angleKey];
                  const percentage = (
                    (value / q.responseCount) *
                    100
                  ).toFixed(1);
                  return {
                    title: datum.rating,
                    data: [
                      { label: 'Count', value: value },
                      { label: 'Percentage', value: `${percentage}%` },
                    ],
                  };
                },
              },
            },
          ],
        },
      };
    });
  }

  getAssignees() {
    this.faculty.getAssignees(this.formId).subscribe({
      next: (response) => {
        this.assignees = response.assignees;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  getTextQuestions() {
    this.textQuestions = this.analytics.questions.filter(
      (q) => q.type === 'TEXT'
    );
  }

  viewAnswers(questionId: number) {
    const question = this.textQuestions.find(
      (q) => q.questionId === questionId
    );
    if (question) {
      this.dialog.open(AnswersModal, {
        data: {
          answers: question.texts,
        },
      });
    } else {
      console.error(`Question with id ${questionId} not found`);
    }
  }

  viewAssignees() {
    const dialogRef = this.dialog.open<boolean>(ViewAssignees, {
      data: {
        formId: this.formId,
        assignees: this.assignees,
      },
    });
    dialogRef.closed.subscribe({
      next: (response) => {
        if (response) {
          this.getAssignees();
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  addAssignees() {
    const emails = this.newAssigneeEmails.split(',').map((e) => e.trim());
    this.faculty.addAssignees(emails, this.formId).subscribe({
      next: (response) => {
        alert(
          'Assignees added successfully (omitting pre-existing/invalid users)'
        );
        this.getAssignees();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
