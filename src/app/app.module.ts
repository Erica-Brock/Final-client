import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SigninComponent } from './views/signin/signin.component';
import { UserComponent } from './views/user/user.component';
import { MatchingComponent } from './views/matching/matching.component';
import { SearchComponent } from './forms/search/search.component';
import { OktaService } from './services/okta.service';
import { ProfileComponent } from './views/profile/profile.component';

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
  }
]
import { MapComponent } from './map/map.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    UserComponent,
    MatchingComponent,
    SearchComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    MapComponent,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyCD9OJOP9rkatl5IE0F42UjystaJYS-rBI',
      libraries: [
        'places'
      ]
    }),
  ],
  providers: [OktaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
