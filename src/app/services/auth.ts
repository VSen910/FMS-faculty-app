import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  login(credentials: { email: string; password: string }) {
    console.log('Login attempted with', credentials);
  }

  register(details: { name: string; email: string; password: string }) {
    console.log('Registering user with', details);
  }
}
