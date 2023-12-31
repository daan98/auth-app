import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingWheelComponent } from './loading-wheel/loading-wheel.component';



@NgModule({
  declarations: [
    LoadingWheelComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoadingWheelComponent
  ]
})
export class SharedModule { }
