import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { PlayState } from 'src/app/shared/constants/play-state.enum';
import { TimerStateService } from 'src/app/shared/services/timer-state.service';
import { TimerStateServiceStub } from 'src/app/shared/services/timer-state.service.stub';
import { TimerUtilityService } from 'src/app/shared/services/timer-utility.service';
import { TimerUtilityServiceStub } from 'src/app/shared/services/timer-utility.service.stub';

import { ClockComponent } from './clock.component';
import { ClockService } from './clock.service';
import { ClockServiceStub } from './clock.service.stub';

describe('ClockComponent', () => {
    let component: ClockComponent;
    let fixture: ComponentFixture<ClockComponent>;
    let timerStateService: TimerStateService;
    const playState = new Subject<PlayState>();
    let clockService: ClockService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ClockComponent],
            providers: [
                {
                    provide: TimerStateService,
                    useClass: TimerStateServiceStub,
                },
                {
                    provide: TimerUtilityService,
                    useClass: TimerUtilityServiceStub,
                },
                {
                    provide: ClockService,
                    useClass: ClockServiceStub,
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ClockComponent);

        timerStateService = TestBed.inject(TimerStateService);
        // use playState subject in this test to be able to `.next` on it
        timerStateService.playState$ = playState.asObservable();

        clockService = TestBed.inject(ClockService);

        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('ngOnInit()', () => {
        it('should subscribe to play state to run clock progress controller action on updates', () => {
            const runClockProgressControllerActionSpy = jest.spyOn(
                clockService,
                'runClockProgressControllerAction'
            );
            playState.next(PlayState.Playing);
            expect(runClockProgressControllerActionSpy).toHaveBeenCalledWith(
                component.progressId,
                PlayState.Playing
            );
        });
    });
});
