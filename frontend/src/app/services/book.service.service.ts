import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service.service';
@Injectable({ providedIn: 'root' })
export class BooksService {
  private BASE = 'http://localhost:3000/api/books';

  constructor(private http: HttpClient, private auth: AuthService) {}

  private headers() {
    return new HttpHeaders({ Authorization: `Bearer ${this.auth.getToken()}` });
  }

  createBook(title: string) {
    return this.http.post(this.BASE, { title }, { headers: this.headers() });
  }

  getMyBooks() {
    return this.http.get(`${this.BASE}/me`, { headers: this.headers() });
  }

  archiveBook(id: string) {
    return this.http.patch(`${this.BASE}/${id}/archive`, {}, { headers: this.headers() });
  }

  unarchiveBook(id: string) {
    return this.http.patch(`${this.BASE}/${id}/unarchive`, {}, { headers: this.headers() });
  }
  BrowseBooks() {
    return this.http.get(this.BASE, { headers: this.headers() });
  }
  getAllBooks() {
    return this.http.get(this.BASE, { headers: this.headers() });
  }
  getBook(id: string) {
    return this.http.get(`${this.BASE}/${id}`, { headers: this.headers() });
  }
  
}