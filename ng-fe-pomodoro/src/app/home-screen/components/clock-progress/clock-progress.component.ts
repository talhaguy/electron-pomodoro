import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    Inject,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WINDOW } from 'src/app/shared/injection-tokens/window.injection-token';
import { Command } from './clock-progress-controller.enum';
import { ClockProgressControllerService } from './clock-progress-controller.service';
import { ProgressArcTimer } from './ProgressArcTimer';

@Component({
    selector: 'app-clock-progress',
    templateUrl: './clock-progress.component.html',
    styleUrls: ['./clock-progress.component.scss'],
})
export class ClockProgressComponent implements OnInit, OnChanges, OnDestroy {
    @Input() elapsedTime = 0;
    @Input() totalTime = 0;
    @Input() id = 'default';

    private progressArcTimer?: ProgressArcTimer;
    private unsubscribe = new Subject<void>();

    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private clockProgressControllerService: ClockProgressControllerService,
        @Inject(WINDOW) private win: Window
    ) {}

    @ViewChild('canvas', { static: true }) foo?: ElementRef<HTMLCanvasElement>;

    public ngOnInit(): void {
        // Prevent any DOM rendering
        // The canvas element doesn't rerender if there's no angular property on it
        // But if there is ever an ngIf added, it may
        this.changeDetectorRef.detach();

        const canvas = this.foo?.nativeElement;
        if (!canvas) return;
        this.progressArcTimer = new ProgressArcTimer(
            this.win,
            canvas,
            // TODO: use miliseconds through out app for consistency
            this.totalTime * 1000,
            {
                backCircleColor: 'transparent',
                frontCircleColor: 'white',
                debugOn: true,
            }
        );

        this.clockProgressControllerService.initController(this.id);

        this.clockProgressControllerService
            .getObservable(this.id)
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((command) => {
                switch (command) {
                    case Command.Start:
                        this.progressArcTimer?.start();
                        break;
                    case Command.Pause:
                        this.progressArcTimer?.pause();
                        // Set elapsed time in progress arc timer to one stored in `this.elapsedTime`
                        // This is b/c the timer in progress arc timer is accurate to the ms while `this.elapsedTime`
                        // is only accurate to the second. When pausing, there is a high chance of drift between
                        // the two values.
                        this.progressArcTimer?.setElapsedTime(
                            this.elapsedTime * 1000
                        );
                        break;
                    case Command.Reset:
                        this.progressArcTimer?.reset(this.totalTime * 1000);
                        break;
                    default:
                        break;
                }
            });
    }

    public ngOnChanges(changes: SimpleChanges) {
        const totalTimeChange = changes['totalTime'];
        if (totalTimeChange && !totalTimeChange.firstChange) {
            this.progressArcTimer?.reset(totalTimeChange.currentValue * 1000);
        }
    }

    public ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();

        this.clockProgressControllerService.deinitController(this.id);
    }
}
