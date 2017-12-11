import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MzParallaxModule,
  MzNavbarModule,
  MzNavbarItemContainerComponent,
  MzButtonModule,
  MzSelectModule,
  MzInputModule,
  MzCardModule,
  MzModalModule,
  MzCollapsibleModule      

} from 'ng2-materialize'


@NgModule({
  imports: [
    CommonModule,
    MzParallaxModule,
    MzNavbarModule,
    MzButtonModule,
    MzSelectModule,
    MzInputModule,
    MzCardModule,
    MzModalModule,
    MzCollapsibleModule  
  ],
  exports: [
    MzParallaxModule,
    MzNavbarModule,
    MzButtonModule,
    MzSelectModule,
    MzInputModule,
    MzCardModule,
    MzModalModule,
    MzCollapsibleModule 
   
  ]
})
export class MaterializeModule { }
