import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { TimerStateService } from '../../../shared/services/timer-state.service';
import { TimerUtilityService } from 'src/app/shared/services/timer-utility.service';
import { ClockService } from './clock.service';

@Component({
    selector: 'app-clock',
    templateUrl: './clock.component.html',
    styleUrls: ['./clock.component.scss'],
})
export class ClockComponent implements OnInit, OnDestroy {
    private unsubscribe = new Subject<void>();

    public progressId = 'progressId';
    public interval$ = this.timerStateService.intervalType$.pipe(
        map((intervalType) => {
            return {
                label: this.clockService.getIntervalLabel(intervalType),
                totalIntervalTime: this.timerUtilityService.getIntervalDuration(
                    intervalType
                ),
            };
        })
    );
    public elapsedTime$ = this.timerStateService.elapsedTime$;

    constructor(
        private timerStateService: TimerStateService,
        private timerUtilityService: TimerUtilityService,
        private clockService: ClockService
    ) {}

    ngOnInit(): void {
        this.timerStateService.playState$
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((playState) => {
                this.clockService.runClockProgressControllerAction(
                    this.progressId,
                    playState
                );
            });
    }

    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
