import { TestBed } from '@angular/core/testing';

import { RemesasService } from './remesas.service';

describe('RemesasService', () => {
  let service: RemesasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemesasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
