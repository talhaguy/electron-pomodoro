import { TestBed } from '@angular/core/testing';
import { SaveData } from '@app/shared';
import { of, throwError } from 'rxjs';
import { StorageService } from 'src/app/shared/services/storage.service';
import { StorageServiceStub } from 'src/app/shared/services/storage.service.stub';
import { TimerStateService } from 'src/app/shared/services/timer-state.service';
import { TimerStateServiceStub } from 'src/app/shared/services/timer-state.service.stub';

import { SavedDataResolver } from './saved-data.resolver';

describe('SavedDataResolver', () => {
    let resolver: SavedDataResolver;
    let storageService: StorageService;
    let timerStateService: TimerStateService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: StorageService,
                    useClass: StorageServiceStub,
                },
                {
                    provide: TimerStateService,
                    useClass: TimerStateServiceStub,
                },
            ],
        });
        resolver = TestBed.inject(SavedDataResolver);
        storageService = TestBed.inject(StorageService);
        timerStateService = TestBed.inject(TimerStateService);
    });

    it('should be created', () => {
        expect(resolver).toBeTruthy();
    });

    describe('resolve()', () => {
        it('should update state with saved data and return true if saved data was gotten successfully', (done) => {
            const savedData: SaveData = {
                intervalsCompleted: 3,
            };
            jest.spyOn(storageService, 'getData').mockReturnValue(
                of(savedData)
            );
            const setNumIntervalsCompleteaSpy = jest.spyOn(
                timerStateService,
                'setNumIntervalsCompleted'
            );

            resolver.resolve().subscribe((wasSuccessful) => {
                expect(setNumIntervalsCompleteaSpy).toHaveBeenCalledWith(
                    savedData.intervalsCompleted
                );
                expect(wasSuccessful).toBeTruthy();
                done();
            });
        });

        it('should return false if saved data was NOT gotten successfully', (done) => {
            jest.spyOn(storageService, 'getData').mockReturnValue(
                throwError(Error('Some error'))
            );

            resolver.resolve().subscribe((wasSuccessful) => {
                expect(wasSuccessful).toBeFalsy();
                done();
            });
        });
    });
});
