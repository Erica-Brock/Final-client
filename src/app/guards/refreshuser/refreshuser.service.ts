import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/interfaces';
import { SigninService } from '../../services/signin/signin.service';

@Injectable()
export class RefreshuserService implements CanActivate {

  constructor(private svc: SigninService) { }

  canActivate() {
    return this.svc.refreshUser()
      .then((user) => {
        this.svc.setMe(user);
        return true;
      });
  }
}
