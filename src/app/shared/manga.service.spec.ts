import { TestBed, inject } from '@angular/core/testing';

import { MangaService } from './manga.service';

describe('MangaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MangaService]
    });
  });

  it('should be created', inject([MangaService], (service: MangaService) => {
    expect(service).toBeTruthy();
  }));
});
