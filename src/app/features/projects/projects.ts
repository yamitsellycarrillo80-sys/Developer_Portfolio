import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

import { ContentFacade } from '../../core/content/content.facade';
import { ProjectCard } from '../../shared/ui/project-card/project-card';

@Component({
  selector: 'app-projects',
  imports: [ProjectCard, TranslocoPipe],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Projects {
  protected readonly projects = inject(ContentFacade).projects;
}
