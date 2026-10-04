import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { PRIMARY_OUTLET, Router, UrlSegment } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { map } from 'rxjs';

import { LanguageCode, SUPPORTED_LANGUAGES } from '../../domain/models/language.model';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly transloco = inject(TranslocoService);
  private readonly router = inject(Router);
  private readonly document = inject(DOCUMENT);

  readonly supported = SUPPORTED_LANGUAGES;
  readonly current = toSignal(
    this.transloco.langChanges$.pipe(map((language) => language as LanguageCode)),
    { initialValue: this.transloco.getActiveLang() as LanguageCode },
  );

  use(language: LanguageCode): void {
    this.transloco.setActiveLang(language);
    this.document.documentElement.lang = language;
  }

  // The URL is the source of truth: only its first segment changes.
  switchTo(language: LanguageCode): void {
    const tree = this.router.parseUrl(this.router.url);
    const group = tree.root.children[PRIMARY_OUTLET];
    if (!group) {
      return;
    }
    group.segments = [new UrlSegment(language, {}), ...group.segments.slice(1)];
    void this.router.navigateByUrl(tree);
  }
}
