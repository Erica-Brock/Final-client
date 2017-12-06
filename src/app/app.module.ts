import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'

import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { AppComponent } from './app.component';
import { SigninComponent } from './views/signin/signin.component';
import { UserComponent } from './views/user/user.component';
import { MatchingComponent } from './views/matching/matching.component';
import { SearchComponent } from './forms/search/search.component';
import { ProfileComponent } from './views/profile/profile.component';
import { MapComponent } from './map/map.component';
import { LoginformComponent } from './forms/loginform/loginform.component';
import { SigninService } from './services/signin/signin.service';


const routes: Routes = [

  {
    path: '', 
    redirectTo: "signin",
    pathMatch: 'full' 
  },
  {
    path: "signin",
    component: SigninComponent
  },
  {
    path: "users",
    component: UserComponent
  },
  {
    path: "profile/:id",
    component: ProfileComponent
  },
  {
    path: "map",
    component: MapComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    UserComponent,
    MatchingComponent,
    SearchComponent,
    MapComponent,
    ProfileComponent,
    LoginformComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserModule
  ],
    

  providers: [
    SigninService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
