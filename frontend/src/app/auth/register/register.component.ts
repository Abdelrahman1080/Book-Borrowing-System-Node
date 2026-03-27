import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [CommonModule, FormsModule, RouterLink]
})
export class RegisterComponent {
  email = '';
  password = '';
  message = '';

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    this.auth.register({ email: this.email, password: this.password }).subscribe({
      next: () => this.message = 'Registered successfully',
      error: err => this.message = err.error.message || 'Register failed'
    });
  }
}