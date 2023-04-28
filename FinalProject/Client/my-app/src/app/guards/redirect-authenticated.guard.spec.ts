import { TestBed } from '@angular/core/testing';

import { RedirectAuthenticatedGuard } from './redirect-authenticated.guard';

describe('RedirectAuthenticatedGuard', () => {
  let guard: RedirectAuthenticatedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RedirectAuthenticatedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
