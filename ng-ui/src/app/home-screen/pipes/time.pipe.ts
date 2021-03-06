import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'time',
})
export class TimePipe implements PipeTransform {
    transform(ms: number): string {
        const seconds = ms / 1000;
        const minutes = seconds / 60;
        const minutesOnly = Math.trunc(minutes);
        const secondsOnly = Math.round((minutes - minutesOnly) * 60);
        return `${this.prependZero(minutesOnly)}:${this.prependZero(
            secondsOnly
        )}`;
    }

    private prependZero(value: number) {
        return value < 10 ? '0' + value : value;
    }
}
