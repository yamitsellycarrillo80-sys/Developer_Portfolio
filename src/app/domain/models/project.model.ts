import { LanguageCode } from './language.model';
import { TetrominoShape } from './tetromino.model';

export type LocalizedText = Record<LanguageCode, string>;

export interface Project {
  slug: string;
  name: LocalizedText;
  description: LocalizedText;
  featured: boolean;
  shape: TetrominoShape;
  technologies: string[];
  repositoryUrl: string | null;
  demoUrl: string | null;
}
