import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NavbarComponent } from './shared/navbar.component';
import enTranslations from '../assets/i18n/en.json';
import arTranslations from '../assets/i18n/ar.json';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    TranslateModule,
    NavbarComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private translate: TranslateService) {
    translate.addLangs(['en', 'ar']);
    
    translate.setDefaultLang('en');
    this.translate.setTranslation('en', enTranslations);
this.translate.setTranslation('ar', arTranslations);
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang?.match(/en|ar/) ? browserLang : 'en');
  }

  ngOnInit() {
    const savedLang = localStorage.getItem('selectedLang');
    if (savedLang) {
      this.translate.use(savedLang);
      document.dir = savedLang === 'ar' ? 'rtl' : 'ltr';
    }
  }
}