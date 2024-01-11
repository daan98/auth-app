import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatusEnum, AuthUrlEnum, LocalStorageItemEnum } from '../enum';
import { tap } from 'rxjs';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject( AuthService );
  const router      = inject( Router );
  const url         = state.url;

  localStorage.setItem(LocalStorageItemEnum.url, url);

  if(authService.authStatus() === AuthStatusEnum.authenticated) {
    return true;
  }

  router.navigateByUrl(AuthUrlEnum.login);
  return false;
};

export const authGuardCanMatch: CanMatchFn = (route, state) => {
  const router = inject(Router)
  const authService = inject(AuthService);

  return authService.checkAuthStatus()
    .pipe(
      tap((isAunthenticated) => {
        if (!isAunthenticated) {
          router.navigate(['./auth/login']);
        }
      })
    );
};
