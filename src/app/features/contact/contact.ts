import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

import { ContentFacade } from '../../core/content/content.facade';

@Component({
  selector: 'app-contact',
  imports: [TranslocoPipe],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {
  protected readonly profile = inject(ContentFacade).profile;
}
