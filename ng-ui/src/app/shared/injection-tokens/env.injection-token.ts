import { InjectionToken } from '@angular/core';
import { environment } from 'src/environments/environment';

export type EnvMap = typeof environment;

export const Env = new InjectionToken<EnvMap>('Env', {
    factory: () => environment,
});
