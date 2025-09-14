import { Component, OnInit } from '@angular/core';
import { Header } from '../components/header/header';
import { FormCard } from '../components/form-card/form-card';
import { Dialog } from '@angular/cdk/dialog';
import { ChangePassword } from '../components/change-password/change-password';
import { Auth } from '../services/auth/auth';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Faculty } from '../services/faculty/faculty';
import { Feedback } from '../models/feedback.model';

@Component({
  selector: 'app-home',
  imports: [Header, FormCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  name: string;
  feedbacks: Feedback[] = [];

  constructor(
    private dialog: Dialog,
    private auth: Auth,
    private faculty: Faculty,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.name = this.cookieService.get('fullName') || 'User';
  }

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

    this.faculty.getAllFeedbacks().subscribe({
      next: (feedbacks) => {
        console.log('Fetched feedbacks:', feedbacks);
        this.feedbacks = feedbacks;
      },
      error: (error) => {
        console.error('Error fetching feedbacks:', error);
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
