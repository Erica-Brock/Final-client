import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MzParallaxModule} from 'ng2-materialize';
import { RouterModule } from '@angular/router';
import {InfoComponent} from './info.component'


@NgModule({
  imports: [
    CommonModule,
    MzParallaxModule
    
  ],
  declarations: [InfoComponent]
})
export class infoModule { }
