export interface Questionnaire {
  id: number;
  title: string;
  questions: Question[];
}

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  options?: string[];
}

export enum QuestionType {
  TEXT = 'text',
  RADIO = 'radio',
  CHECKBOX = 'checkbox'
}

export interface FeedbackResponse {
  questionnaireId: number;
  answers: Answer[];
}

export interface Answer {
  questionId: string;
  response: string | string[];
}
