import {
    animate,
    keyframes,
    style,
    transition,
    trigger,
} from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TimerStateService } from 'src/app/shared/services/timer-state.service';

@Component({
    selector: 'app-interval-count',
    templateUrl: './interval-count.component.html',
    styleUrls: ['./interval-count.component.scss'],
    animations: [
        trigger('appear', [
            transition(':enter', [
                animate(
                    '200ms',
                    keyframes([
                        style({
                            transform: 'scale(0)',
                            offset: 0,
                        }),
                        style({
                            transform: 'scale(1.3)',
                            offset: 0.7,
                        }),
                        style({
                            transform: 'scale(1)',
                            offset: 1,
                        }),
                    ])
                ),
            ]),
        ]),
    ],
})
export class IntervalCountComponent implements OnInit, OnDestroy {
    private unsubscribe = new Subject<void>();

    public intervalsCompletedList: any[] = [];

    constructor(private timerStateService: TimerStateService) {}

    ngOnInit(): void {
        this.timerStateService.intervalsCompleted$
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((intervalsCompleted) => {
                this.intervalsCompletedList = new Array(intervalsCompleted);
            });
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
