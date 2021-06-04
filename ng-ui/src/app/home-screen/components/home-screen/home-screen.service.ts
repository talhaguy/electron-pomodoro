import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, OnDestroy, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IntervalType } from 'src/app/shared/constants/interval-type.enum';
import { TimerStateService } from 'src/app/shared/services/timer-state.service';

// This service is meant to be provided only in the HomeScreenComponent
// so that it can run the ngOnDestroy at the appropriate time.
@Injectable()
export class HomeScreenService implements OnDestroy {
    private unsubscribe = new Subject<void>();

    constructor(
        private timerStateService: TimerStateService,
        private renderer: Renderer2,
        @Inject(DOCUMENT) private document: Document
    ) {}

    public startBodyStyleUpdates(): void {
        this.renderer.addClass(this.document.body, 'focus-body');

        this.timerStateService.intervalType$
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((intervalType) => {
                if (intervalType === IntervalType.Focus) {
                    this.renderer.addClass(this.document.body, 'focus-body');
                    this.renderer.removeClass(this.document.body, 'break-body');
                } else {
                    this.renderer.addClass(this.document.body, 'break-body');
                    this.renderer.removeClass(this.document.body, 'focus-body');
                }
            });
    }

    public ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
