import { Component } from '@angular/core';
import { Header } from '../components/header/header';
import { FormCard } from '../components/form-card/form-card';

@Component({
  selector: 'app-home',
  imports: [Header, FormCard],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
