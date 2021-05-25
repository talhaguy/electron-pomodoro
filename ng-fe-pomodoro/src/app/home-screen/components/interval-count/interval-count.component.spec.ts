import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TimerStateService } from 'src/app/shared/services/timer-state.service';
import { TimerStateServiceStub } from 'src/app/shared/services/timer-state.service.stub';

import { IntervalCountComponent } from './interval-count.component';

describe('IntervalCountComponent', () => {
    let component: IntervalCountComponent;
    let fixture: ComponentFixture<IntervalCountComponent>;
    let timerStateService: TimerStateService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NoopAnimationsModule],
            declarations: [IntervalCountComponent],
            providers: [
                {
                    provide: TimerStateService,
                    useClass: TimerStateServiceStub,
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        timerStateService = TestBed.inject(TimerStateService);
        fixture = TestBed.createComponent(IntervalCountComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should show show as many counters as intervals completed', () => {
        (timerStateService as any).intervalsCompleted.next(5);
        fixture.detectChanges();
        expect(
            fixture.debugElement.queryAll(By.css('[data-testid="count-item"]'))
                .length
        ).toBe(5);
    });
});
