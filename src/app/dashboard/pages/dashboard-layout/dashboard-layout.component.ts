import { Component, computed, inject } from '@angular/core';

import { AuthService } from 'src/app/auth/services/auth.service';
import { ToolbarItemsInterface } from 'src/app/shared/interfaces';

@Component({
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent {

  public toolbarItems : Array<ToolbarItemsInterface> = [
    { label: 'See all', icon: 'list', url: '/dashboard/list' },
    { label: 'Search', icon: 'search', url: '/dashboard/search' },
    { label: 'Add', icon: 'add', url: '/dashboard/new-hero' },
  ];

  public authService = inject( AuthService );
  public authUser = computed( () => this.authService.currenUser() );
  
  public logout()  {
    this.authService.logout();
  }
}