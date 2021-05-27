import { ChangeDetectorRef, SimpleChange, SimpleChanges } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { canvasEle } from '../../../../test-support/mocks';
import { Command } from './clock-progress-controller.enum';
import { ClockProgressControllerService } from './clock-progress-controller.service';
import { ClockProgressControllerServiceStub } from './clock-progress-controller.service.stub';

import { ClockProgressComponent } from './clock-progress.component';

describe('ClockProgressComponent', () => {
    let component: ClockProgressComponent;
    let fixture: ComponentFixture<ClockProgressComponent>;
    let clockProgressControllerService: ClockProgressControllerService;
    let changeDetectorRef: ChangeDetectorRef;
    let detachSpy: jest.SpyInstance;
    let initControllerSpy: jest.SpyInstance;
    let getObservableSpy: jest.SpyInstance;
    const command = new Subject<Command>();

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ClockProgressComponent],
            providers: [
                {
                    provide: ClockProgressControllerService,
                    useClass: ClockProgressControllerServiceStub,
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ClockProgressComponent);
        component = fixture.componentInstance;

        clockProgressControllerService = TestBed.inject(
            ClockProgressControllerService
        );
        initControllerSpy = jest.spyOn(
            clockProgressControllerService,
            'initController'
        );
        getObservableSpy = jest
            .spyOn(clockProgressControllerService, 'getObservable')
            .mockReturnValue(command.asObservable());

        // getting `changeDetectorRef` through compoennt instance as we're unable to get it through DI
        changeDetectorRef = (component as any).changeDetectorRef;
        detachSpy = jest.spyOn(changeDetectorRef, 'detach');

        component.id = 'some-id';
        component.canvas = {
            nativeElement: canvasEle,
        };

        fixture.detectChanges();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('ngOnInit()', () => {
        it('should prevent rerendering on change', () => {
            expect(detachSpy).toHaveBeenCalled();
        });

        it('should instantiate a progress arc timer (for the timer animation)', () => {
            expect((component as any).progressArcTimer).toBeTruthy();
        });

        it('should initialize a clock progress controller', () => {
            expect(initControllerSpy).toHaveBeenCalledWith('some-id');
        });

        it('should subscribe to clock progress controller commands', () => {
            const startSpy = jest.spyOn(
                (component as any).progressArcTimer,
                'start'
            );
            const pauseSpy = jest.spyOn(
                (component as any).progressArcTimer,
                'pause'
            );
            const setElapsedTimeSpy = jest.spyOn(
                (component as any).progressArcTimer,
                'setElapsedTime'
            );
            const resetSpy = jest.spyOn(
                (component as any).progressArcTimer,
                'reset'
            );

            // initial subscribe
            expect(getObservableSpy).toHaveBeenCalledWith('some-id');

            // start command
            command.next(Command.Start);
            expect(startSpy).toHaveBeenCalledTimes(1);

            // pause command
            command.next(Command.Pause);
            expect(pauseSpy).toHaveBeenCalledTimes(1);
            expect(setElapsedTimeSpy).toHaveBeenCalledWith(
                component.elapsedTime
            );

            // reset command
            command.next(Command.Reset);
            expect(resetSpy).toHaveBeenCalledTimes(1);
        });
    });

    describe('ngOnChanges()', () => {
        it('should reset progress arc timer animation when there is an update to the total time component input and it is not the first time', () => {
            const resetSpy = jest.spyOn(
                (component as any).progressArcTimer,
                'reset'
            );
            const changes: SimpleChanges = {
                totalTime: new SimpleChange(5000, 10000, false),
            };

            component.ngOnChanges(changes);

            expect(resetSpy).toHaveBeenCalledTimes(1);
        });

        it('should NOT reset progress arc timer animation when there is an update to the total time component input for the first time', () => {
            const resetSpy = jest.spyOn(
                (component as any).progressArcTimer,
                'reset'
            );
            const changes: SimpleChanges = {
                totalTime: new SimpleChange(undefined, 5000, true),
            };

            component.ngOnChanges(changes);

            expect(resetSpy).not.toHaveBeenCalled();
        });
    });
});
