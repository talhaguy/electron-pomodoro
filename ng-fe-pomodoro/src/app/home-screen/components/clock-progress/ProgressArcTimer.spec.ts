import { ControlSignalType } from './progress-arc-timer.enum';
import { ProgressArcTimer } from './ProgressArcTimer';
import { twoDContext, canvasEle } from '../../../../test-support/mocks';

/**
 * Note, some of these tests are checking if something is drawn to the canvas
 * but not if it is visually correct. Those tests will be covered in the E2E
 * tests using screenshots.
 */

// TODO: In some of these tests I'm having to use `as any` to access private state
// to check some assertions. This probably indicates a refactoring is due.

describe('ProgressArcTimer', () => {
    const window = ({
        requestAnimationFrame: jest.fn(),
    } as unknown) as Window;

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('init', () => {
        it('should throw an error if canvas element does not exist', () => {
            expect(() => {
                const progressArcTimer = new ProgressArcTimer(
                    window,
                    null, // null is returned from querySelector
                    5000,
                    {},
                    0
                );
            }).toThrow();
        });

        it('should throw an error if canvas element does not have a width or if it is not a number', () => {
            // no width attribute
            let canvasEle = ({
                getAttribute: jest.fn().mockReturnValue(null),
            } as unknown) as HTMLCanvasElement;

            expect(() => {
                const progressArcTimer = new ProgressArcTimer(
                    window,
                    canvasEle,
                    5000,
                    {},
                    0
                );
            }).toThrow();

            // alphanumeric width
            canvasEle = ({
                getAttribute: jest.fn().mockReturnValue('bad'),
            } as unknown) as HTMLCanvasElement;

            expect(() => {
                const progressArcTimer = new ProgressArcTimer(
                    window,
                    canvasEle,
                    5000,
                    {},
                    0
                );
            }).toThrow();
        });

        it('should throw an error if canvas 2d context is not available', () => {
            // no 2d context
            let canvasEle = ({
                getAttribute: jest.fn().mockReturnValue('500'),
                getContext: jest.fn().mockReturnValue(null),
            } as unknown) as HTMLCanvasElement;

            expect(() => {
                const progressArcTimer = new ProgressArcTimer(
                    window,
                    canvasEle,
                    5000,
                    {},
                    0
                );
            }).toThrow();
        });

        it('should set config if one is passed in', () => {
            const setConfigSpy = jest.spyOn(
                ProgressArcTimer.prototype,
                'setConfig'
            );
            const config = {
                padding: 20,
            };
            const progressArcTimer = new ProgressArcTimer(
                window,
                canvasEle,
                5000,
                config,
                0
            );
            expect(setConfigSpy).toHaveBeenCalledWith(config);
        });
    });

    describe('setConfig()', () => {
        it('should set the config with only the properties given', () => {
            const progressArcTimer = new ProgressArcTimer(
                window,
                canvasEle,
                5000,
                {},
                0
            );

            const config = (progressArcTimer as any).config;
            const originalConfig = {
                ...(progressArcTimer as any).config,
            };
            progressArcTimer.setConfig({
                padding: 50,
                backCircleColor: 'blue',
            });
            const newConfig = {
                ...(progressArcTimer as any).config,
            };

            // check configs that should not have been altered
            for (const key in config) {
                if (key === 'padding' || key === 'backCircleColor') continue;
                expect(newConfig[key]).toBe(originalConfig[key]);
            }
            // check configs that should be altered
            expect(newConfig['padding']).toBe(50);
            expect(newConfig['backCircleColor']).toBe('blue');
        });
    });

    describe('setElapsedTime()', () => {
        it('should draw when the elapsed time is set and is not 0', () => {
            const progressArcTimer = new ProgressArcTimer(
                window,
                canvasEle,
                5000,
                {},
                0
            );

            twoDContext.arc.mockClear();
            progressArcTimer.setElapsedTime(1000);

            expect(twoDContext.arc).toHaveBeenCalled();
        });
    });

    describe('start()', () => {
        it('should not start animation if last signal was `Run`', () => {
            const progressArcTimer = new ProgressArcTimer(
                window,
                canvasEle,
                5000,
                {},
                0
            );

            // run one time to get last signal to `be Run`
            progressArcTimer.start();

            // now run start to verify that animation does not start
            (window.requestAnimationFrame as jest.Mock).mockClear();
            progressArcTimer.start();

            expect(window.requestAnimationFrame).not.toHaveBeenCalled();
        });

        it('should start animation', () => {
            const progressArcTimer = new ProgressArcTimer(
                window,
                canvasEle,
                5000,
                {},
                0
            );

            progressArcTimer.start();

            expect(window.requestAnimationFrame).toHaveBeenCalled();
        });
    });

    describe('animation', () => {
        it('should continue animation for control signal `Run` and stop it for `Pause` or `Reset`', () => {
            const progressArcTimer = new ProgressArcTimer(
                window,
                canvasEle,
                5000,
                {},
                0
            );

            (progressArcTimer as any).controlSignal = {
                type: ControlSignalType.Run,
                data: {},
            };
            expect(
                (progressArcTimer as any).requestAnimationFrameTasks(2000)
            ).toBeTruthy();

            (progressArcTimer as any).controlSignal = {
                type: ControlSignalType.Pause,
                data: {},
            };
            expect(
                (progressArcTimer as any).requestAnimationFrameTasks(2000)
            ).toBeFalsy();

            (progressArcTimer as any).controlSignal = {
                type: ControlSignalType.Reset,
                data: {
                    endTime: 5000,
                },
            };
            expect(
                (progressArcTimer as any).requestAnimationFrameTasks(2000)
            ).toBeFalsy();
        });

        it('should stop animation if time is elapsed', () => {
            const progressArcTimer = new ProgressArcTimer(
                window,
                canvasEle,
                5000,
                {},
                0
            );
            (progressArcTimer as any).elapsed = 5000;
            (progressArcTimer as any).controlSignal = {
                type: ControlSignalType.Run,
                data: {},
            };
            expect(
                (progressArcTimer as any).requestAnimationFrameTasks(5000)
            ).toBeFalsy();
        });
    });

    describe('pause()', () => {
        it('should set control signal to `Pause`', () => {
            const progressArcTimer = new ProgressArcTimer(
                window,
                canvasEle,
                5000,
                {},
                0
            );
            progressArcTimer.pause();
            expect((progressArcTimer as any).controlSignal.type).toBe(
                ControlSignalType.Pause
            );
        });
    });

    describe('reset()', () => {
        it('should set control signal to `Reset`', () => {
            const progressArcTimer = new ProgressArcTimer(
                window,
                canvasEle,
                5000,
                {},
                0
            );

            // pause first to set control signal as `Pause`
            progressArcTimer.pause();
            progressArcTimer.reset();

            expect((progressArcTimer as any).controlSignal.type).toBe(
                ControlSignalType.Reset
            );
        });
    });

    describe('degToRad()', () => {
        it('should convert degrees to radians', () => {
            const progressArcTimer = new ProgressArcTimer(
                window,
                canvasEle,
                5000,
                {},
                0
            );

            expect((progressArcTimer as any).degToRad(90).toFixed(4)).toBe(
                '1.5708'
            );
            expect((progressArcTimer as any).degToRad(180).toFixed(4)).toBe(
                '3.1416'
            );
            expect((progressArcTimer as any).degToRad(270).toFixed(4)).toBe(
                '4.7124'
            );
        });
    });
});
