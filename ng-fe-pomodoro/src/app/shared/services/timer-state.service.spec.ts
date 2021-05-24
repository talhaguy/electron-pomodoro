import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { IntervalType } from '../constants/interval-type.enum';
import { PlayState } from '../constants/play-state.enum';
import { WINDOW } from '../injection-tokens/window.injection-token';
import { StorageService } from './storage.service';
import { StorageServiceStub } from './storage.service.stub';

import { TimerStateService } from './timer-state.service';
import { TimerUtilityService } from './timer-utility.service';
import { TimerUtilityServiceStub } from './timer-utility.service.stub';

describe('TimerStateService', () => {
    let service: TimerStateService;
    let window = {
        setInterval: jest.fn().mockReturnValue(12345),
        clearInterval: jest.fn(),
    };
    let timerUtilityService: TimerUtilityService;
    let storageService: StorageService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: WINDOW,
                    useValue: window,
                },
                {
                    provide: TimerUtilityService,
                    useClass: TimerUtilityServiceStub,
                },
                {
                    provide: StorageService,
                    useClass: StorageServiceStub,
                },
            ],
        });
        service = TestBed.inject(TimerStateService);
        timerUtilityService = TestBed.inject(TimerUtilityService);
        storageService = TestBed.inject(StorageService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('startTimer()', () => {
        it('should set play state to playing', () => {
            service.startTimer();
            service.playState$
                .pipe(take(1))
                .subscribe((state) => expect(state).toBe(PlayState.Playing));
        });

        it('should start interval for every 1 second', () => {
            service.startTimer();
            expect(window.setInterval.mock.calls[0][1]).toBe(1000);
        });

        it('should increment elapsed time on every interval', (done) => {
            service.startTimer();
            const cb = window.setInterval.mock.calls[0][0];

            let initialElapsedTime: number;
            service.elapsedTime$
                .pipe(
                    take(2),
                    tap((elapsedTime) => {
                        // store the initial time
                        if (typeof initialElapsedTime === 'undefined')
                            initialElapsedTime = elapsedTime;
                    })
                )
                .subscribe((elapsedTime) => {
                    // if it's not the initial time, check if increment is by 1000ms
                    if (initialElapsedTime !== elapsedTime) {
                        expect(elapsedTime).toBe(initialElapsedTime + 1000);
                        done();
                    }
                });

            cb();
        });

        it('should end the window interval if the duration for the app interval type has been met and update properties', () => {
            service.startTimer();
            const cb = window.setInterval.mock.calls[0][0];

            // set 3000ms as app interval type end
            jest.spyOn(
                timerUtilityService,
                'getIntervalDuration'
            ).mockReturnValue(3000);

            // set next interval to be short break type
            jest.spyOn(timerUtilityService, 'getNextInterval').mockReturnValue(
                IntervalType.ShortBreak
            );

            const saveDataSpy = jest.spyOn(storageService, 'saveData');

            // make sure intervals completed is at 0, so we can check for incrementing later
            service.setNumIntervalsCompleted(0);

            // run callback enough times to meet interval end ms
            cb();
            cb();
            cb();

            expect(window.clearInterval).toHaveBeenCalledWith(12345);

            // should update play state to stopped
            service.playState$
                .pipe(take(1))
                .subscribe((playState) =>
                    expect(playState).toBe(PlayState.Stopped)
                );

            // should set elapsed time to 0
            service.elapsedTime$
                .pipe(take(1))
                .subscribe((elapsedTime) => expect(elapsedTime).toBe(0));

            // since this first interval is of type focus, check if intervals completed is incremented
            service.intervalsCompleted$
                .pipe(take(1))
                .subscribe((intervalsCompleted) => {
                    expect(intervalsCompleted).toBe(1);
                });

            // check if data is getting saved
            expect(saveDataSpy).toHaveBeenCalledWith({
                intervalsCompleted: 1,
            });

            // next interval should be set to short break
            service.intervalType$.pipe(take(1)).subscribe((intervalType) => {
                expect(intervalType).toBe(IntervalType.ShortBreak);
            });
        });

        it('should not increment intervals completed count on app interval end if the interval was not of focus type', () => {
            service.startTimer();
            let cb = window.setInterval.mock.calls[0][0];

            // set 3000ms as app interval type end
            jest.spyOn(
                timerUtilityService,
                'getIntervalDuration'
            ).mockReturnValue(3000);

            // set next interval to be short break type
            jest.spyOn(timerUtilityService, 'getNextInterval').mockReturnValue(
                IntervalType.ShortBreak
            );

            // make sure intervals completed is at 0, so we can check for incrementing later
            service.setNumIntervalsCompleted(0);

            // run callback enough times to meet focus type interval end
            // note: need to do this as focus type is the default start type
            cb();
            cb();
            cb();

            // now start the short break type interval
            service.startTimer();
            cb = window.setInterval.mock.calls[0][0];

            // set next interval to be focus type
            jest.spyOn(timerUtilityService, 'getNextInterval').mockReturnValue(
                IntervalType.ShortBreak
            );

            const saveDataSpy = jest.spyOn(storageService, 'saveData');

            // run callback enough times to meet short break type interval end
            cb();
            cb();
            cb();

            // should not increment intervals completed
            service.intervalsCompleted$
                .pipe(take(1))
                .subscribe((intervalsCompleted) => {
                    expect(intervalsCompleted).toBe(1);
                });

            // check if data is getting saved
            expect(saveDataSpy).not.toHaveBeenCalled();

            // next interval should be set to focus type
            service.intervalType$.pipe(take(1)).subscribe((intervalType) => {
                expect(intervalType).toBe(IntervalType.Focus);
            });
        });
    });

    describe('pauseTimer()', () => {
        it('should clear interval and set play state to paused', () => {
            // start timer, so that there is an interval id
            service.startTimer();

            service.pauseTimer();
            expect(window.clearInterval).toHaveBeenCalledWith(12345);
            service.playState$
                .pipe(take(1))
                .subscribe((playState) =>
                    expect(playState).toBe(PlayState.Paused)
                );
        });
    });

    describe('skipInterval()', () => {
        it('should clear the window interval and update state properties', () => {
            jest.spyOn(timerUtilityService, 'getNextInterval').mockReturnValue(
                IntervalType.ShortBreak
            );

            // start timer, so that there is an interval id
            service.startTimer();

            service.skipInterval();

            expect(window.clearInterval).toHaveBeenCalledWith(12345);

            // should reset elapsed time
            service.elapsedTime$
                .pipe(take(1))
                .subscribe((elapsedTime) => expect(elapsedTime).toBe(0));

            // should set interval type to the next one
            service.intervalType$
                .pipe(take(1))
                .subscribe((intervalType) =>
                    expect(intervalType).toBe(IntervalType.ShortBreak)
                );

            // should set the play state to paused
            service.playState$
                .pipe(take(1))
                .subscribe((playState) =>
                    expect(playState).toBe(PlayState.Paused)
                );
        });
    });

    describe('resetTimer()', () => {
        it('should clear the window interval and update state properties', () => {
            // start timer, so that there is an interval id
            service.startTimer();

            service.resetTimer();

            expect(window.clearInterval).toHaveBeenCalledWith(12345);

            // should reset elapsed time
            service.elapsedTime$
                .pipe(take(1))
                .subscribe((elapsedTime) => expect(elapsedTime).toBe(0));

            // should set the play state to stopped
            service.playState$
                .pipe(take(1))
                .subscribe((playState) =>
                    expect(playState).toBe(PlayState.Stopped)
                );
        });
    });

    describe('setNumIntervalsCompleted()', () => {
        it('should set the number of intervals completed', () => {
            service.setNumIntervalsCompleted(4);
            service.intervalsCompleted$
                .pipe(take(1))
                .subscribe((intervalsCompleted) =>
                    expect(intervalsCompleted).toBe(4)
                );
        });
    });

    describe('resetNumIntervalsCompleted()', () => {
        it('should set number of intervals completed to 0 and reset saved data', () => {
            const saveDataSpy = jest.spyOn(storageService, 'saveData');

            // set num intervals completed to something so we can check if it is 0 later
            service.setNumIntervalsCompleted(2);

            service.resetNumIntervalsCompleted();

            service.intervalsCompleted$
                .pipe(take(1))
                .subscribe((intervalsCompleted) =>
                    expect(intervalsCompleted).toBe(0)
                );

            expect(saveDataSpy).toHaveBeenCalledWith({
                intervalsCompleted: 0,
            });
        });
    });
});
