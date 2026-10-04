import { Injectable, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PageTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);
  private readonly transloco = inject(TranslocoService);

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const titleKey = this.buildTitle(snapshot) ?? 'pages.home';
    this.transloco
      .selectTranslate(titleKey)
      .pipe(take(1))
      .subscribe((pageTitle) => this.title.setTitle(pageTitle));
  }
}
