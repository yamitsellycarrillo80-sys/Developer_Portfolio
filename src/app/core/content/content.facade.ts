import { Injectable, inject } from '@angular/core';

import { ContentRepository } from '../../domain/repositories/content.repository';

@Injectable({ providedIn: 'root' })
export class ContentFacade {
  private readonly repository = inject(ContentRepository);

  readonly profile = this.repository.getProfile();
  readonly projects = this.repository.getProjects();
  readonly featuredProjects = this.projects.filter((project) => project.featured);
  readonly skillCategories = this.repository.getSkillCategories();

  readonly stats = {
    level: this.profile.level,
    projects: this.projects.length,
    skills: this.skillCategories.reduce((total, category) => total + category.skills.length, 0),
  };
}
