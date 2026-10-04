import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';

import { routes } from '../../app.routes';
import { provideTestTransloco } from '../i18n/transloco-testing';

describe('languageGuard', () => {
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter(routes), provideTestTransloco()],
    });
    router = TestBed.inject(Router);
  });

  it('keeps a supported language', async () => {
    await router.navigateByUrl('/en/projects');
    expect(router.url).toBe('/en/projects');
  });

  it('replaces an unsupported language and keeps section and query', async () => {
    await router.navigateByUrl('/fr/skills?ref=cv');
    expect(router.url).toBe('/es/skills?ref=cv');
  });

  it('redirects the root to the default language', async () => {
    await router.navigateByUrl('/');
    expect(router.url).toBe('/es');
  });
});
