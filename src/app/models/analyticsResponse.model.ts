// For individual rating or text question stats
export interface QuestionAnalytics {
  questionId: number;
  prompt: string;
  type: "RATING" | "TEXT";

  // For RATING type
  avgRating?: number;
  responseCount: number;
  ratingCounts?: Record<number, number>;
  ratingPercentagesOfSubmitted?: Record<number, number>;

  // For TEXT type
  texts?: string[];
}

// For the overall analytics object
export interface FormAnalytics {
  formId: number;
  title: string;

  assignedCount: number;
  submittedCount: number;
  submittedPercentage: number;

  questions: QuestionAnalytics[];

  overallAvgRating: number;
  overallRatingCount: number;
  overallRatingCounts: Record<number, number>;
}

// For the full API response
export interface AnalyticsResponse {
  status: "success" | "error";
  formId?: number;                  // only present on success
  analytics?: FormAnalytics;        // only present on success
  message?: string;                 // only present on error
}
