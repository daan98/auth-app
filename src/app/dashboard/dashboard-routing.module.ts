import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './pages/dashboard-layout/dashboard-layout.component';
import { NewHeroPageComponent } from './pages/new-hero-page/new-hero-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { HeroComponent } from './pages/hero/hero.component';
import { isAuthenticatedGuard } from '../auth/guards';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      { path: 'new-hero', component: NewHeroPageComponent, canActivate: [ isAuthenticatedGuard ] },
      { path: 'search', component: SearchPageComponent, canActivate: [ isAuthenticatedGuard ] },
      { path: 'edit/:id', component: NewHeroPageComponent, canActivate: [ isAuthenticatedGuard ] },
      { path: 'list', component: ListPageComponent, canActivate: [ isAuthenticatedGuard ] },
      { path: ':id', component: HeroComponent, canActivate: [ isAuthenticatedGuard ] },
      { path: '**', redirectTo: 'list' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
