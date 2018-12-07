import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
//import { User } from '../../models/user';
import { Appointment } from '../../models/appointment';

@Injectable()
export class APIService {
  baseUrl:string = "https://localhost:5001/api";

  constructor(private httpClient : HttpClient) { }

  public getAppointmentsForUser(userId: number): Observable<Appointment[]> {
    return this.httpClient
      .get(this.baseUrl + '/appointments/' + userId)
      .map((appointments: Appointment[]) => {
        return appointments.map((appointment) => new Appointment(appointment));
      });
      // .catch((err: any)=>{
      //   return Observable.throw(err.statusText);
      // });
  }

  // public getUser(userId: number): Observable<User> {
  //   return this.httpClient
  //     .get(this.baseUrl + '/user/' + userId)
  //     .map(response => {
  //       return new User(response);
  //     })
  //     .catch((err)=>{
  //         console.error(err);
  //     });
  // }
}