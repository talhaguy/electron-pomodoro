import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-clock-time',
    templateUrl: './clock-time.component.html',
    styleUrls: ['./clock-time.component.scss'],
})
export class ClockTimeComponent implements OnInit {
    @Input() elapsedTime = 0;
    @Input() totalTime = 0;

    constructor() {}

    public get remainingTime(): number {
        return this.totalTime - this.elapsedTime;
    }

    ngOnInit(): void {}
}
