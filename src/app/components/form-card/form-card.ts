import { Component, Input } from '@angular/core';
import { Feedback } from '../../models/feedback.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-card',
  imports: [],
  templateUrl: './form-card.html',
  styleUrl: './form-card.css'
})
export class FormCard {
  @Input() feedback!: Feedback;

  constructor(private router: Router) {}

  goToDetails() {
    console.log('Navigating to form details...');
    console.log('Form ID:', this.feedback.id);
    this.router.navigate(['/analytics', this.feedback.id]);
  }
}
