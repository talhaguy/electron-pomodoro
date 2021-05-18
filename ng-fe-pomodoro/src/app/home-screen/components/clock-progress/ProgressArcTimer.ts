import { ControlSignalType } from './progress-arc-timer.enum';
import {
    ArcConfig,
    Config,
    ControlSignal,
    ProgressCanvas,
    ResetControlSignal,
} from './progress-arc-timer.model';

export class ProgressArcTimer {
    private lastTimeStamp: number | null = null;
    private elapsed = 0;
    private endTime = 1000;

    private controlSignal: ControlSignal = {
        type: ControlSignalType.Reset,
        data: {
            endTime: null,
        },
    };

    private config: Config = {
        padding: 20,
        backCircleColor: 'lightgray',
        frontCircleColor: 'black',
        backgroundColor: 'transparent',
        progressLineWidth: 10,
        debugTextColor: 'black',
        debugOn: false,
    };

    private progressCanvas: ProgressCanvas;

    constructor(
        private win: Window,
        canvasEle: HTMLCanvasElement,
        endTime: number,
        config: Partial<Config> = {},
        elapsed: number = 0
    ) {
        if (!canvasEle) {
            throw new Error('Could not find canvas element.');
        }

        const canvasWidthAttr = canvasEle.getAttribute('width');
        if (canvasWidthAttr === null) {
            throw new Error('Could not find canvas width attribute.');
        }
        if (canvasWidthAttr.match(/\d+/) === null) {
            throw new Error('Canvas width is not a number.');
        }

        this.setConfig(config);

        const ctx = canvasEle.getContext('2d');
        if (!ctx) {
            throw new Error('Could not get 2d canvas context.');
        }

        this.progressCanvas = {
            element: canvasEle,
            ctx,
            padding: this.config.padding,
            centerY: canvasEle.height / 2,
            centerX: canvasEle.width / 2,
            radius: (canvasEle.width - this.config.padding * 2) / 2,
            width: canvasEle.width,
            height: canvasEle.width, // Intentionally only considering width to keep size square
        };
        this.elapsed = elapsed;
        this.endTime = endTime;

        this.drawProgress(0);
        this.drawDebug();
    }

    public setConfig(config: Partial<Config> = {}): void {
        // `storedConfig` as any avoids type assertion errors
        const storedConfig = this.config as any;
        for (const key in storedConfig) {
            const value = config[key as keyof Config];
            if (typeof value !== 'undefined') {
                storedConfig[key] = value;
            }
        }
    }

    public setElapsedTime(time: number) {
        this.elapsed = time;
        const percentDone = this.elapsed / this.endTime;
        this.drawProgress(percentDone);
        this.drawDebug();
    }

    private drawArc(
        startAngle: number,
        endAngle: number,
        config: Partial<ArcConfig> = {}
    ): void {
        const defaultConfig: ArcConfig = {
            lineWidth: this.config.progressLineWidth,
            strokeStyle: this.config.frontCircleColor,
            lineCap: 'round',
        };
        this.progressCanvas.ctx.lineWidth =
            config.lineWidth || defaultConfig.lineWidth;
        this.progressCanvas.ctx.strokeStyle =
            config.strokeStyle || defaultConfig.strokeStyle;
        this.progressCanvas.ctx.lineCap =
            config.lineCap || defaultConfig.lineCap;

        this.progressCanvas.ctx.beginPath();
        // Drawing by default starts at the 90deg mark. The angle minus 90 offsets this to start from the 0deg mark.
        this.progressCanvas.ctx.arc(
            this.progressCanvas.centerX,
            this.progressCanvas.centerY,
            this.progressCanvas.radius,
            this.degToRad(startAngle - 90),
            this.degToRad(endAngle - 90)
        );
        this.progressCanvas.ctx.stroke();
        this.progressCanvas.ctx.closePath();
    }

    private drawBackground(): void {
        this.progressCanvas.ctx.fillStyle = this.config.backgroundColor;
        this.progressCanvas.ctx.fillRect(
            0,
            0,
            this.progressCanvas.width,
            this.progressCanvas.height
        );
    }

