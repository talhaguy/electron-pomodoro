import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { PlayState } from 'src/app/shared/constants/play-state.enum';
import { TimerStateService } from 'src/app/shared/services/timer-state.service';
import { TimerStateServiceStub } from 'src/app/shared/services/timer-state.service.stub';

import { ControlsComponent } from './controls.component';

describe('ControlsComponent', () => {
    let component: ControlsComponent;
    let fixture: ComponentFixture<ControlsComponent>;
    let timerStateService: TimerStateService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NoopAnimationsModule],
            providers: [
                {
                    provide: TimerStateService,
                    useClass: TimerStateServiceStub,
                },
            ],
            declarations: [ControlsComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ControlsComponent);
        component = fixture.componentInstance;
        timerStateService = TestBed.inject(TimerStateService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should NOT render restart button when play state is stopped', (done) => {
        ((timerStateService as unknown) as TimerStateServiceStub).playState.next(
            PlayState.Stopped
        );
        fixture.detectChanges();
        fixture.whenRenderingDone().then(() => {
            let restartBtn = fixture.debugElement.query(
                By.css('[data-testid="restart-btn"]')
            );
            expect(restartBtn).toBeNull();
            done();
        });
    });

    it('should render restart button when play state is NOT stopped', (done) => {
        ((timerStateService as unknown) as TimerStateServiceStub).playState.next(
            PlayState.Playing
        );
        fixture.detectChanges();
        fixture.whenRenderingDone().then(() => {
            let restartBtn = fixture.debugElement.query(
                By.css('[data-testid="restart-btn-cont"]')
            );
            expect(restartBtn).not.toBeNull();
            done();
        });
    });
});
