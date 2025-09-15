import { AgChartOptions } from 'ag-charts-community';

export interface QuestionChart {
  prompt: string;
  barOptions: AgChartOptions;
  pieOptions: AgChartOptions;
}
