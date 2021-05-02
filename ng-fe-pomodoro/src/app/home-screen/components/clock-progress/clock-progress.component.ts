import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-clock-progress',
    templateUrl: './clock-progress.component.html',
    styleUrls: ['./clock-progress.component.scss'],
})
export class ClockProgressComponent implements OnInit {
    @Input() elapsedTime = 0;
    @Input() totalTime = 0;

    constructor() {}

    public get percentageTransformStyle(): string {
        return `scaleX(${this.elapsedTime / this.totalTime})`;
    }

    ngOnInit(): void {}
}
