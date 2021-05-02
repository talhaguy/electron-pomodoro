import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntervalCountComponent } from './interval-count.component';

describe('IntervalCountComponent', () => {
  let component: IntervalCountComponent;
  let fixture: ComponentFixture<IntervalCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntervalCountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntervalCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
