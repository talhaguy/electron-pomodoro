import { TimePipe } from './time.pipe';

describe('TimePipe', () => {
    it('create an instance', () => {
        const pipe = new TimePipe();
        expect(pipe).toBeTruthy();
    });

    fit('should format seconds to digital clock time', () => {
        const pipe = new TimePipe();

        let result = pipe.transform(5);
        expect(result).toBe('00:05');

        result = pipe.transform(30);
        expect(result).toBe('00:30');

        result = pipe.transform(60);
        expect(result).toBe('01:00');

        result = pipe.transform(1234);
        expect(result).toBe('20:34');

        result = pipe.transform(456);
        expect(result).toBe('07:36');
    });
});
