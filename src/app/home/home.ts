import { Component } from '@angular/core';
import { Header } from '../components/header/header';
import { FormCard } from '../components/form-card/form-card';
import { Dialog } from '@angular/cdk/dialog';
import { ChangePassword } from '../components/change-password/change-password';

@Component({
  selector: 'app-home',
  imports: [Header, FormCard],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  constructor(private dialog: Dialog) {}

  openChangePasswordDialog() {
    this.dialog.open(ChangePassword);
  }
}
