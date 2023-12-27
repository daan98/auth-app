import { Component, computed, inject } from '@angular/core';

import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent {
  public authService = inject( AuthService );
  public authUser = computed( () => this.authService.currenUser() );
  
  public logout()  {
    this.authService.logout();
  }
}