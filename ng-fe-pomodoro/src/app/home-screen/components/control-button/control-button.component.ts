import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-control-button',
    templateUrl: './control-button.component.html',
    styleUrls: ['./control-button.component.scss'],
})
export class ControlButtonComponent implements OnInit {
    @Input() label = '';
    @Input() icon = '';
    @Input() testId = '';
    @Output() buttonClick = new EventEmitter<void>();

    constructor() {}

    ngOnInit(): void {}

    onClick(): void {
        this.buttonClick.emit();
    }
}
