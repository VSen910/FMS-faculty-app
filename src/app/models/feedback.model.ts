export type QuestionType = 'mcq' | 'likert' | 'text';

export interface Question {
  id: string;
  text?: string;           // 👈 make optional
  prompt?: string;         // 👈 new field
  type?: QuestionType;
  options?: string[] | null;
  scaleMax?: number | null;
  required?: boolean;
}

export interface FeedbackResponse {
  id: string;
  answers: { questionId: string; value: number }[];
}

export interface Questionnaire {
  id: string;
  title: string;
  description?: string;
  createdAt?: string;
  questions: Question[];
}
