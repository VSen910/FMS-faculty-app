import { Component } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../services/auth/auth';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css'
})
export class LoginForm {
  loginForm: FormGroup;
  showError: boolean = false;

  constructor(private auth: Auth, private fb: NonNullableFormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  login(event: Event) {
    event.preventDefault();
    this.showError = false;
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched(); // ⚡ highlight errors
      return;
    }
    this.auth.login(this.loginForm.value).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => { 
        this.showError = true;
        console.error('Login failed', error); 
      }
    });
  }
}
