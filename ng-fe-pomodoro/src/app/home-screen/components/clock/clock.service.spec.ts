import { TestBed } from '@angular/core/testing';
import { IntervalType } from 'src/app/shared/constants/interval-type.enum';
import { PlayState } from 'src/app/shared/constants/play-state.enum';
import { ClockProgressControllerService } from '../clock-progress/clock-progress-controller.service';
import { ClockProgressControllerServiceStub } from '../clock-progress/clock-progress-controller.service.stub';

import { ClockService } from './clock.service';

describe('ClockService', () => {
    let service: ClockService;
    let clockProgressControllerService: ClockProgressControllerService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: ClockProgressControllerService,
                    useClass: ClockProgressControllerServiceStub,
                },
            ],
        });
        service = TestBed.inject(ClockService);
        clockProgressControllerService = TestBed.inject(
            ClockProgressControllerService
        );
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('getIntervalLabel()', () => {
        it('should return the text label for a given interval type', () => {
            const expectations = [
                {
                    param: IntervalType.Focus,
                    expected: 'Focus',
                },
                {
                    param: IntervalType.ShortBreak,
                    expected: 'Short Break',
                },
                {
                    param: IntervalType.LongBreak,
                    expected: 'Long Break',
                },
                {
                    param: 100 as any,
                    expected: '',
                },
            ];

            expectations.forEach(({ param, expected }) => {
                expect(service.getIntervalLabel(param)).toBe(expected);
            });
        });
    });

    describe('runClockProgressControllerAction()', () => {
        let startSpy: jest.SpyInstance;
        let pauseSpy: jest.SpyInstance;
        let resetSpy: jest.SpyInstance;
        const id = 'some-id';

        beforeEach(() => {
            startSpy = jest.spyOn(clockProgressControllerService, 'start');
            pauseSpy = jest.spyOn(clockProgressControllerService, 'pause');
            resetSpy = jest.spyOn(clockProgressControllerService, 'reset');
        });

        afterEach(() => {
            jest.clearAllMocks();
        });

        it('should not run any controller method if id given is not initialized', () => {
            jest.spyOn(
                clockProgressControllerService,
                'isInitialized'
            ).mockReturnValue(false);

            const expectations: {
                params: [string, PlayState];
            }[] = [
                {
                    params: [id, PlayState.Playing],
                },
                {
                    params: [id, PlayState.Paused],
                },
                {
                    params: [id, PlayState.Stopped],
                },
            ];

            expectations.forEach(({ params }) => {
                service.runClockProgressControllerAction(...params);
                expect(startSpy).not.toHaveBeenCalled();
                expect(pauseSpy).not.toHaveBeenCalled();
                expect(resetSpy).not.toHaveBeenCalled();
            });
        });

        it('should run the corresponding controller method for a given play state', () => {
            jest.spyOn(
                clockProgressControllerService,
                'isInitialized'
            ).mockReturnValue(true);

            const expectations: {
                params: [string, PlayState];
                expectedToBeCalled: jest.SpyInstance;
            }[] = [
                {
                    params: [id, PlayState.Playing],
                    expectedToBeCalled: startSpy,
                },
                {
                    params: [id, PlayState.Paused],
                    expectedToBeCalled: pauseSpy,
                },
                {
                    params: [id, PlayState.Stopped],
                    expectedToBeCalled: resetSpy,
                },
            ];

            expectations.forEach(({ params, expectedToBeCalled }) => {
                service.runClockProgressControllerAction(...params);
                expect(expectedToBeCalled).toHaveBeenCalledTimes(1);
            });
        });
    });
});
