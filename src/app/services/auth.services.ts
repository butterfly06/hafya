import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  getEmail(): string {
    return localStorage.getItem('email') || '';
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  logout() {
    localStorage.removeItem('email');
    localStorage.removeItem('token');
  }
}