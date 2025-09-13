import { Component, OnInit } from '@angular/core';
import { Chart, ChartOptions } from 'chart.js/auto';

@Component({
  selector: 'app-feedback-dashboard',
  templateUrl: './feedback-dashboard.component.html',
  styleUrls: ['./feedback-dashboard.component.css']
})
export class FeedbackDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.initCharts();
  }

  initCharts(): void {
    const ratingsBarCtx = (document.getElementById('ratingsBarChart') as HTMLCanvasElement).getContext('2d');
    const overallSentimentPieCtx = (document.getElementById('overallSentimentPieChart') as HTMLCanvasElement).getContext('2d');
    const knowledgeBarCtx = (document.getElementById('knowledgeBarChart') as HTMLCanvasElement).getContext('2d');
    const knowledgePieCtx = (document.getElementById('knowledgePieChart') as HTMLCanvasElement).getContext('2d');
    const methodologyBarCtx = (document.getElementById('methodologyBarChart') as HTMLCanvasElement).getContext('2d');
    const methodologyPieCtx = (document.getElementById('methodologyPieChart') as HTMLCanvasElement).getContext('2d');

    const pieOptions: ChartOptions<'pie'> = {
      plugins: {
        legend: {
          display: true,
          position: 'right'
        }
      }
    };

    if (ratingsBarCtx && overallSentimentPieCtx && knowledgeBarCtx && knowledgePieCtx && methodologyBarCtx && methodologyPieCtx) {
      // Ratings Bar Chart
      new Chart(ratingsBarCtx, {
        type: 'bar',
        data: {
          labels: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
          datasets: [{
            label: 'Number of Ratings',
            data: [10, 20, 30, 25, 15],
            backgroundColor: '#6a1b9a'
          }]
        }
      });

      // Overall Sentiment Pie Chart
      new Chart(overallSentimentPieCtx, {
        type: 'pie',
        data: {
          labels: ['Positive 😊', 'Negative 😞'],
          datasets: [{
            data: [80, 20],
            backgroundColor: ['#4caf50', '#f44336']
          }]
        },
        options: pieOptions
      });

      // Knowledge Bar Chart
      new Chart(knowledgeBarCtx, {
        type: 'bar',
        data: {
          labels: ['1', '2', '3', '4', '5'],
          datasets: [{
            label: 'Knowledge Ratings',
            data: [10, 15, 20, 25, 30],
            backgroundColor: '#1976d2'
          }]
        }
      });

      // Knowledge Pie Chart
      new Chart(knowledgePieCtx, {
        type: 'pie',
        data: {
          labels: ['Positive 😊', 'Negative 😞'],
          datasets: [{
            data: [85, 15],
            backgroundColor: ['#4caf50', '#f44336']
          }]
        },
        options: pieOptions
      });

      // Methodology Bar Chart
      new Chart(methodologyBarCtx, {
        type: 'bar',
        data: {
          labels: ['1', '2', '3', '4', '5'],
          datasets: [{
            label: 'Methodology Ratings',
            data: [5, 10, 20, 35, 25],
            backgroundColor: '#00796b'
          }]
        }
      });

      // Methodology Pie Chart
      new Chart(methodologyPieCtx, {
        type: 'pie',
        data: {
          labels: ['Positive 😊', 'Negative 😞'],
          datasets: [{
            data: [78, 22],
            backgroundColor: ['#4caf50', '#f44336']
          }]
        },
        options: pieOptions
      });
    }
  }
}
