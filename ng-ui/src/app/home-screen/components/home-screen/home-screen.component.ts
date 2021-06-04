import { Component, OnInit } from '@angular/core';
import { TimerStateService } from 'src/app/shared/services/timer-state.service';
import { HomeScreenService } from './home-screen.service';

@Component({
    selector: 'app-home-screen',
    templateUrl: './home-screen.component.html',
    styleUrls: ['./home-screen.component.scss'],
    providers: [HomeScreenService],
})
export class HomeScreenComponent implements OnInit {
    public intervalsCompleted$ = this.timerStateService.intervalsCompleted$;

    constructor(
        private timerStateService: TimerStateService,
        private homeScreenService: HomeScreenService
    ) {}

    ngOnInit(): void {
        this.homeScreenService.startBodyStyleUpdates();
    }
}
