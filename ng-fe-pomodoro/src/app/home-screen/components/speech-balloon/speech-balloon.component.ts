import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-speech-balloon',
    templateUrl: './speech-balloon.component.html',
    styleUrls: ['./speech-balloon.component.scss'],
})
export class SpeechBalloonComponent implements OnInit {
    @Input() message = '';

    constructor() {}

    ngOnInit(): void {}
}
