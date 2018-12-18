import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserProvider {
  private user: User;
  constructor(public http: HttpClient) {
    this.user = new User();
  }
  public setUser(user: User) {
    this.user = user;
    localStorage.setItem('access_token', user.token);
    localStorage.setItem('user_id', user.id.toString());
  }
  public getUser() {
     return this.user;
  }
}
