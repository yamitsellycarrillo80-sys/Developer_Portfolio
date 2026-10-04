import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

import { ContentFacade } from '../../core/content/content.facade';

@Component({
  selector: 'app-stats-panel',
  imports: [TranslocoPipe],
  templateUrl: './stats-panel.html',
  styleUrl: './stats-panel.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatsPanel {
  protected readonly stats = inject(ContentFacade).stats;
}
