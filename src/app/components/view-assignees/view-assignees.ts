import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { AnswersModal } from '../answers-modal/answers-modal';
import { Assignee } from '../../models/assignee.model';
import { DatePipe } from '@angular/common';
import { Faculty } from '../../services/faculty/faculty';

@Component({
  selector: 'app-view-assignees',
  imports: [DatePipe],
  templateUrl: './view-assignees.html',
  styleUrl: './view-assignees.css'
})
export class ViewAssignees {
  constructor(
    public dialogRef: DialogRef<boolean>,
    @Inject(DIALOG_DATA) public data: { formId: number, assignees: Assignee[] },
    private faculty: Faculty
  ) {}

  onDelete(email: string) {
    this.faculty.deleteAssignee(this.data.formId, email).subscribe({
      next: (response) => {
        alert(`User ${email} was removed successfully`)
        this.dialogRef.close(true)
      },
      error: (err) => {
        console.error(err)
      }
    });
  }

  onClose() {
    this.dialogRef.close(false);
  }
}
