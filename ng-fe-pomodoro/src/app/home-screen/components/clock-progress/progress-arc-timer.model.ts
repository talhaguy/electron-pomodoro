import { ControlSignalType } from './progress-arc-timer.enum';

export interface DefaultControlSignal {
    type: ControlSignalType;
    data: {};
}

export interface ResetControlSignal {
    type: ControlSignalType;
    data: {
        endTime: number;
    };
}

export type ControlSignal = DefaultControlSignal | ResetControlSignal;

export interface Config {
    padding: number;
    backCircleColor: string;
    frontCircleColor: string;
    backgroundColor: string;
    debugTextColor: string;
    debugOn: boolean;
}

export interface ProgressCanvas {
    element: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    padding: number;
    centerY: number;
    centerX: number;
    radius: number;
    width: number;
    height: number;
}

export interface ArcConfig {
    lineWidth: number;
    strokeStyle: string;
    lineCap: CanvasLineCap;
}
