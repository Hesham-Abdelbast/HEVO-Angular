import { LocalStorageService } from './local-storage.service';
import { TranslateService } from '@ngx-translate/core';
import { Inject, Injectable } from '@angular/core';
import { AppConstant } from '../../../shared/helper/app-constant';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  constructor(
    private translateService: TranslateService,
    @Inject(DOCUMENT) private document: Document,
    private localStorageService: LocalStorageService
  ) {
    let lang = AppConstant.APP_Lang_EN;
    lang =
      localStorageService.getValue(AppConstant.LANG_CODE) ||
      AppConstant.APP_Lang_EN;

    this.translateService.setDefaultLang(lang);
    this.changeUI(lang);
  }

  ChangeLang(language: string): void {
    this.translateService.use(language);
    this.localStorageService.setValue(AppConstant.LANG_CODE, language);
    this.changeUI(language);
  }

  private changeUI(language: string): void {
    const html = this.document.getElementsByTagName('html')[0];
    html.lang = language;
    const dir = language === AppConstant.APP_Lang_AR ? 'rtl' : 'ltr';
    this.document.body.dir = dir;
  }
}
