import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { InitService } from '../Core/services/init-service';
import { lastValueFrom } from 'rxjs';
import { errorInterceptor } from '../Core/interceptors/error-interceptor';
import { jwtInterceptor } from '../Core/interceptors/jwt-interceptor';
import { busyInterceptorInterceptor } from '../Core/interceptors/busy-interceptor-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes,withViewTransitions()),
    provideZonelessChangeDetection(),
    provideHttpClient(withInterceptors([errorInterceptor,jwtInterceptor,busyInterceptorInterceptor])),
    provideAppInitializer(async () => {
      const initService = inject(InitService);
      

      return new Promise<void>((resolve) => {
        setTimeout(async () => {
          try {
            return lastValueFrom(initService.init());
          } finally {
            const splash = document.getElementById('intial-splash');
            if (splash) {
              splash.remove();
            }
            resolve();
          }
        }, 500);
      });
    }),
  ],
};
