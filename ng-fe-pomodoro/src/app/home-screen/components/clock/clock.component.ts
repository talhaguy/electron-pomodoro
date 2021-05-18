import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TimerStateService } from '../../../shared/services/timer-state.service';
import { IntervalType } from '../../../shared/constants/interval-type.enum';
import { TimerUtilityService } from 'src/app/shared/services/timer-utility.service';
import { PlayState } from 'src/app/shared/constants/play-state.enum';
import { ClockProgressControllerService } from '../clock-progress/clock-progress-controller.service';

@Component({
    selector: 'app-clock',
    templateUrl: './clock.component.html',
    styleUrls: ['./clock.component.scss'],
})
export class ClockComponent implements OnInit, OnDestroy {
    private intervalType = IntervalType.LongBreak;
    private unsubscribe = new Subject<void>();

    public elapsedTime = 0;
    public totalIntervalTime = this.timerUtilityService.getIntervalDuration(
        this.intervalType
    );
    public progressId = 'progressId';

    constructor(
        private timerStateService: TimerStateService,
        private timerUtilityService: TimerUtilityService,
        private clockProgressControllerService: ClockProgressControllerService
    ) {}

    public get intervalLabel() {
        switch (this.intervalType) {
            case IntervalType.Focus:
                return 'Focus';
            case IntervalType.ShortBreak:
                return 'Short Break';
            case IntervalType.LongBreak:
                return 'Long Break';
            default:
                return '';
        }
    }

    ngOnInit(): void {
        this.timerStateService.elapsedTime$
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((elapsedTime) => {
                this.elapsedTime = elapsedTime;
            });

        this.timerStateService.intervalType$
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((intervalType) => {
                this.intervalType = intervalType;
                this.totalIntervalTime = this.timerUtilityService.getIntervalDuration(
                    this.intervalType
                );
            });

        this.timerStateService.playState$
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((playState) => {
                if (
                    !this.clockProgressControllerService.isInitialized(
                        this.progressId
                    )
                )
                    return;

                switch (playState) {
                    case PlayState.Playing:
                        this.clockProgressControllerService.start(
                            this.progressId
                        );
                        break;
                    case PlayState.Paused:
                        this.clockProgressControllerService.pause(
                            this.progressId
                        );
                        break;
                    case PlayState.Stopped:
                        this.clockProgressControllerService.reset(
                            this.progressId
                        );
                        break;
                    default:
                        break;
                }
            });
    }

    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
