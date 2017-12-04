import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SigninComponent } from './views/signin/signin.component';
import { UserComponent } from './views/user/user.component';
import { MatchingComponent } from './views/matching/matching.component';
import { SearchComponent } from './forms/search/search.component';
import { OktaService } from './services/okta.service';
import { MapComponent } from './map/map.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    UserComponent,
    MatchingComponent,
    SearchComponent,
    MapComponent
  ],
  imports: [
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
