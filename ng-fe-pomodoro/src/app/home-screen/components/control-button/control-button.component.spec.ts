import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ControlButtonComponent } from './control-button.component';

describe('ControlButtonComponent', () => {
    let component: ControlButtonComponent;
    let fixture: ComponentFixture<ControlButtonComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ControlButtonComponent],
        }).compileComponents();
    });
    beforeEach(() => {
        fixture = TestBed.createComponent(ControlButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit an event on click', () => {
        const buttonClickSpy = jest.spyOn(component.buttonClick, 'emit');
        const button = fixture.debugElement.query(By.css('.button'));
        button.triggerEventHandler('click', null);
        expect(buttonClickSpy).toHaveBeenCalled();
    });
});
