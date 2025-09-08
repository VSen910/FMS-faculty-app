import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormArray, FormBuilder, Validators } from '@angular/forms';
import { FeedbackService } from '../../services/feedback.service';
import { Questionnaire, Question, QuestionType } from '../../models';

@Component({
  selector: 'app-questionnaire',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css'],
})
export class QuestionnaireComponent implements OnInit {
  qForm = this.fb.group({
    id: [''],
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: [''],
    questions: this.fb.array([])
  });

  existing: Questionnaire[] = [];
  editingIndex: number | null = null;

  get questions() { return this.qForm.get('questions') as FormArray; }

  constructor(private fb: FormBuilder, private svc: FeedbackService) {}

  ngOnInit() {
    this.svc.questionnairesObs.subscribe(qs => this.existing = qs);
    this.addQuestion();
  }

  addQuestion(type: QuestionType = 'likert') {
    const group = this.fb.group({
      id: [crypto.randomUUID()],
      prompt: ['', Validators.required],
      type: [type, Validators.required],
      options: this.fb.control<string[] | null>(type === 'mcq' ? ['Option 1','Option 2'] : null),
      scaleMax: this.fb.control<number | null>(type === 'likert' ? 5 : null),
      required: [false],
    });
    this.questions.push(group);
  }

  removeQuestion(i: number) { this.questions.removeAt(i); }

  setType(i: number, type: QuestionType) {
    const group = this.questions.at(i);
    group.get('type')!.setValue(type);
    if (type === 'mcq') {
      group.get('options')!.setValue(['Option 1','Option 2']);
      group.get('scaleMax')!.setValue(null);
    } else if (type === 'likert') {
      group.get('scaleMax')!.setValue(5);
      group.get('options')!.setValue(null);
    } else {
      group.get('options')!.setValue(null);
      group.get('scaleMax')!.setValue(null);
    }
  }

  save() {
    if (this.qForm.invalid) return;
    const v = this.qForm.value as any;
    const q: Questionnaire = {
      id: v.id || crypto.randomUUID(),
      title: v.title,
      description: v.description || '',
      createdAt: new Date().toISOString(),
      questions: v.questions as Question[],
    };
    this.svc.upsertQuestionnaire(q);
    this.resetForm();
  }

  edit(idx: number) {
    const q = this.existing[idx];
    this.editingIndex = idx;
    this.qForm.reset({ id: q.id, title: q.title, description: q.description });
    this.questions.clear();
    q.questions.forEach(qq => {
      this.questions.push(this.fb.group({
        id: [qq.id],
        prompt: [qq.prompt, Validators.required],
        type: [qq.type, Validators.required],
        options: [qq.options ?? null],
        scaleMax: [qq.scaleMax ?? null],
        required: [!!qq.required],
      }));
    });
  }

  delete(idx: number) {
    this.svc.deleteQuestionnaire(this.existing[idx].id);
    if (this.editingIndex === idx) this.resetForm();
  }

  resetForm() {
    this.qForm.reset({ id: '', title: '', description: '' });
    this.questions.clear();
    this.addQuestion();
    this.editingIndex = null;
  }
}
