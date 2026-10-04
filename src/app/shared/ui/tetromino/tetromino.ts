import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { TetrominoShape } from '../../../domain/models/tetromino.model';

export const TETROMINO_COLORS: Record<TetrominoShape, string> = {
  I: 'var(--neon-cyan)',
  O: 'var(--neon-yellow)',
  T: 'var(--neon-purple)',
  S: 'var(--neon-green)',
  Z: 'var(--neon-red)',
  J: 'var(--neon-blue)',
  L: 'var(--neon-orange)',
};

// Each shape fits a 4x2 grid; "X" marks a filled cell.
const TETROMINO_CELLS: Record<TetrominoShape, string> = {
  I: 'XXXX....',
  O: '.XX..XX.',
  T: '.X..XXX.',
  S: '.XX.XX..',
  Z: 'XX...XX.',
  J: 'X...XXX.',
  L: '..X.XXX.',
};

@Component({
  selector: 'app-tetromino',
  templateUrl: './tetromino.html',
  styleUrl: './tetromino.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'aria-hidden': 'true',
    '[style.--piece-color]': 'color()',
  },
})
export class Tetromino {
  readonly shape = input.required<TetrominoShape>();

  protected readonly color = computed(() => TETROMINO_COLORS[this.shape()]);
  protected readonly cells = computed(() => [...TETROMINO_CELLS[this.shape()]].map((cell) => cell === 'X'));
}
