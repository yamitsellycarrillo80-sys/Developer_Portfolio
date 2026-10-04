import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

import { ContentFacade } from '../../core/content/content.facade';
import { MAX_SKILL_LEVEL } from '../../domain/models/skill.model';

@Component({
  selector: 'app-skills',
  imports: [TranslocoPipe],
  templateUrl: './skills.html',
  styleUrl: './skills.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Skills {
  protected readonly categories = inject(ContentFacade).skillCategories;
  protected readonly maxLevel = MAX_SKILL_LEVEL;
  protected readonly levelSteps = Array.from({ length: MAX_SKILL_LEVEL }, (_, index) => index + 1);
}
