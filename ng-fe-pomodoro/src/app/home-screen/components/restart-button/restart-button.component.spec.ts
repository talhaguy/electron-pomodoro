import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimerStateService } from 'src/app/shared/services/timer-state.service';
import { TimerStateServiceStub } from 'src/app/shared/services/timer-state.service.stub';

import { RestartButtonComponent } from './restart-button.component';

describe('RestartButtonComponent', () => {
    let component: RestartButtonComponent;
    let fixture: ComponentFixture<RestartButtonComponent>;
    let timerStateService: TimerStateService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: [
                {
                    provide: TimerStateService,
                    useClass: TimerStateServiceStub,
                },
            ],
            declarations: [RestartButtonComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RestartButtonComponent);
        component = fixture.componentInstance;
        timerStateService = TestBed.inject(TimerStateService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('onClick()', () => {
        it('should reset timer', () => {
            const resetTimerSpy = jest.spyOn(timerStateService, 'resetTimer');
            component.onClick();
            expect(resetTimerSpy).toHaveBeenCalledTimes(1);
        });
    });
});
