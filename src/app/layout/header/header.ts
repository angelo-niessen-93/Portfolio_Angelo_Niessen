import { NgIf } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf, RouterLink, TranslatePipe],
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
})
export class HeaderComponent {
  menuOpen = false;
  currentLanguage = 'de';
  activeSection: 'about' | 'skills' | 'projects' | '' = '';
  private langChangeSubscription?: Subscription;

  constructor(private readonly translate: TranslateService) {
    this.syncLanguageState();
    this.langChangeSubscription = this.translate.onLangChange.subscribe(({ lang }) => {
      const normalizedLang = this.normalizeLanguage(lang);
      if (!normalizedLang) {
        return;
      }

      this.currentLanguage = normalizedLang;
      localStorage.setItem('lang', normalizedLang);
    });
    this.syncActiveSectionFromHash();
  }

  ngOnDestroy(): void {
    this.langChangeSubscription?.unsubscribe();
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  useLanguage(lang: 'de' | 'en'): void {
    if (this.currentLanguage === lang) {
      return;
    }

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

  private syncLanguageState(): void {
    const savedLanguage = this.normalizeLanguage(localStorage.getItem('lang'));
    const serviceLanguage = this.normalizeLanguage(this.translate.currentLang);
    const defaultLanguage = this.normalizeLanguage(this.translate.defaultLang) ?? 'de';
    const resolvedLanguage = savedLanguage ?? serviceLanguage ?? defaultLanguage;

    this.currentLanguage = resolvedLanguage;

    if (serviceLanguage !== resolvedLanguage) {
      this.translate.use(resolvedLanguage);
    }

    if (savedLanguage !== resolvedLanguage) {
      localStorage.setItem('lang', resolvedLanguage);
    }
  }

  private normalizeLanguage(lang: string | undefined | null): 'de' | 'en' | null {
    if (!lang) {
      return null;
    }

    const normalized = lang.toLowerCase();

    if (normalized.startsWith('en')) {
      return 'en';
    }

    if (normalized.startsWith('de')) {
      return 'de';
    }

    return null;
  }
}
