import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-card',
  imports: [],
  templateUrl: './form-card.html',
  styleUrl: './form-card.css'
})
export class FormCard {
  @Input() id!: number;
  @Input() title!: string;
  @Input() description!: string;
  @Input() creator!: string;

  goToDetails() {
    console.log('Navigating to form details...');
    console.log('Form ID:', this.id);
  }
}
