import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';

import { Tetromino } from '../../shared/ui/tetromino/tetromino';
import { Header } from '../header/header';
import { NextPiece } from '../next-piece/next-piece';
import { SideNav } from '../side-nav/side-nav';
import { StatsPanel } from '../stats-panel/stats-panel';

@Component({
  selector: 'app-shell',
  imports: [Header, SideNav, NextPiece, StatsPanel, Tetromino, RouterOutlet, TranslocoPipe],
  templateUrl: './shell.html',
  styleUrl: './shell.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Shell {}
