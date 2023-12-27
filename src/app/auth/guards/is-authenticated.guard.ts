import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatusEnum, AuthUrlEnum, LocalStorageItemEnum } from '../enum';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject( AuthService );
  const router      = inject( Router );
  const url         = state.url;

  localStorage.setItem(LocalStorageItemEnum.url, url);
  /* const possibleUrls = AuthUrlEnum;
  console.log({url}, {possibleUrls});
  console.log('possible urls entries: ', Object.values(possibleUrls));
  console.log(Object.values(possibleUrls).find((actualUrl) => actualUrl === url))

  if(Object.values(possibleUrls).find((actualUrl) => actualUrl === url)) */

  if(authService.authStatus() === AuthStatusEnum.authenticated) {
    return true;
  }

  router.navigateByUrl(AuthUrlEnum.login);
  return false;
};
