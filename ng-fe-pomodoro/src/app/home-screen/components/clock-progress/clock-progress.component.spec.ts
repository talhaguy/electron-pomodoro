import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockProgressComponent } from './clock-progress.component';

describe('ClockProgressComponent', () => {
  let component: ClockProgressComponent;
  let fixture: ComponentFixture<ClockProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClockProgressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClockProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
