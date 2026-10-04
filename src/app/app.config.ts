import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, isDevMode, provideBrowserGlobalErrorListeners } from '@angular/core';
import { TitleStrategy, provideRouter } from '@angular/router';
import { provideTransloco } from '@jsverse/transloco';

import { routes } from './app.routes';
import { PageTitleStrategy } from './core/i18n/page-title.strategy';
import { TranslocoHttpLoader } from './core/i18n/transloco-http.loader';
import { LocalContentRepository } from './data-access/local-content.repository';
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from './domain/models/language.model';
import { ContentRepository } from './domain/repositories/content.repository';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideTransloco({
      config: {
        availableLangs: [...SUPPORTED_LANGUAGES],
        defaultLang: DEFAULT_LANGUAGE,
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
    { provide: TitleStrategy, useExisting: PageTitleStrategy },
    { provide: ContentRepository, useClass: LocalContentRepository },
  ],
};
