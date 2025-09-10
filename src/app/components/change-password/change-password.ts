import { DialogRef } from '@angular/cdk/dialog';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Form, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Auth } from '../../services/auth/auth';

@Component({
  selector: 'app-change-password',
  imports: [ReactiveFormsModule],
  templateUrl: './change-password.html',
  styleUrl: './change-password.css'
})
export class ChangePassword {
  dialogRef = inject(DialogRef<ChangePassword>, { optional: true });
  changePasswordForm: FormGroup;

  constructor(private fb: NonNullableFormBuilder, private auth: Auth, private snackBar: MatSnackBar) {
    this.changePasswordForm = this.fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  changePassword(event: Event) {
    event.preventDefault();
    console.log(this.changePasswordForm.value);
    if (this.changePasswordForm.invalid) {
      this.changePasswordForm.markAllAsTouched(); // ⚡ highlight errors
      return;
    }
    this.auth.changePassword(this.changePasswordForm.value).subscribe({
      next: (response) => {
        this.snackBar.open(response.message, 'Close', { duration: 3000 });
        this.changePasswordForm.reset();
        this.dialogRef?.close();
      },
      error: (error) => {
        this.snackBar.open(error.error.message || 'Failed to change password', 'Close', { duration: 3000 });
      }
    });
  }
}
