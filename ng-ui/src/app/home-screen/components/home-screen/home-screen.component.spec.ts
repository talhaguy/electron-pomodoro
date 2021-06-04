import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HomeScreenServiceStub } from './home-screen.service.stub';
import { HomeScreenService } from './home-screen.service';

import { HomeScreenComponent } from './home-screen.component';

describe('HomeScreenComponent', () => {
    let component: HomeScreenComponent;
    let fixture: ComponentFixture<HomeScreenComponent>;
    let homeScreenService: HomeScreenService;
    let homeScreenServiceStub: HomeScreenServiceStub;
    let startBodyStyleUpdatesSpy: jest.SpyInstance;

    beforeEach(async () => {
        homeScreenServiceStub = new HomeScreenServiceStub();

        await TestBed.configureTestingModule({
            declarations: [HomeScreenComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
            // HomeScreenService is provided to the component
            // so we need to override the component providers,
            // NOT the module providers above.
            .overrideComponent(HomeScreenComponent, {
                set: {
                    providers: [
                        {
                            provide: HomeScreenService,
                            useValue: homeScreenServiceStub,
                        },
                    ],
                },
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeScreenComponent);
        component = fixture.componentInstance;
        // Get the HomeScreenService from the debug element,
        // NOT the TestBed since the service is provided directly
        // to the component.
        homeScreenService = fixture.debugElement.injector.get(
            HomeScreenService
        );
        startBodyStyleUpdatesSpy = jest.spyOn(
            homeScreenService,
            'startBodyStyleUpdates'
        );
        fixture.detectChanges();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('ngOnInit()', () => {
        it('should start body style updates', () => {
            expect(startBodyStyleUpdatesSpy).toHaveBeenCalledTimes(1);
        });
    });
});
