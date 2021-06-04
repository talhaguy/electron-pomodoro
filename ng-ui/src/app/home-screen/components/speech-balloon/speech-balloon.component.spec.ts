import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechBalloonComponent } from './speech-balloon.component';

describe('SpeechBalloonComponent', () => {
  let component: SpeechBalloonComponent;
  let fixture: ComponentFixture<SpeechBalloonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechBalloonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechBalloonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
