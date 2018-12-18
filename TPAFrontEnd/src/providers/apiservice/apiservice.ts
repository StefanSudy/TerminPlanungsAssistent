import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Appointment } from '../../models/appointment';
import { User } from '../../models/user';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

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
    });
  }
  public PostAppointment(appointment: Appointment): Observable<Appointment> {
    return this.httpClient.post(this.baseUrl + '/appointments/', appointment, { 
      headers: new HttpHeaders("Authorization: Bearer " + localStorage.getItem('access_token'))
    })
    .map(response => { 
      return new Appointment(response)
    });
  }
  public PutAppointment(id: number, appointment: Appointment): Observable<Appointment> {
    return this.httpClient.put(this.baseUrl + '/appointments/' + id, appointment, { 
      headers: new HttpHeaders("Authorization: Bearer " + localStorage.getItem('access_token'))
    })
    .map((response) => {
      return new Appointment(response)
    });
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
    });
  }
  public PostUser(user: User)
  {
    return this.httpClient.post(this.baseUrl + '/user/', user)
    .map(response => {
      return new User(response);
    })
  }
}