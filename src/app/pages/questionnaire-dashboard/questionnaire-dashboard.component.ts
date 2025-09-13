import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-questionnaire-dashboard',
  templateUrl: './questionnaire-dashboard.component.html',
  styleUrls: ['./questionnaire-dashboard.component.css']
})
export class QuestionnaireDashboardComponent implements OnInit {

  // Dashboard summary properties
  totalQuestions: number = 0;
  totalResponses: number = 0;
  responseRate: number = 0;
  additionalPositivePercent: number = 0;
  additionalNegativePercent: number = 0;

  // Example: Responses for one question
  barChartData: ChartData<'bar'> = {
    labels: ['Option A', 'Option B', 'Option C'],
    datasets: [
      { label: 'Responses', data: [10, 15, 5], backgroundColor: '#3498db' }
    ]
  };

  barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: { display: false }
    }
  };

  pieChartData: ChartData<'pie'> = {
    labels: ['Excellent', 'Good', 'Average', 'Poor'],
    datasets: [
      {
        data: [40, 30, 20, 10],
        backgroundColor: ['#2ecc71', '#3498db', '#f1c40f', '#e74c3c']
      }
    ]
  };

  pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' }
    }
  };

  constructor() { }

  ngOnInit(): void {
    // Example: Initialize dashboard values
    this.loadDashboardData();
  }

  loadDashboardData() {
    // Replace with actual data from your service/API
    this.totalQuestions = 10;
    this.totalResponses = 8;
    this.responseRate = Math.round((this.totalResponses / this.totalQuestions) * 100);
    this.additionalPositivePercent = 70;
    this.additionalNegativePercent = 30;
  }
}
