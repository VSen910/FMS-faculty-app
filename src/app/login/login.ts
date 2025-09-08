import { Component, OnInit } from '@angular/core';
import { LoginForm } from '../components/login-form/login-form';
import { Auth } from '../services/auth/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [LoginForm],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {
  constructor(private auth: Auth, private router: Router) {}
  ngOnInit(): void {
    this.auth.validateToken().subscribe({
      next: (isValid) => {
        if (isValid) {
          this.router.navigate(['/home']);
        }
      },
      error: (error) => {
        console.error('Token validation failed', error);
      }
    });
  }

}
