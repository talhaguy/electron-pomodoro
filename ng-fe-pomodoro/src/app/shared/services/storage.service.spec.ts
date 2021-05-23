import { TestBed } from '@angular/core/testing';
import { API, SaveData } from '@app/shared';
import { ApiToken } from '../injection-tokens/api.injection-token';

import { StorageService } from './storage.service';

describe('StorageServiceService', () => {
    let service: StorageService;

    const api: API = {
        storage: {
            getData: jest.fn().mockResolvedValue({ intervalsCompleted: 5 }),
            saveData: jest.fn().mockResolvedValue(undefined),
        },
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: ApiToken,
                    useValue: api,
                },
            ],
        });
        service = TestBed.inject(StorageService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('saveData()', () => {
        it('should save given data to storage', (done) => {
            const data: SaveData = {
                intervalsCompleted: 1,
            };

            service.saveData(data).subscribe(() => {
                expect(api.storage.saveData).toHaveBeenCalledWith(data);
                done();
            });
        });
    });

    describe('getData()', () => {
        it('should retrieve data from storage', (done) => {
            service.getData().subscribe((data) => {
                expect(api.storage.getData).toHaveBeenCalled();
                expect(data.intervalsCompleted).toBe(5);
                done();
            });
        });
    });
});
