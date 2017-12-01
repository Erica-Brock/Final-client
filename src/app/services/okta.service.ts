import { Injectable } from '@angular/core';
import * as OktaSignIn from '@okta/okta-signin-widget'

@Injectable()
export class OktaService {
  widget;

  constructor() { 
    this.widget = new OktaSignIn({
      baseUrl: 'https://dev-689730.oktapreview.com',
      clientId: '{0oad2kg6aamIRcNvV0h7}',
      redirectUri: 'http://localhost:4200'
    });
  }

  getWidget(){
    return this.widget;
  }

}
