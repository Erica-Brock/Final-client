import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SigninComponent } from './views/signin/signin.component';
import { UserComponent } from './views/user/user.component';
import { MatchingComponent } from './views/matching/matching.component';
import { SearchComponent } from './forms/search/search.component';
import { OktaService } from './services/okta.service';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    UserComponent,
    MatchingComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [OktaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
