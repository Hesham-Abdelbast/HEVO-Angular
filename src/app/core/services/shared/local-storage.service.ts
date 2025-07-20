import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  getValue(key: string): string {
    if (this.isBrowser) {
      return localStorage.getItem(key) || '';
    }
    return '';
  }

  setValue(key: string, value: string) {
    if (this.isBrowser) {
      localStorage.setItem(key, value);
    }
  }
}
