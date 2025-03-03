import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service'; // Import AuthService
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule,TranslateModule], // Add FormsModule here

  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username = '';
  password = '';
  role = ''; // Default role
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.username, this.password, this.role).subscribe({
      next: (response) => {
alert(response.message)        
        // Store role and token in localStorage
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);
        
        // Verify what was stored
        const storedRole = localStorage.getItem('role');
        
        // Add a delay to ensure localStorage is updated
        setTimeout(() => {
          if (storedRole === 'Admin') {
            console.log('Navigating to admin dashboard');
            this.router.navigateByUrl('/admin-dashboard');
          } else {
            console.log('Navigating to user dashboard');
            this.router.navigateByUrl('/user-dashboard');
          }
        }, 100);
      },
      error: (err) => {
        console.error('Login error:', err);
        this.errorMessage = 'Invalid Credentials';
      }
    });
  }
}
