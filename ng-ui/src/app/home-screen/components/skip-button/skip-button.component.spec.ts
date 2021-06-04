import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimerStateService } from 'src/app/shared/services/timer-state.service';
import { TimerStateServiceStub } from 'src/app/shared/services/timer-state.service.stub';

import { SkipButtonComponent } from './skip-button.component';

describe('SkipButtonComponent', () => {
    let component: SkipButtonComponent;
    let fixture: ComponentFixture<SkipButtonComponent>;
    let timerStateService: TimerStateService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: [
                {
                    provide: TimerStateService,
                    useClass: TimerStateServiceStub,
                },
            ],
            declarations: [SkipButtonComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SkipButtonComponent);
        component = fixture.componentInstance;
        timerStateService = TestBed.inject(TimerStateService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('onClick()', () => {
        it('should skip interval', () => {
            const skipIntervalSpy = jest.spyOn(
                timerStateService,
                'skipInterval'
            );
            component.onClick();
            expect(skipIntervalSpy).toHaveBeenCalledTimes(1);
        });
    });
});
