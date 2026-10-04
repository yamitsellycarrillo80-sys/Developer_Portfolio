import { Profile } from '../models/profile.model';
import { Project } from '../models/project.model';
import { SkillCategory } from '../models/skill.model';

export abstract class ContentRepository {
  abstract getProfile(): Profile;
  abstract getProjects(): Project[];
  abstract getSkillCategories(): SkillCategory[];
}
