import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs/Observable';
import { Appointment } from '../../models/appointment';
import { User } from '../../models/user';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import { _throw } from 'rxjs/observable/throw';

@Injectable()
export class APIService {
  baseUrl:string = "https://192.168.1.206:443/api";

  constructor(private httpClient: HttpClient) { }

  //Appointments Calls
  public GetAppointmentsForUser(userId: number): Observable<Appointment[]> {
    return this.httpClient.get(this.baseUrl + '/appointments/' + userId, { 
      headers: new HttpHeaders("Authorization: Bearer " + localStorage.getItem('access_token'))
    }).pipe(map((appointments: Appointment[]) => {
      return appointments.map((appointment) => new Appointment(appointment));
    }));
  }
  public PostAppointment(appointment: Appointment): Observable<Appointment> {
    return this.httpClient.post(this.baseUrl + '/appointments/', appointment, { 
      headers: new HttpHeaders("Authorization: Bearer " + localStorage.getItem('access_token'))
    })
    .pipe(map((appointment: Appointment) => {
      return new Appointment(appointment);
    }));
  }
  public PutAppointment(id: number, appointment: Appointment): Observable<Appointment> {
    return this.httpClient.put(this.baseUrl + '/appointments/' + id, appointment, { 
      headers: new HttpHeaders("Authorization: Bearer " + localStorage.getItem('access_token'))
    })
    .map((response) => {
      return new Appointment(response)
    })
    .catch((error: any) => Observable.throw(this.errorHandler(error)));;
  }
  public DeleteAppointment(id: number, userId: number) {
    return this.httpClient.delete(this.baseUrl + '/appointments/' + id + '/' + userId, { 
      headers: new HttpHeaders("Authorization: Bearer " + localStorage.getItem('access_token'))
    });
  }

  //User calls
  public PostValidateUser(eMail: string, password: string, active: boolean){
    return this.httpClient.post(this.baseUrl + '/user/authenticate/', { eMail, password, active })
    .pipe(map((response: User) => {
      return new User(response);
    }));
    // .map(response => {
    //   return new User(response);
    // })
    // .catch((error: any) => Observable.throw(this.errorHandler(error)));;
  }
  public PostUser(user: User)
  {
    return this.httpClient.post(this.baseUrl + '/user/register/', user)
    .pipe(map(response => {
      return new User(response);
    }));
    // .map(response => {
    //   return new User(response);
    // })
    // .catch((error: any) => Observable.throw(this.errorHandler(error)));
  }

  errorHandler(error): void {
    console.log(error);
  }
}