import { Component } from '@angular/core';
import {
  FormArray,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Faculty } from '../services/faculty/faculty';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-form',
  imports: [ReactiveFormsModule],
  templateUrl: './create-form.html',
  styleUrl: './create-form.css',
})
export class CreateForm {
  feedbackForm: FormGroup;

  constructor(
    private fb: NonNullableFormBuilder,
    private faculty: Faculty,
    private router: Router
  ) {
    this.feedbackForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      questions: this.fb.array([
        this.fb.group({
          prompt: ['New rating question', [Validators.required]],
          type: ['RATING'],
          maxRating: [5],
        }),
      ]),
    });
  }

  get questions(): FormArray<FormGroup> {
    return this.feedbackForm.get('questions') as FormArray<FormGroup>;
  }

  get questionGroups(): FormGroup[] {
    return this.questions.controls as FormGroup[];
  }

  addTextQuestion() {
    this.questions.push(
      this.fb.group({
        prompt: ['New text question', [Validators.required]],
        type: ['TEXT'],
        maxRating: [null],
      })
    );
  }

  addRatingQuestion() {
    this.questions.push(
      this.fb.group({
        prompt: ['New rating question', [Validators.required]],
        type: ['RATING'],
        maxRating: [5],
      })
    );
  }

  submit(event: Event) {
    event.preventDefault();
    if (this.feedbackForm.invalid) {
      this.feedbackForm.markAllAsTouched();
      return;
    }
    this.faculty.createForm(this.feedbackForm.value).subscribe({
      next: (response) => {
        alert('Questionnaire created');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Form submit failed');
        console.error(err);
      },
    });
  }
}
