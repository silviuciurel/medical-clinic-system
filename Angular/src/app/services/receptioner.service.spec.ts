import { TestBed } from '@angular/core/testing';

import { ReceptionerService } from './receptioner.service';

describe('ReceptionerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReceptionerService = TestBed.get(ReceptionerService);
    expect(service).toBeTruthy();
  });
});
