import { DOCUMENT } from '@angular/common';
import { Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { IntervalType } from 'src/app/shared/constants/interval-type.enum';
import { TimerStateService } from 'src/app/shared/services/timer-state.service';
import { TimerStateServiceStub } from 'src/app/shared/services/timer-state.service.stub';

import { HomeScreenService } from './home-screen.service';

describe('HomeScreenService', () => {
    let service: HomeScreenService;
    let rendererMock: Renderer2;
    let documentMock = {
        body: {},
    };
    let timerStateService: TimerStateService;

    beforeEach(() => {
        rendererMock = ({
            addClass: jest.fn(),
            removeClass: jest.fn(),
        } as unknown) as Renderer2;

        TestBed.configureTestingModule({
            providers: [
                {
                    provide: TimerStateService,
                    useClass: TimerStateServiceStub,
                },
                {
                    provide: Renderer2,
                    useValue: rendererMock,
                },
                {
                    provide: DOCUMENT,
                    useValue: documentMock,
                },
                HomeScreenService,
            ],
        });
        service = TestBed.inject(HomeScreenService);
        timerStateService = TestBed.inject(TimerStateService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('startBodyStyleUpdates()', () => {
        it('should add focus class to the body initially', () => {
            service.startBodyStyleUpdates();
            expect(rendererMock.addClass).toHaveBeenCalledWith(
                documentMock.body,
                'focus-body'
            );
        });

        it('should add focus class to the body when interval changes to focus type', () => {
            service.startBodyStyleUpdates();
            // clear initial addClass run
            (rendererMock.addClass as jest.Mock).mockClear();
            ((timerStateService as unknown) as TimerStateServiceStub).intervalType.next(
                IntervalType.Focus
            );
            expect(rendererMock.addClass).toHaveBeenCalledWith(
                documentMock.body,
                'focus-body'
            );
            expect(rendererMock.removeClass).toHaveBeenCalledWith(
                documentMock.body,
                'break-body'
            );
        });

        it('should add break class to the body when interval changes to break type', () => {
            service.startBodyStyleUpdates();
            // clear initial addClass run
            (rendererMock.addClass as jest.Mock).mockClear();
            ((timerStateService as unknown) as TimerStateServiceStub).intervalType.next(
                IntervalType.ShortBreak
            );
            expect(rendererMock.addClass).toHaveBeenCalledWith(
                documentMock.body,
                'break-body'
            );
            expect(rendererMock.removeClass).toHaveBeenCalledWith(
                documentMock.body,
                'focus-body'
            );

            (rendererMock.addClass as jest.Mock).mockClear();
            ((timerStateService as unknown) as TimerStateServiceStub).intervalType.next(
                IntervalType.LongBreak
            );
            expect(rendererMock.addClass).toHaveBeenCalledWith(
                documentMock.body,
                'break-body'
            );
            expect(rendererMock.removeClass).toHaveBeenCalledWith(
                documentMock.body,
                'focus-body'
            );
        });
    });

    describe('ngOnDestroy()', () => {
        it('should push undefined value to ubsubscribe subject and complete it', (done) => {
            (service as any).unsubscribe.subscribe(
                (val: undefined) => {
                    expect(val).toBeUndefined();
                },
                () => {},
                () => done()
            );
            service.ngOnDestroy();
        });
    });
});
