import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  validLoggedIn!: boolean;
  constructor() {}

  set(token: string) {
    localStorage.setItem('token', token);
  }
  get() {
    localStorage.getItem('token');
  }
  delete() {
    localStorage.removeItem('token');
  }

  isValid() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }
}
