import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-answers-modal',
  imports: [],
  templateUrl: './answers-modal.html',
  styleUrl: './answers-modal.css'
})
export class AnswersModal {
  constructor(
    public dialogRef: DialogRef<AnswersModal>,
    @Inject(DIALOG_DATA) public data: { answers: string[] }
  ) {}

  close() {
    this.dialogRef.close()
  }
}
