import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { FeedbackService } from '../../services/feedback.service';
import { Questionnaire, Question } from '../../models/feedback.model';

@Component({
  selector: 'app-questionnaire',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {
  qForm!: FormGroup;
  existing: Questionnaire[] = [];

  constructor(private fb: FormBuilder, private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.qForm = this.fb.group({
      title: ['', Validators.required],
      questions: this.fb.array([])
    });
    this.loadExisting();
  }

  get questions(): FormArray {
    return this.qForm.get('questions') as FormArray;
  }

  addQuestion(type: string = 'text'): void {
    this.questions.push(
      this.fb.group({
        text: ['', Validators.required],
        type: [type, Validators.required],
        options: ['']
      })
    );
  }

  updateOptions(i: number, raw: string) {
    const cleaned = raw.split(',').map(x => x.trim()).filter(Boolean);
    this.questions.at(i).get('options')?.setValue(cleaned);
  }

  removeQuestion(i: number) {
    this.questions.removeAt(i);
  }

  save(): void {
    if (this.qForm.invalid) return;

    const questionnaire: Questionnaire = this.qForm.value;
    this.feedbackService.createQuestionnaire(questionnaire).subscribe({
      next: () => {
        this.resetForm();
        this.loadExisting();
      },
      error: (err) => console.error('Error saving questionnaire', err)
    });
  }

  resetForm(): void {
    this.qForm.reset();
    this.questions.clear();
  }

  loadExisting(): void {
    this.feedbackService.getQuestionnaires().subscribe({
      next: (data: Questionnaire[]) => this.existing = data
    });
  }

  edit(index: number): void {
    const q = this.existing[index];
    this.qForm.patchValue({ title: q.title });
    this.questions.clear();
    q.questions.forEach((ques: Question) => {
      this.questions.push(
        this.fb.group({
          text: [ques.text, Validators.required],
          type: [ques.type || 'text', Validators.required],
          options: [(ques as any).options || '']
        })
      );
    });
  }

  delete(index: number): void {
    this.existing.splice(index, 1);
  }
}
