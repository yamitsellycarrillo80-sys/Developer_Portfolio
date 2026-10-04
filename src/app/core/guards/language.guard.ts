import { inject } from '@angular/core';
import { CanActivateFn, PRIMARY_OUTLET, Router, UrlSegment } from '@angular/router';

import { DEFAULT_LANGUAGE, isSupportedLanguage } from '../../domain/models/language.model';
import { LanguageService } from '../i18n/language.service';

export const languageGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const language = route.paramMap.get('lang');

  if (isSupportedLanguage(language)) {
    inject(LanguageService).use(language);
    return true;
  }

  // Unsupported language: keep section, query and fragment.
  const tree = router.parseUrl(state.url);
  const group = tree.root.children[PRIMARY_OUTLET];
  group.segments = [new UrlSegment(DEFAULT_LANGUAGE, {}), ...group.segments.slice(1)];
  return tree;
};
