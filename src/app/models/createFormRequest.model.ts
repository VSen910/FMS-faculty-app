export interface CreateFormRequest {
  title: string;
  description: string;
  questions: CreateFormQuestions[];
}

export interface CreateFormQuestions {
  prompt: string;
  type: 'RATING' | 'TEXT';
  maxRating: number | null;
}
