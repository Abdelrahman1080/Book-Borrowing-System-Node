import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service.service';
@Injectable({ providedIn: 'root' })
export class BorrowsService {
  private BASE = 'http://localhost:3000/api';

  constructor(private http: HttpClient, private auth: AuthService) {}

  private headers() { return new HttpHeaders({ Authorization: `Bearer ${this.auth.getToken()}` }); }

  borrowBook(id: string) { return this.http.post(`${this.BASE}/borrow/${id}`, {}, { headers: this.headers() }); }

  returnBook(id: string) { return this.http.post(`${this.BASE}/return/${id}`, {}, { headers: this.headers() }); }

  myBorrows() { return this.http.get(`${this.BASE}/borrows/me`, { headers: this.headers() }); }


  
}