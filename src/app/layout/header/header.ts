import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

import { ContentFacade } from '../../core/content/content.facade';
import { LanguageService } from '../../core/i18n/language.service';
import { LanguageCode } from '../../domain/models/language.model';

@Component({
  selector: 'app-header',
  imports: [TranslocoPipe],
  templateUrl: './header.html',
  styleUrl: './header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  protected readonly language = inject(LanguageService);
  protected readonly fullName = inject(ContentFacade).profile.fullName;

  protected select(code: LanguageCode): void {
    this.language.switchTo(code);
  }
}
