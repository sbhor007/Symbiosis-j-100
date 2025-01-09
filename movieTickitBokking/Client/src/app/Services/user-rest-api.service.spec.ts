import { TestBed } from '@angular/core/testing';

import { UserRestApiService } from './user-rest-api.service';

describe('UserRestApiService', () => {
  let service: UserRestApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRestApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
