import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { BookListComponent } from './books/My-created-books/book-list.component';
import { BorrowListComponent } from './borrows/borrow-list/borrow-list.component';
import { AllBooksComponent } from './books/all-books/all-books.component';
import { AuthGuard } from './auth/auth.guard';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [

  //  Public
  {
    path: '',
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  },

  //  Protected with Layout
  {
    path: '',
    component: LayoutComponent,  
    canActivate: [AuthGuard],
    children: [
      { path: 'my-books', component: BookListComponent },
      { path: 'borrow-books', component: AllBooksComponent },
      { path: 'my-list', component: BorrowListComponent }
    ]
  },

  { path: '**', redirectTo: 'login' }
];