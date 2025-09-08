import { DialogRef } from '@angular/cdk/dialog';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Form, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  imports: [ReactiveFormsModule],
  templateUrl: './change-password.html',
  styleUrl: './change-password.css'
})
export class ChangePassword {
  dialogRef = inject(DialogRef<ChangePassword>, { optional: true });
  changePasswordForm: FormGroup;

  constructor(private fb: NonNullableFormBuilder) {
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
    this.changePasswordForm.reset();
    this.dialogRef?.close();
    // Call your backend API to change the password
    // this.http.post('http://127.0.0.1:8080/api/auth/change-password', this.changePasswordForm.value).subscribe({
    //   next: (response) => {
    //     alert('Password changed successfully!');
    //     this.changePasswordForm.reset();
    //     // this.dialogRef?.close();
    //   },
    //   error: (error) => {
    //     alert('Failed to change password. Please try again.');
    //   }
    // });
  }
}
