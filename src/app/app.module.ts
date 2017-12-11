import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppComponent } from './app.component';
import { SigninComponent } from './views/signin/signin.component';
import { UserComponent } from './views/user/user.component';
import { MatchingComponent } from './views/matching/matching.component';
import { SearchComponent } from './forms/search/search.component';
import { ProfileComponent } from './views/profile/profile.component';
import { MapComponent } from './map/map.component';
import { AgmCoreModule } from '@agm/core';
import { JobComponent } from './views/job/job.component';
import { ReviewsService } from './services/reviews.service'
import { JobsService } from "./services/jobs.service";
import { UsersService } from './services/users.service';
import { SkillsService } from './services/skills.service'
import { HttpModule } from '@angular/http';
import { PaymentComponent } from './views/payment/payment.component';
import { LoginformComponent } from './forms/loginform/loginform.component';
import { SigninService } from './services/signin/signin.service';
import { InfoComponent } from './views/info/info.component';
import {MaterializeModule} from './materialize/materialize.module';
import { UsersComponent } from './views/search/users/users.component';
import { JobsComponent } from './views/search/jobs/jobs.component';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { ChatComponent } from './views/chat/chat.component';
import { ChatService } from './services/chat/chat.service';



const routes: Routes = [

  {
    path: '', 
    redirectTo: "signin",
    pathMatch: 'full' 
  },
  {
    path: "info",
    component: InfoComponent
  },
  {
    path: "signin",
    component: SigninComponent
  },
  {
    path: "search",
    component: UsersComponent
  },
  {
    path: "jobsearch",
    component: JobsComponent
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
  },
  {
    path: "map",
    component: MapComponent
  },
  {
    path: "chat/:id",
    component: ChatComponent
  }
]

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

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
    PaymentComponent,
    LoginformComponent,
    InfoComponent,
    UsersComponent,
    JobsComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    MaterializeModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpModule,
    HttpClientModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [
    ReviewsService,
    UsersService, 
    JobsService,
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserModule,
    SigninService,
    ChatService,
    SkillsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
