import { ApplicationConfig, importProvidersFrom, Injectable, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { HAMMER_GESTURE_CONFIG, HammerGestureConfig } from '@angular/platform-browser';

export function tokenGetter(){
  return localStorage.getItem('token');
}
@Injectable()
export class CustomHammerConfig extends HammerGestureConfig{
  override overrides = {
    pinch: {enable: false},
    rotate: { enable: false}
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    ErrorInterceptorProvider,
    provideAnimations(),
    importProvidersFrom(
      JwtModule.forRoot({
        jwtOptionsProvider:{
          provide: JWT_OPTIONS,
          useFactory:() => ({
            tokenGetter,
            allowedDomains:['localhost:5011'],
            disallowedRoutes: ['http://localhost:5011/api/auth']
          }),
          deps:[]
        }
      })
    ),
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: CustomHammerConfig
    }
    ],
};
