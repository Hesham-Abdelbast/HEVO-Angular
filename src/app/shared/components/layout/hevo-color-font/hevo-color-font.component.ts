import { LocalStorageService } from './../../../../core/services/shared/local-storage.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { AppConstant } from '../../../helper/app-constant';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from '../../../../core/services/shared/Theme/theme-service.service';

@Component({
  selector: 'app-hevo-color-font',
  imports: [CommonModule, RouterOutlet,TranslatePipe],
  templateUrl: './hevo-color-font.component.html',
  styleUrl: './hevo-color-font.component.scss',
})
export class HevoColorFontComponent {
  openDrawer = false;
  selectedTheme!: string;
  drawerDirection: 'left' | 'right' = 'right';
  currentLanguage!: string;
  isRtl = false;
  //fonts prop English
  public GameFont = AppConstant.APP_FONT_GAME;
  public PacificoFont = AppConstant.APP_FONT_PACIFICO;
  public PrataFont = AppConstant.APP_FONT_PRATA;

  //fonts prop Arbic
  public kufiFont = AppConstant.APP_FONT_kufi;
  public beirutiFont = AppConstant.APP_FONT_beiruti;
  public gulzarFont = AppConstant.APP_FONT_gulzar;
  public amiriFont = AppConstant.APP_FONT_amiri;

  constructor(
    private themeService: ThemeService,
    private appTranslate: TranslateService,
    private localStorageService:LocalStorageService
  ) {}

  ngOnInit(): void {
    this.appTranslate.onLangChange.subscribe((event) => {
      this.drawerDirection =
        event.lang === AppConstant.APP_Lang_AR ? 'left' : 'right';
      this.currentLanguage = event.lang;
      this.isRtl = event.lang === AppConstant.APP_Lang_AR;
    });
    this.drawerDirection =
      this.currentLanguage === AppConstant.APP_Lang_AR ? 'left' : 'right';
      this.isRtl = this.currentLanguage === AppConstant.APP_Lang_AR;
  }

  setTheme(theme: string) {
    this.selectedTheme = theme;
    this.themeService.setTheme(theme);
    this.localStorageService.setValue(AppConstant.APP_THEME, theme);
  }

  setFont(font: string) {
    this.themeService.setFont(font);
    this.localStorageService.setValue(AppConstant.APP_FONT, font);
  }
  toggleWindow(){
    this.openDrawer = !this.openDrawer;
  }
}
