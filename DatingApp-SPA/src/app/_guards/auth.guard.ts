// import { CanActivateFn } from '@angular/router';
// import { inject } from '@angular/core';
// import { AuthService } from '../_services/auth.service';
// import { AlertifyService } from '../_services/alertify.service';
// import { Router } from '@angular/router';

// export const authGuard: CanActivateFn = (route, state) => {
//   const authService = inject(AuthService);
//   const alertify = inject(AlertifyService);
//   const router = inject(Router);

//   if (authService.loggedIn()) {
//     return true;
//   }

//   alertify.error('You shall not pass!');
//   router.navigate(['/home']);
//   return false;
// };

// File: _guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  canActivate(): boolean {
    if (this.authService.loggedIn()) {
      return true;
    }

    this.alertify.error('You shall not pass!');
    this.router.navigate(['/home']);
    return false;
  }
}