    private drawProgress(percentComplete: number): void {
        const degrees = percentComplete * 360;

        this.progressCanvas.ctx.clearRect(
            0,
            0,
            this.progressCanvas.width,
            this.progressCanvas.height
        );

        // Don't draw any progress for 0% complete
        if (percentComplete === 0) return;

        // background
        this.drawBackground();

        // back circle
        this.drawArc(0, 360, { strokeStyle: this.config.backCircleColor });

        // front circle
        this.drawArc(0, degrees, {
            strokeStyle: this.config.frontCircleColor,
        });
    }

    private requestAnimationFrameTasks(timeStamp: number): boolean {
        switch (this.controlSignal.type) {
            case ControlSignalType.Pause:
                this.lastTimeStamp = null;
                const percentDone = this.elapsed / this.endTime;
                this.drawProgress(percentDone);
                this.drawDebug();
                return false;
            case ControlSignalType.Reset:
                this.lastTimeStamp = null;
                this.elapsed = 0;
                if (
                    (this.controlSignal as ResetControlSignal).data.endTime !==
                    null
                ) {
                    this.endTime = (this
                        .controlSignal as ResetControlSignal).data.endTime;
                }
                this.drawProgress(0);
                this.drawDebug();
                return false;
            default:
                break;
        }

        if (this.lastTimeStamp === null) {
            this.lastTimeStamp = timeStamp;
        }

        this.elapsed += timeStamp - this.lastTimeStamp;
        this.lastTimeStamp = timeStamp;

        if (this.elapsed >= this.endTime) {
            this.controlSignal = {
                type: ControlSignalType.Reset,
                data: {
                    endTime: null,
                },
            };
            this.lastTimeStamp = null;
            this.elapsed = 0;
            this.drawProgress(0);
            this.drawDebug();
            return false;
        }

        const percentDone = this.elapsed / this.endTime;
        this.drawProgress(percentDone);
        this.drawDebug();

        return true;
    }

    private drawDebug(): void {
        if (!this.config.debugOn) return;

        this.progressCanvas.ctx.fillStyle = this.config.debugTextColor;
        this.progressCanvas.ctx.font = '20px serif';
        this.progressCanvas.ctx.fillText(`elapsed: ${this.elapsed}`, 20, 20);
        this.progressCanvas.ctx.fillText(
            `lastTimeStamp: ${this.lastTimeStamp}`,
            20,
            40
        );
        this.progressCanvas.ctx.fillText(`endTime: ${this.endTime}`, 20, 60);
        this.progressCanvas.ctx.fillText(
            `controlSignal: ${this.controlSignal.type}`,
            20,
            80
        );
    }

    private requestAnimationFrameCallback(timeStamp: number): void {
        const shouldContinue = this.requestAnimationFrameTasks(timeStamp);

        if (shouldContinue) {
            // Must use arrow function as callback to preserve context
            this.win.requestAnimationFrame((timeStamp) =>
                this.requestAnimationFrameCallback(timeStamp)
            );
        }
    }

    public start(): void {
        if (this.controlSignal.type === ControlSignalType.Run) return;

        this.controlSignal = {
            type: ControlSignalType.Run,
            data: {},
        };

        // Must use arrow function as callback to preserve context
        this.win.requestAnimationFrame((timeStamp) =>
            this.requestAnimationFrameCallback(timeStamp)
        );
    }

    public pause(): void {
        this.controlSignal = {
            type: ControlSignalType.Pause,
            data: {},
        };
    }

    // If endTime is passed in, the total timer end time can be updated
    public reset(endTime: number | null = null): void {
        if (this.controlSignal.type === ControlSignalType.Pause) {
            this.lastTimeStamp = null;
            this.elapsed = 0;
            if (endTime !== null) {
                this.endTime = endTime;
            }
            this.controlSignal = {
                type: ControlSignalType.Reset,
                data: {
                    endTime,
                },
            };
            this.drawProgress(0);
            this.drawDebug();
            return;
        }

        this.controlSignal = {
            type: ControlSignalType.Reset,
            data: {
                endTime,
            },
        };

        if (endTime !== null) {
            this.endTime = endTime;
        }
    }

    private degToRad(deg: number): number {
        return (Math.PI * deg) / 180;
    }
}
