import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PlayState } from 'src/app/shared/constants/play-state.enum';
import { TimerStateService } from 'src/app/shared/services/timer-state.service';

@Component({
    selector: 'app-controls',
    templateUrl: './controls.component.html',
    styleUrls: ['./controls.component.scss'],
    animations: [
        trigger('enterTrigger', [
            transition(':enter', [
                style({
                    opacity: 0,
                }),
                animate(
                    '300ms 50ms linear',
                    style({
                        opacity: 1,
                    })
                ),
            ]),
            transition(':leave', [
                animate(
                    '100ms',
                    style({
                        opacity: 0,
                    })
                ),
            ]),
        ]),
    ],
})
export class ControlsComponent implements OnInit, OnDestroy {
    public playState: PlayState = PlayState.Stopped;
    public playStates = PlayState;

    private unsubscribe = new Subject<void>();

    constructor(private timerStateService: TimerStateService) {}

    ngOnInit(): void {
        // Not using async pipe as this observable can return 0.
        // 0 forces *ngIf to evaluate as false when using the `playState$ | async as playState` syntax
        this.timerStateService.playState$
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((playState) => {
                this.playState = playState;
            });
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
