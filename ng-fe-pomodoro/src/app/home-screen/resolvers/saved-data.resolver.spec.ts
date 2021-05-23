import { TestBed } from '@angular/core/testing';

import { SavedDataResolver } from './saved-data.resolver';

describe('SavedDataResolver', () => {
  let resolver: SavedDataResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(SavedDataResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
