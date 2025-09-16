import { Component } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../services/auth/auth';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css'
})
export class LoginForm {
  loginForm: FormGroup;
  showError: boolean = false;

  constructor(private auth: Auth, private fb: NonNullableFormBuilder, private cookieService: CookieService, private router: Router) {
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
        this.cookieService.set('facultyToken', response.token);
        this.cookieService.set('fullName', response.fullName);
        this.router.navigate(['/home']);
      },
      error: (error) => { 
        this.showError = true;
        console.error('Login failed', error); 
      }
    });
  }
}
