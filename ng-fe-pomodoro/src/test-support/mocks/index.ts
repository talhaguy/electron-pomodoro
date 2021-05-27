export const twoDContext = {
    clearRect: jest.fn(),
    fillRect: jest.fn(),
    stroke: jest.fn(),
    strokePath: jest.fn(),
    fillText: jest.fn(),
    arc: jest.fn(),
    beginPath: jest.fn(),
    closePath: jest.fn(),
};

export const canvasEle = ({
    getAttribute: jest.fn().mockReturnValue('500'),
    getContext: jest.fn().mockReturnValue(twoDContext),
} as unknown) as HTMLCanvasElement;
