import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TimerStateService } from 'src/app/shared/services/timer-state.service';

@Component({
    selector: 'app-interval-count',
    templateUrl: './interval-count.component.html',
    styleUrls: ['./interval-count.component.scss'],
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
