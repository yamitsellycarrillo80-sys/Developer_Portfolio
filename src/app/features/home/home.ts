import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';

import { ContentFacade } from '../../core/content/content.facade';
import { LanguageService } from '../../core/i18n/language.service';
import { ProjectCard } from '../../shared/ui/project-card/project-card';

@Component({
  selector: 'app-home',
  imports: [ProjectCard, RouterLink, TranslocoPipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  private readonly language = inject(LanguageService);

  protected readonly featuredProjects = inject(ContentFacade).featuredProjects;
  protected readonly projectsLink = computed(() => ['/', this.language.current(), 'projects']);
}
