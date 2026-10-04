import { Injectable } from '@angular/core';

import profileJson from '../../../content/profile.json';
import projectsJson from '../../../content/projects.json';
import skillsJson from '../../../content/skills.json';
import { Profile } from '../domain/models/profile.model';
import { Project } from '../domain/models/project.model';
import { SkillCategory } from '../domain/models/skill.model';
import { ContentRepository } from '../domain/repositories/content.repository';

@Injectable()
export class LocalContentRepository extends ContentRepository {
  getProfile(): Profile {
    return profileJson as Profile;
  }

  getProjects(): Project[] {
    return projectsJson as Project[];
  }

  getSkillCategories(): SkillCategory[] {
    return skillsJson;
  }
}
