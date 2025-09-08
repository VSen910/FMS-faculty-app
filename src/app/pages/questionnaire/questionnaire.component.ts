import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { FeedbackService } from '../../services/feedback.service';
import { Questionnaire, QuestionType } from '../../models/feedback.model';

@Component({
  selector: 'app-questionnaire',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {
  questionnaireForm!: FormGroup; // definite assignment
  questionTypes = Object.values(QuestionType);

  constructor(private fb: FormBuilder, private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    // Initialize form here, after fb is available
    this.questionnaireForm = this.fb.group({
      title: ['', Validators.required],
      questions: this.fb.array([])
    });
  }

  get questions(): FormArray {
    return this.questionnaireForm.get('questions') as FormArray;
  }

  addQuestion(): void {
    const questionGroup = this.fb.group({
      text: ['', Validators.required],
      type: [QuestionType.TEXT, Validators.required],
      options: this.fb.array([])
    });
    this.questions.push(questionGroup);
  }

  addOption(questionIndex: number): void {
    const options = this.questions.at(questionIndex).get('options') as FormArray;
    options.push(this.fb.control('', Validators.required));
  }

  removeQuestion(index: number): void {
    this.questions.removeAt(index);
  }

  removeOption(questionIndex: number, optionIndex: number): void {
    const options = this.questions.at(questionIndex).get('options') as FormArray;
    options.removeAt(optionIndex);
  }

  submit(): void {
    if (this.questionnaireForm.invalid) return;

    const questionnaire: Questionnaire = this.questionnaireForm.value;
    this.feedbackService.createQuestionnaire(questionnaire).subscribe({
      next: () => {
        console.log('Questionnaire saved successfully!');
        this.questionnaireForm.reset();
        this.questions.clear();
      },
      error: (err) => console.error('Error saving questionnaire', err)
    });
  }
}
