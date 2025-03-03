import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from './signup.service';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'sign-up',
  standalone: true,
  imports: [CommonModule, FormsModule,TranslateModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignUpComponent {
  username = '';
  fullName:"" | undefined;
  password = '';
  email = '';
  role = 'user'; // Default role
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  signUp() {
    if (!this.username ||!this.fullName || !this.email || !this.password || !this.role) {
      this.errorMessage = 'All fields are required';
      return;
    }

    this.authService.signUp(this.username, this.email,this.fullName, this.password, this.role).subscribe({
      next: () => {
        alert('Signup successful! Please log in.');
        this.router.navigate(['/login']);
      },
      error: () => {
        this.errorMessage = 'Signup failed. Try again!';
      },
    });
  }
}
