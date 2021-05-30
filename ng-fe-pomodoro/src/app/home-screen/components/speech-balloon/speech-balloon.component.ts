import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-speech-balloon',
    templateUrl: './speech-balloon.component.html',
    styleUrls: ['./speech-balloon.component.scss'],
})
export class SpeechBalloonComponent {
    @Input() message = '';
}
