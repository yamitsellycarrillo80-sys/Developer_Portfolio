import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

import { LanguageService } from '../../../core/i18n/language.service';
import { Project } from '../../../domain/models/project.model';
import { TETROMINO_COLORS, Tetromino } from '../tetromino/tetromino';

@Component({
  selector: 'app-project-card',
  imports: [Tetromino, TranslocoPipe],
  templateUrl: './project-card.html',
  styleUrl: './project-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.--card-color]': 'color()',
  },
})
export class ProjectCard {
  readonly project = input.required<Project>();

  protected readonly language = inject(LanguageService);
  protected readonly color = computed(() => TETROMINO_COLORS[this.project().shape]);
}
