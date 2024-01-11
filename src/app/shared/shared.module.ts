import { NgModule } from '@angular/core';
import { LoadingWheelComponent } from './pages/loading-wheel/loading-wheel.component';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';



@NgModule({
  declarations: [
    LoadingWheelComponent,
    Error404PageComponent
  ],
  exports: [
    LoadingWheelComponent,
  ]
})
export class SharedModule { }
