import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PlayState } from 'src/app/shared/constants/play-state.enum';
import { TimerStateService } from 'src/app/shared/services/timer-state.service';
import { TimerStateServiceStub } from 'src/app/shared/services/timer-state.service.stub';

import { PlayPauseButtonComponent } from './play-pause-button.component';

describe('PlayPauseButtonComponent', () => {
    let component: PlayPauseButtonComponent;
    let fixture: ComponentFixture<PlayPauseButtonComponent>;
    let timerStateService: TimerStateService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: [
                {
                    provide: TimerStateService,
                    useClass: TimerStateServiceStub,
                },
            ],
            declarations: [PlayPauseButtonComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PlayPauseButtonComponent);
        component = fixture.componentInstance;
        timerStateService = TestBed.inject(TimerStateService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('label', () => {
        it('should get the label based on play state', () => {
            ((timerStateService as unknown) as TimerStateServiceStub).playState.next(
                PlayState.Playing
            );
            expect(component.label).toBe('Pause');

            ((timerStateService as unknown) as TimerStateServiceStub).playState.next(
                PlayState.Paused
            );
            expect(component.label).toBe('Play');
        });
    });

    describe('icon', () => {
        it('should get the correct icon based on play state', () => {
            ((timerStateService as unknown) as TimerStateServiceStub).playState.next(
                PlayState.Playing
            );
            expect(component.icon).toBe('assets/pause_white_24dp.svg');

            ((timerStateService as unknown) as TimerStateServiceStub).playState.next(
                PlayState.Paused
            );
            expect(component.icon).toBe('assets/play_arrow_white_24dp.svg');
        });
    });

    describe('ngOnDestroy()', () => {
        it('should push a undefined value to the unsubscribe subject and complete it', (done) => {
            (component as any).unsubscribe.subscribe(
                (val: undefined) => {
                    expect(val).toBeUndefined();
                },
                () => {},
                () => done()
            );
            component.ngOnDestroy();
        });
    });

    describe('button click', () => {
        it('should start timer if play state is stopped or paused', () => {
            const startTimerSpy = jest.spyOn(timerStateService, 'startTimer');
            ((timerStateService as unknown) as TimerStateServiceStub).playState.next(
                PlayState.Paused
            );
            component.onClick();
            expect(startTimerSpy).toHaveBeenCalledTimes(1);

            (startTimerSpy as jest.Mock).mockClear();
            ((timerStateService as unknown) as TimerStateServiceStub).playState.next(
                PlayState.Stopped
            );
            component.onClick();
            expect(startTimerSpy).toHaveBeenCalledTimes(1);
        });

        it('should pause timer if play state is playing', () => {
            const pauseTimerSpy = jest.spyOn(timerStateService, 'pauseTimer');
            ((timerStateService as unknown) as TimerStateServiceStub).playState.next(
                PlayState.Playing
            );

            component.onClick();

            expect(pauseTimerSpy).toHaveBeenCalledTimes(1);
        });
    });
});
