import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf, TranslatePipe],
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
})
export class HeaderComponent {
  menuOpen = false;
  currentLanguage = 'de';

  constructor(private readonly translate: TranslateService) {
    this.currentLanguage = this.translate.currentLang || this.translate.defaultLang || 'de';
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  useLanguage(lang: 'de' | 'en'): void {
    this.translate.use(lang);
    this.currentLanguage = lang;
    localStorage.setItem('lang', lang);
  }
}
