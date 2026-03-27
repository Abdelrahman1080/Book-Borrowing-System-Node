import { Component, OnInit } from '@angular/core';
import { BorrowsService } from '../../services/borrow.service.service';
import { BooksService } from '../../services/book.service.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-borrow-list',
  templateUrl: './borrow-list.component.html',
  styleUrls: ['./borrow-list.component.css'],
  imports: [CommonModule]
})
export class BorrowListComponent implements OnInit {
  borrows: any[] = [];
  bookDetails: { [key: string]: any } = {};

  constructor(
    private borrowService: BorrowsService,
    private booksService: BooksService
  ) {}

  ngOnInit() {
    this.loadBorrows();
  }

  private transformBorrowDates(borrows: any[]): any[] {
    return borrows.map(b => ({
      ...b,
      borrowedAt: b.borrowedAt?._seconds
        ? new Date(b.borrowedAt._seconds * 1000)
        : b.borrowedAt,
      returnedAt: b.returnedAt?._seconds
        ? new Date(b.returnedAt._seconds * 1000)
        : b.returnedAt
    }));
  }

  loadBorrows() {
    this.borrowService.myBorrows().subscribe({
      next: (res) => {
        this.borrows = this.transformBorrowDates(res as any[]);
        this.loadBooksDetails();
      },
      error: (err) => {
        console.error('ERROR:', err);
      }
    });
  }

  loadBooksDetails() {
    this.borrows.forEach(borrow => {
      if (!this.bookDetails[borrow.bookId]) {
        this.booksService.getBook(borrow.bookId).subscribe({
          next: (book: any) => {
            this.bookDetails[borrow.bookId] = book;
            borrow.title = book.title; // attach title directly
          },
          error: (err) => console.error('Book fetch error:', err)
        });
      }
    });
  }

  returnBook(borrow: any) {
    if (!borrow.returnedAt) {
      this.borrowService.returnBook(borrow.bookId)
        .subscribe(() => this.loadBorrows());
    }
  }

  canReturn(borrow: any) {
    return !borrow.returnedAt;
  }
}