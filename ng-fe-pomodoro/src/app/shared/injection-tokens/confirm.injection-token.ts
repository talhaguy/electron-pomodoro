import { InjectionToken } from '@angular/core';
import { environment } from '../../../environments/environment';

export type WindowConfirm = (message?: string) => boolean;

export const Confirm = new InjectionToken<WindowConfirm>('Confirm', {
    factory: () => {
        if (environment.e2e) return () => true;
        return window ? window.confirm : () => false;
    },
});
