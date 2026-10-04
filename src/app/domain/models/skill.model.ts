export const MAX_SKILL_LEVEL = 5;

export interface Skill {
  name: string;
  level: number;
}

export interface SkillCategory {
  id: string;
  skills: Skill[];
}
