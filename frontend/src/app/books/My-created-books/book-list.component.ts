import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../services/book.service.service';
import { BorrowsService } from '../../services/borrow.service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  imports: [CommonModule, FormsModule]
})
export class BookListComponent implements OnInit {
  books: any[] = [];
  newTitle = '';

  constructor(private booksService: BooksService, private borrowService: BorrowsService) {}

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.booksService.getMyBooks().subscribe(res => this.books = res as any[]);
  }

  createBook() {
    if (!this.newTitle) return;
    this.booksService.createBook(this.newTitle).subscribe(() => { this.newTitle = ''; this.loadBooks(); });
  }

  // Add these methods to your BookListComponent class
getStatus(book: any): string {
  if (book.borrowedBy) return 'borrowed';
  if (book.isArchived) return 'archived';
  return 'active';
}

getStatusIcon(book: any): string {
  if (book.borrowedBy) return '🔒';
  if (book.isArchived) return '🗄️';
  return '✅';
}

getStatusText(book: any): string {
  if (book.borrowedBy) return 'Borrowed';
  if (book.isArchived) return 'Archived';
  return 'Available';
}
  archiveBook(book: any) {
    this.booksService.archiveBook(book.id).subscribe(() => this.loadBooks());
  }

  unarchiveBook(book: any) {
    this.booksService.unarchiveBook(book.id).subscribe(() => this.loadBooks());
  }

 

  
}