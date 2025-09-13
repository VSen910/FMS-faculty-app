import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { QuestionType } from '../../models/model';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]   // no app.module.ts needed
})
export class QuestionnaireComponent {
  qForm: FormGroup;
  questionTypes = Object.values(QuestionType);

  constructor(private fb: FormBuilder) {
    this.qForm = this.fb.group({
      title: ['', Validators.required],
      questions: this.fb.array([])
    });
  }

  get questions(): FormArray {
    return this.qForm.get('questions') as FormArray;
  }

  addQuestion() {
    const qGroup = this.fb.group({
      text: ['', Validators.required],
      type: [QuestionType.TEXT, Validators.required],
      options: this.fb.array([]) // for radio/checkbox
    });
    this.questions.push(qGroup);
  }

  removeQuestion(index: number) {
    this.questions.removeAt(index);
  }

  getOptions(qIndex: number): FormArray {
    return this.questions.at(qIndex).get('options') as FormArray;
  }

  addOption(qIndex: number) {
    this.getOptions(qIndex).push(new FormControl('', Validators.required));
  }

  removeOption(qIndex: number, optIndex: number) {
    this.getOptions(qIndex).removeAt(optIndex);
  }

  save() {
    if (this.qForm.valid) {
      console.log('Questionnaire:', this.qForm.value);
      alert('Questionnaire saved successfully!');
    } else {
      alert('Please fill all required fields.');
    }
  }
}
