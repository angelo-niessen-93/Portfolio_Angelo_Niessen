import { NgIf } from '@angular/common';
import { Component, HostListener } from '@angular/core';
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
  activeSection: 'about' | 'skills' | 'projects' | '' = '';

  constructor(private readonly translate: TranslateService) {
    this.currentLanguage = this.translate.currentLang || this.translate.defaultLang || 'de';
    this.syncActiveSectionFromHash();
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

  setActiveSection(section: 'about' | 'skills' | 'projects'): void {
    this.activeSection = section;
  }

  @HostListener('window:hashchange')
  onHashChange(): void {
    this.syncActiveSectionFromHash();
  }

  private syncActiveSectionFromHash(): void {
    const hash = typeof window !== 'undefined' ? window.location.hash.replace('#', '') : '';
    this.activeSection = hash === 'about' || hash === 'skills' || hash === 'projects' ? hash : '';
  }
}
