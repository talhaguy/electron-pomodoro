import { TestBed } from '@angular/core/testing';
import { IntervalType } from '../constants/interval-type.enum';
import { Env, EnvMap } from '../injection-tokens/env.injection-token';

import { TimerUtilityService } from './timer-utility.service';

describe('TimerUtilityService', () => {
    let service: TimerUtilityService;

    const env: EnvMap = {
        production: false,
        intervalDuration: {
            focus: 5000,
            shortBreak: 2000,
            longBreak: 4000,
        },
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: Env,
                    useValue: env,
                },
            ],
        });
        service = TestBed.inject(TimerUtilityService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('getNextInterval()', () => {
        it('should get the next interval given the previous one', () => {
            expect(service.getNextInterval(IntervalType.Focus, 0)).toBe(
                IntervalType.ShortBreak
            );
            expect(service.getNextInterval(IntervalType.Focus, 3)).toBe(
                IntervalType.LongBreak
            );
            expect(service.getNextInterval(IntervalType.ShortBreak, 2)).toBe(
                IntervalType.Focus
            );
            expect(service.getNextInterval(IntervalType.LongBreak, 4)).toBe(
                IntervalType.Focus
            );
        });
    });

    describe('getIntervalDuration()', () => {
        it('should return the duration of an interval type from the environment config file', () => {
            expect(service.getIntervalDuration(IntervalType.Focus)).toBe(
                env.intervalDuration.focus
            );
            expect(service.getIntervalDuration(IntervalType.ShortBreak)).toBe(
                env.intervalDuration.shortBreak
            );
            expect(service.getIntervalDuration(IntervalType.LongBreak)).toBe(
                env.intervalDuration.longBreak
            );
        });
    });
});
