import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IntervalType } from 'src/app/shared/constants/interval-type.enum';
import { TimerStateService } from 'src/app/shared/services/timer-state.service';

@Component({
    selector: 'app-home-screen',
    templateUrl: './home-screen.component.html',
    styleUrls: ['./home-screen.component.scss'],
})
export class HomeScreenComponent implements OnInit, OnDestroy {
    private unsubscribe = new Subject<void>();

    constructor(
        private timerStateService: TimerStateService,
        private renderer: Renderer2,
        @Inject(DOCUMENT) private document: Document
    ) {}

    ngOnInit(): void {
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

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
