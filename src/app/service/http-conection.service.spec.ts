import { TestBed } from '@angular/core/testing';

import { HttpConectionService } from './http-conection.service';

describe('HttpConectionService', () => {
  let service: HttpConectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpConectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
