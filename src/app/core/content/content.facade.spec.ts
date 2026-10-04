import { TestBed } from '@angular/core/testing';

import { ContentRepository } from '../../domain/repositories/content.repository';
import { LocalContentRepository } from '../../data-access/local-content.repository';
import { ContentFacade } from './content.facade';

describe('ContentFacade', () => {
  let facade: ContentFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: ContentRepository, useClass: LocalContentRepository }],
    });
    facade = TestBed.inject(ContentFacade);
  });

  it('derives the stats from the content', () => {
    expect(facade.stats.projects).toBe(facade.projects.length);
    expect(facade.stats.skills).toBe(20);
  });

  it('only exposes featured projects in the featured list', () => {
    expect(facade.featuredProjects.every((project) => project.featured)).toBe(true);
  });
});
