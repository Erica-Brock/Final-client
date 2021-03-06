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
import { RefreshuserService } from './guards/refreshuser/refreshuser.service';
import { NavbarComponent } from './views/navbar/navbar.component';
import { UserCardComponent } from './views/user-card/user-card.component';
import { HomeComponent } from './views/home/home.component';
import { CreateJobComponent } from './forms/create-job/create-job.component';

import { JobModalComponent } from './modals/job/job.component';
import { MzInjectionService } from 'ng2-materialize';
import { UpdateUserComponent } from './modals/updateuser/updateuser.component';
import { ReviewComponent } from './modals/review/review.component';
import { SignupComponent } from './views/signup/signup.component';


const routes: Routes = [
  {
    path: "info",
    component: InfoComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {path: '', canActivate:[ RefreshuserService ], children: [
    {
      path: '', 
      redirectTo: "home",
      pathMatch: 'full' 
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
    },
    {
      path:"home",
      component:HomeComponent
    }
  ]}
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
    ChatComponent,
    NavbarComponent,
    UserCardComponent,
    HomeComponent,
    CreateJobComponent,
    JobModalComponent,
    UpdateUserComponent,
    ReviewComponent,
    SignupComponent
  ],
  entryComponents: [
    JobModalComponent,
    ReviewComponent,
    UpdateUserComponent
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
    SkillsService,
    RefreshuserService,
    MzInjectionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
