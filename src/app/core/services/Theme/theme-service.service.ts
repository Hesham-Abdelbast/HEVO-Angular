import { Inject, Injectable } from '@angular/core';
import { AppConstant } from '../../../shared/helper/app-constant';
import { LocalStorageService } from '../shared/local-storage.service';
import { DOCUMENT } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private currentFontClass = '';
  private currentthemeClass = '';

  constructor(
    private localStorageService:LocalStorageService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.currentFontClass =
      localStorageService.getValue(AppConstant.APP_FONT) || AppConstant.APP_D_FONT;
    this.currentthemeClass =
      localStorageService.getValue(AppConstant.APP_THEME) || AppConstant.APP_D_THEME;

    this.setFont(this.currentFontClass);
    this.setTheme(this.currentthemeClass);
  }

  setFont(fontClass: string): void {
    const body = this.document.body;

    if (this.currentFontClass) {
      body.classList.remove(this.currentFontClass);
      this.currentFontClass = fontClass;
    }

    body.classList.add(fontClass);
    this.currentFontClass = fontClass;
  }

  setTheme(theme: string): void {
    const body = this.document.body;

    if (this.currentthemeClass) {
      body.classList.remove(this.currentthemeClass);
      this.currentthemeClass = theme;
    }

    body.classList.add(theme);
    this.currentthemeClass = theme;
  }
}
