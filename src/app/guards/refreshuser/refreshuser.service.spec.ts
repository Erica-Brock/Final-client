import { TestBed, inject } from '@angular/core/testing';

import { RefreshuserService } from './refreshuser.service';

describe('RefreshuserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RefreshuserService]
    });
  });

  it('should be created', inject([RefreshuserService], (service: RefreshuserService) => {
    expect(service).toBeTruthy();
  }));
});
