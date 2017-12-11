import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/interfaces';
import { SigninService } from '../../services/signin/signin.service';
import { Router } from '@angular/router';

@Injectable()
export class RefreshuserService implements CanActivate {

  constructor(
    private svc: SigninService,
    private router: Router) {

  }

  canActivate() {
    return this.svc.refreshUser()
      .then((user) => {
        this.svc.setMe(user);
        return true;
      }, (err) => {
        this.router.navigate(['/info']);
        return false;
      });
  }
}
