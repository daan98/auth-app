import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatusEnum, AuthUrlEnum } from '../enum';

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router      = inject(Router);
  const url         = state.url;

  if(authService.authStatus() === AuthStatusEnum.authenticated) {
    router.navigateByUrl(AuthUrlEnum.dashboard);
    return false;
  }
  
  return true;
};
