import { ChangeDetectionStrategy, Component, DestroyRef, afterNextRender, computed, inject, signal } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

import { TetrominoShape } from '../../domain/models/tetromino.model';
import { Tetromino } from '../../shared/ui/tetromino/tetromino';

const PIECE_SEQUENCE: TetrominoShape[] = ['T', 'L', 'S', 'Z', 'J', 'O', 'I'];
const PIECE_INTERVAL_MS = 3000;

@Component({
  selector: 'app-next-piece',
  imports: [Tetromino, TranslocoPipe],
  templateUrl: './next-piece.html',
  styleUrl: './next-piece.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NextPiece {
  private readonly destroyRef = inject(DestroyRef);
  private readonly index = signal(0);

  protected readonly shape = computed(() => PIECE_SEQUENCE[this.index()]);

  constructor() {
    afterNextRender(() => {
      if (globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
        return;
      }
      const timer = setInterval(
        () => this.index.update((current) => (current + 1) % PIECE_SEQUENCE.length),
        PIECE_INTERVAL_MS,
      );
      this.destroyRef.onDestroy(() => clearInterval(timer));
    });
  }
}
