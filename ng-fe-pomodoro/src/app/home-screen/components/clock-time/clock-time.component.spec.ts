import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimePipe } from '../../pipes/time.pipe';

import { ClockTimeComponent } from './clock-time.component';

describe('ClockTimeComponent', () => {
    let component: ClockTimeComponent;
    let fixture: ComponentFixture<ClockTimeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ClockTimeComponent, TimePipe],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ClockTimeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('remainingTime', () => {
        it('should get the remaining time calculated from inputs', () => {
            component.elapsedTime = 5000;
            component.totalTime = 7000;
            expect(component.remainingTime).toBe(2000);

            component.elapsedTime = 2000;
            component.totalTime = 10000;
            expect(component.remainingTime).toBe(8000);

            component.elapsedTime = 3000;
            component.totalTime = 3000;
            expect(component.remainingTime).toBe(0);
        });
    });
});
