import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";

@Injectable()
export class AuthService implements CanActivate {
  private token = ''

  constructor(private http: HttpClient, private router: Router) { }

  login(username, password): Promise<boolean> {
    // write a call to the backend
    // examine the status code
    this.token = ''
    return this.http.post<any>('http://localhost:3000/login',
        { username, password }, { observe: 'response' }
      ).toPromise()
      .then(resp => {
        if (resp.status == 200) {
          this.token = resp.body.token
        }
        console.info('resp: ', resp)
        return true
      })
      .catch(err => {
        if (err.status == 401) {
          // handle error
        }
        console.info('err:', err)
        return false
      })
  }

  isLogin() {
    return this.token != ''
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.isLogin())
      return true
    return this.router.parseUrl('/error')
  }
}
