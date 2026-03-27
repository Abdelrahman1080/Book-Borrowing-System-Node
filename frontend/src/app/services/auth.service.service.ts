import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private BASE = 'http://localhost:3000/api';

  constructor(private http: HttpClient, private router: Router) {}

  register(user: any) {
    return this.http.post(`${this.BASE}/register`, user);
  }

  login(user: any) {
    return this.http.post<{ token: string }>(`${this.BASE}/login`, user).pipe(
      tap(res => { if (res.token) localStorage.setItem('jwt', res.token); })
    );
  }

  logout() {
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }

  getToken() {
    return localStorage.getItem('jwt');
  }

  isLoggedIn() {
    return !!this.getToken();
  }
  getProfile() {
    return this.http.get(`${this.BASE}/profile`, { headers: { Authorization: `Bearer ${this.getToken()}` } });
  }
}