import { TestBed } from '@angular/core/testing';

import { AbooksserviceService } from './book.service.service';

describe('AbooksserviceService', () => {
  let service: AbooksserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbooksserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
