import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksService } from '../../services/book.service.service';
import { BorrowsService } from '../../services/borrow.service.service';
import { AuthService } from '../../services/auth.service.service';

@Component({
  selector: 'app-all-books',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.css']
})
export class AllBooksComponent implements OnInit {

  books: any[] = [];
  loading = false;
  error = '';

  constructor(
    private booksService: BooksService,
    private borrowService: BorrowsService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.loading = true;
    this.booksService.getAllBooks().subscribe({
      next: (res: any) => {
        this.books = res;
        this.loading = false;
      },

      error: () => {
        this.error = 'Failed to load books';
        this.loading = false;
      }
    });
  }

  borrowBook(book: any) {
    if (!this.isAvailable(book)) return;

    this.borrowService.borrowBook(book.id).subscribe({
      next: () => this.loadBooks(),
      error: () => alert('Failed to borrow book')
    });
  }


  isArchived(book: any): boolean {
    return book.isArchived || book.archived;
  }

  isBorrowed(book: any): boolean {
    return !!book.borrowedBy;
  }

  isAvailable(book: any): boolean {
    return !this.isArchived(book) && !this.isBorrowed(book);
  }

  getStatus(book: any): string {
    if (this.isArchived(book)) return 'Archived';
    if (this.isBorrowed(book)) return 'Borrowed';
    return 'Available';
  } 
}