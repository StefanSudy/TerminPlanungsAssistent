import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Appointment } from '../../models/appointment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class APIService {
  baseUrl:string = "https://localhost:5001/api";

  constructor(private httpClient : HttpClient) { }

  public GetAppointmentsForUser(userId: number): Observable<Appointment[]> {
    return this.httpClient.get(this.baseUrl + '/appointments/' + userId)
    .map((appointments: Appointment[]) => {
      return appointments.map((appointment) => new Appointment(appointment));
    });
  }
  public PostAppointment(appointment: Appointment): Observable<Appointment> {
    return this.httpClient.post(this.baseUrl + '/appointments/', appointment)
    .map(response => { 
      return new Appointment(response)
    });
  }
  public PutAppointment(id: number, appointment: Appointment): Observable<Appointment> {
    return this.httpClient.put(this.baseUrl + '/appointments/' + id, appointment)
    .map((response) => {
      return new Appointment(response)
    });
  }
  public DeleteAppointment(id: number) {
    return this.httpClient.delete(this.baseUrl + '/appointments/' + id);
  }
}