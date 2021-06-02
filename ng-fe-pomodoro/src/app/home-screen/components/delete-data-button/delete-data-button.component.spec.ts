import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Confirm } from 'src/app/shared/injection-tokens/confirm.injection-token';
import { TimerStateService } from 'src/app/shared/services/timer-state.service';
import { TimerStateServiceStub } from 'src/app/shared/services/timer-state.service.stub';

import { DeleteDataButtonComponent } from './delete-data-button.component';

describe('DeleteDataButtonComponent', () => {
    let component: DeleteDataButtonComponent;
    let fixture: ComponentFixture<DeleteDataButtonComponent>;
    let timerStateService: TimerStateService;
    const confirm = jest.fn();

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: [
                {
                    provide: Confirm,
                    useValue: confirm,
                },
                {
                    provide: TimerStateService,
                    useClass: TimerStateServiceStub,
                },
            ],
            declarations: [DeleteDataButtonComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DeleteDataButtonComponent);
        component = fixture.componentInstance;
        timerStateService = TestBed.inject(TimerStateService);
        fixture.detectChanges();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should ask for confirmation before resetting number of intervals completed', () => {
        const resetNumIntervalsCompletedSpy = jest.spyOn(
            timerStateService,
            'resetNumIntervalsCompleted'
        );
        const deleteBtn = fixture.debugElement.query(
            By.css('[data-testid="delete-btn"]')
        );

        // user does not give confirmation case
        confirm.mockReturnValue(false);
        deleteBtn.triggerEventHandler('click', {});
        expect(resetNumIntervalsCompletedSpy).not.toHaveBeenCalled();

        // user gives confirmation case
        confirm.mockReturnValue(true);
        deleteBtn.triggerEventHandler('click', {});
        expect(resetNumIntervalsCompletedSpy).toHaveBeenCalledTimes(1);
    });
});
