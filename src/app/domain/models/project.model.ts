import { TetrominoShape } from './tetromino.model';

export interface Project {
  slug: string;
  featured: boolean;
  shape: TetrominoShape;
  technologies: string[];
  repositoryUrl: string | null;
  demoUrl: string | null;
}
