import { Component, computed, inject } from '@angular/core';

import { AuthService } from 'src/app/auth/services/auth.service';
import { ToolbarItemsInterface } from 'src/app/shared/interfaces';

@Component({
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent {

  public toolbarItems : Array<ToolbarItemsInterface> = [
    { label: 'See all', icon: 'list', url: '/heroes/list' },
    { label: 'Search', icon: 'search', url: '/heroes/search' },
    { label: 'Add', icon: 'add', url: '/heroes/new-hero' },
  ];

  public authService = inject( AuthService );
  public authUser = computed( () => this.authService.currenUser() );
  
  public logout()  {
    this.authService.logout();
  }
}