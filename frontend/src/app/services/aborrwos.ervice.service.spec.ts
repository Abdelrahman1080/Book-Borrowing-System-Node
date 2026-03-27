import { TestBed } from '@angular/core/testing';

import { AborrwosErviceService } from './borrow.service.service';

describe('AborrwosErviceService', () => {
  let service: AborrwosErviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AborrwosErviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
