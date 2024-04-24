import { TestBed } from '@angular/core/testing';

import { BaseRecetasService } from './base-recetas.service';

describe('BaseRecetasService', () => {
  let service: BaseRecetasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseRecetasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
