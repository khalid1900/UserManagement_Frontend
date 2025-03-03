import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(
    private router: Router,
    private translateService: TranslateService
  ) {}

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token'); // Check if token exists
  }

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('role'); // Remove token
    this.router.navigate(['/login']); // Redirect to login page
  }

  switchLanguage(lang: string) {
    this.translateService.use(lang);
    localStorage.setItem('selectedLang', lang);
    
    // Update document direction for RTL support
    document.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }

  getCurrentLang(): string {
    return this.translateService.currentLang || 'en';
  }
}