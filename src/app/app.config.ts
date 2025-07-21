import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { AppTranslateModule } from './shared/modules/app-translate/app-translate.module';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),

    // Combined HTTP configuration
    provideHttpClient(
      withFetch(),
      withInterceptorsFromDi()
    ),

    importProvidersFrom(
      AppTranslateModule.forRoot()
    )
  ]
};
