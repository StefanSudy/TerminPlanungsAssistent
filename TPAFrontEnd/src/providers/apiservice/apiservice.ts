import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs/Observable';
import { Appointment } from '../../models/appointment';
import { User } from '../../models/user';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class APIService {
  baseUrl:string = "https://localhost:5001/api";

  constructor(private httpClient : HttpClient) { }

  //Appointments Calls
  public GetAppointmentsForUser(userId: number): Observable<Appointment[]> {
    return this.httpClient.get(this.baseUrl + '/appointments/' + userId, { 
      headers: new HttpHeaders("Authorization: Bearer " + localStorage.getItem('access_token'))
    })
    .map((appointments: Appointment[]) => {
      return appointments.map((appointment) => new Appointment(appointment));
    })
    .catch((error: any) => Observable.throw(this.errorHandler(error)));
  }
  public PostAppointment(appointment: Appointment): Observable<Appointment> {
    return this.httpClient.post(this.baseUrl + '/appointments/', appointment, { 
      headers: new HttpHeaders("Authorization: Bearer " + localStorage.getItem('access_token'))
    })
    .map(response => { 
      return new Appointment(response)
    })
    .catch((error: any) => Observable.throw(this.errorHandler(error)));;
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
  public DeleteAppointment(id: number) {
    return this.httpClient.delete(this.baseUrl + '/appointments/' + id, { 
      headers: new HttpHeaders("Authorization: Bearer " + localStorage.getItem('access_token'))
    });
  }

  //User calls
  public PostValidateUser(eMail: string, password: string, active: boolean){
    return this.httpClient.post(this.baseUrl + '/user/authenticate/', { eMail, password, active })
    .map(response => {
      return new User(response);
    })
    .catch((error: any) => Observable.throw(this.errorHandler(error)));;
  }
  public PostUser(user: User)
  {
    return this.httpClient.post(this.baseUrl + '/user/register/', user)
    .map(response => {
      return new User(response);
    })
    .catch((error: any) => Observable.throw(this.errorHandler(error)));
  }

  errorHandler(error): void {
    console.log(error);
  }
}