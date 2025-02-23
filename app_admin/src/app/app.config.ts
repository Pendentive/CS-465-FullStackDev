import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withJsonpSupport, withInterceptorsFromDi } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';

import { routes } from './app.routes';
import { authInterceptProvider } from './shared/utils/jwt.interceptor';
import { AuthGuard } from './guards/auth.guard';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from './material/material.module';

import { LayoutModule } from './layout/layout.module';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(withJsonpSupport(), withInterceptorsFromDi()),
    authInterceptProvider, 
    provideAnimationsAsync(),
    importProvidersFrom(MaterialModule, LayoutModule),
    AuthGuard,
  ],
};
