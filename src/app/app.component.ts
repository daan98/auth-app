import { Component, computed, effect, inject } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { AuthStatusEnum, AuthUrlEnum, LocalStorageItemEnum } from './auth/enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private authService = inject(AuthService);
  private router      = inject(Router);

  public finishedAuthCheck = computed<boolean>(() => {
    if(this.authService.authStatus() === AuthStatusEnum.checking) {
      return false;
    }

    return true;
  });

  public authStatusChangedEffect = effect(() => {
    switch(this.authService.authStatus()) {
      case AuthStatusEnum.checking:
      break;

      case AuthStatusEnum.authenticated:
        // CHECKING LAST URL VISITED
        const url = localStorage.getItem(LocalStorageItemEnum.url) ? localStorage.getItem(LocalStorageItemEnum.url) : AuthUrlEnum.dashboard;
        if(url) {
          this.router.navigateByUrl(url);
        }
      break;

      case AuthStatusEnum.notAuthenticated:
        this.router.navigateByUrl(AuthUrlEnum.login);
      break;

      default:
        this.router.navigateByUrl(AuthUrlEnum.login);
      break;
    }
  })
}
