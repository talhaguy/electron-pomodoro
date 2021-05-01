import { InjectionToken } from '@angular/core';

export const WINDOW = new InjectionToken<Window | null>('Window', {
    factory: () => (window ? window : null),
});
