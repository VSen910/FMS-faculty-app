export interface Feedback {
  id: number;
  title: string;
  description: string;
  createdBy: string;
  questions: Question[];
}

export interface Question {
  id: number;
  prompt: string;
  type: 'RATING' | 'TEXT'; // restrict to known values
  maxRating: number | null;
}
