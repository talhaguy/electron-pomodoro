import { Inject, Injectable } from '@angular/core';
import { IntervalType } from '../constants/interval-type.enum';
import { Env, EnvMap } from '../injection-tokens/env.injection-token';

@Injectable({
    providedIn: 'root',
})
export class TimerUtilityService {
    constructor(@Inject(Env) private env: EnvMap) {}

    public getNextInterval(
        previousInterval: IntervalType,
        previousIntervalsCompleted: number
    ): IntervalType {
        if (
            previousInterval === IntervalType.LongBreak ||
            previousInterval === IntervalType.ShortBreak
        ) {
            return IntervalType.Focus;
        } else {
            // interval type was focus
            if ((previousIntervalsCompleted + 1) % 4 === 0) {
                return IntervalType.LongBreak;
            } else {
                return IntervalType.ShortBreak;
            }
        }
    }

    public getIntervalDuration(currentIntervalType: IntervalType): number {
        switch (currentIntervalType) {
            case IntervalType.Focus:
                return this.env.intervalDuration.focus;
            case IntervalType.ShortBreak:
                return this.env.intervalDuration.shortBreak;
            case IntervalType.LongBreak:
                return this.env.intervalDuration.longBreak;
        }
    }
}
