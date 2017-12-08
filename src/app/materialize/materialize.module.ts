import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MzParallaxModule,
  MzNavbarModule,
  MzNavbarItemContainerComponent,
  MzButtonModule,
  MzSelectModule,
  MzInputModule,
  MzCardModule

} from 'ng2-materialize'


@NgModule({
  imports: [
    CommonModule,
    MzParallaxModule,
    MzNavbarModule,
    MzButtonModule,
    MzSelectModule,
    MzInputModule,
    MzCardModule
  ],
  exports: [
    MzParallaxModule,
    MzNavbarModule,
    MzButtonModule,
    MzSelectModule,
    MzInputModule,
    MzCardModule
   
  ]
})
export class MaterializeModule { }
