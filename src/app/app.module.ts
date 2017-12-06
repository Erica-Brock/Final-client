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
import { MapComponent } from './map/map.component';
import { AgmCoreModule } from '@agm/core';
import { JobComponent } from './views/job/job.component';
import { JobsService } from "./services/jobs.service";
import { UsersService } from './services/users.service';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PaymentComponent } from './views/payment/payment.component';


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
    path: "job/:id",
    component: JobComponent
  },
  {
    path: "payment",
    component: PaymentComponent
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
    JobComponent,
    PaymentComponent
   
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyCD9OJOP9rkatl5IE0F42UjystaJYS-rBI',
      libraries: [
        'places'
      ]
    }),
  ],
  providers: [OktaService, UsersService, JobsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
