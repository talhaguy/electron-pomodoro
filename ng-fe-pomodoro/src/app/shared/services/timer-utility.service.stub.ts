import { Injectable } from '@angular/core';
import { IntervalType } from '../constants/interval-type.enum';

@Injectable({
    providedIn: 'root',
})
export class TimerUtilityServiceStub {
    public getNextInterval(
        previousInterval: IntervalType,
        previousIntervalsCompleted: number
    ): IntervalType {
        return IntervalType.Focus;
    }

    public getIntervalDuration(currentIntervalType: IntervalType): number {
        return 5000;
    }
}
