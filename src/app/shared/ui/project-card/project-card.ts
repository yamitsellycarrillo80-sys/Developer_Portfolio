import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

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

  protected readonly color = computed(() => TETROMINO_COLORS[this.project().shape]);
}
