import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class SigninService {
  static api: string= '/api/auth'
  user: any;
  returnUrl: string;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe((params) => {
        console.log(params);
        this.refreshUser = params.refreshUrl;
      });
  }

  login(user: {email: string, password: string} ){
    return this.http
      .post(`${SigninService.api}/login`, user)
      .toPromise()
      .then((user) => {
        this.user = user;
        this.router.navigate(['/']);
      }); 
  }

  me() {
    return Promise.resolve(this.user);
  }

  setMe(me) {
    console.log(me);
    this.user = me;
  }

  refreshUser() {
    return this.http.get(`${SigninService.api}/refresh`)
      .toPromise();
  }

  test() {
    return this.http.get(`${SigninService.api}/test`);
  }
}
