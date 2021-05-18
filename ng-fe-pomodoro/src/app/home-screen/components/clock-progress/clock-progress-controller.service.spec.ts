import { TestBed } from '@angular/core/testing';

import { ClockProgressControllerService } from './clock-progress-controller.service';

describe('ClockProgressControllerService', () => {
  let service: ClockProgressControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClockProgressControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
