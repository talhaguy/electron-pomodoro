import { TestBed } from '@angular/core/testing';
import { take } from 'rxjs/operators';
import { Command } from './clock-progress-controller.enum';

import { ClockProgressControllerService } from './clock-progress-controller.service';

describe('ClockProgressControllerService', () => {
    let service: ClockProgressControllerService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ClockProgressControllerService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    // testing these two methods together as there is no public property to test for just initting
    describe('initController() & isInitialized()', () => {
        it('should initialize internal state', () => {
            service.initController('first');
            service.initController('second');

            expect(service.isInitialized('first')).toBeTruthy();
            expect(service.isInitialized('second')).toBeTruthy();
            expect(service.isInitialized('third')).toBeFalsy();
        });

        it('should throw an error when attempting to initialize the same id', () => {
            service.initController('first');
            expect(() => service.initController('first')).toThrow();
        });
    });

    describe('deinitController()', () => {
        it('should deinitialize internal state', () => {
            service.initController('first');
            expect(service.isInitialized('first')).toBeTruthy();
            service.deinitController('first');
            expect(service.isInitialized('first')).toBeFalsy();
        });
    });

    // part of getObservable() is tested here as it is the means check internal state
    describe('start() & getObservable()', () => {
        it('should send a start command to the observable of the given ID', (done) => {
            service.initController('first');
            service
                .getObservable('first')
                .pipe(take(1))
                .subscribe(
                    (command) => expect(command).toBe(Command.Start),
                    () => {},
                    () => done()
                );
            service.start('first');
        });

        it('should throw an error when trying to get a non-existent id', () => {
            expect(() => service.start('non-existent')).toThrow();
        });
    });

    describe('pause()', () => {
        it('should send a pause command to the observable of the given ID', (done) => {
            service.initController('first');
            service
                .getObservable('first')
                .pipe(take(1))
                .subscribe(
                    (command) => expect(command).toBe(Command.Pause),
                    () => {},
                    () => done()
                );
            service.pause('first');
        });

        it('should throw an error when trying to get a non-existent id', () => {
            expect(() => service.pause('non-existent')).toThrow();
        });
    });

    describe('reset()', () => {
        it('should send a reset command to the observable of the given ID', (done) => {
            service.initController('first');
            service
                .getObservable('first')
                .pipe(take(1))
                .subscribe(
                    (command) => expect(command).toBe(Command.Reset),
                    () => {},
                    () => done()
                );
            service.reset('first');
        });

        it('should throw an error when trying to get a non-existent id', () => {
            expect(() => service.reset('non-existent')).toThrow();
        });
    });

    // the happy path is tested above
    describe('getObservable()', () => {
        it('should throw an error when trying to get a non-existent id', () => {
            expect(() => service.getObservable('non-existent')).toThrow();
        });
    });
});
