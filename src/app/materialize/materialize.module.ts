import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MzParallaxModule,
  MzNavbarModule,
  MzNavbarItemContainerComponent,
  MzButtonModule

} from 'ng2-materialize'


@NgModule({
  imports: [
    CommonModule,
    MzParallaxModule,
    MzNavbarModule,
    MzButtonModule
  ],
  exports: [
    MzParallaxModule,
    MzNavbarModule,
    MzButtonModule
   
  ]
})
export class MaterializeModule { }
