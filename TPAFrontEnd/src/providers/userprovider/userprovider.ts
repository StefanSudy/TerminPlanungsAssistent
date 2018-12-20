import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user';

@Injectable()
export class UserProvider {
  private user: User;
  constructor(public http: HttpClient) {
    this.user = new User();
  }
  public setUser(user: User) {
    this.user = user;
  }
  public getUser() {
     return this.user;
  }
}
