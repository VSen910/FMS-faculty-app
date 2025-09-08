import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-card',
  imports: [],
  templateUrl: './form-card.html',
  styleUrl: './form-card.css'
})
export class FormCard {
  @Input() title!: string;
  @Input() description!: string;
  @Input() creator!: string;
  @Input() route!: string;

  goToDetails() {
    // Logic to navigate to form details page
    console.log('Navigating to form details...');
  }
}
