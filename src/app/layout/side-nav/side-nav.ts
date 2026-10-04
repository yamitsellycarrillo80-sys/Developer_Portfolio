import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';

import { LanguageService } from '../../core/i18n/language.service';

interface NavItem {
  key: string;
  path: string;
  color: string;
}

const NAV_ITEMS: NavItem[] = [
  { key: 'home', path: '', color: 'var(--neon-green)' },
  { key: 'about', path: 'about', color: 'var(--neon-purple)' },
  { key: 'projects', path: 'projects', color: 'var(--neon-pink)' },
  { key: 'skills', path: 'skills', color: 'var(--neon-yellow)' },
  { key: 'contact', path: 'contact', color: 'var(--neon-red)' },
];

@Component({
  selector: 'app-side-nav',
  imports: [RouterLink, RouterLinkActive, TranslocoPipe],
  templateUrl: './side-nav.html',
  styleUrl: './side-nav.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideNav {
  private readonly language = inject(LanguageService);

  protected readonly items = computed(() =>
    NAV_ITEMS.map((item) => ({
      ...item,
      commands: item.path ? ['/', this.language.current(), item.path] : ['/', this.language.current()],
      exact: item.path === '',
    })),
  );
}
