import { Component, OnInit } from '@angular/core';
import { Header } from '../components/header/header';
import { FormCard } from '../components/form-card/form-card';
import { Dialog } from '@angular/cdk/dialog';
import { ChangePassword } from '../components/change-password/change-password';
import { Auth } from '../services/auth/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [Header, FormCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  constructor(
    private dialog: Dialog,
    private auth: Auth,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.auth.validateToken().subscribe({
      next: (isValid) => {
        if (!isValid) {
          this.router.navigate(['/login']);
        }
      },
      error: (error) => {
        console.error('Token validation failed', error);
        this.router.navigate(['/login']);
      },
    });
  }

  openChangePasswordDialog() {
    this.dialog.open(ChangePassword);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
