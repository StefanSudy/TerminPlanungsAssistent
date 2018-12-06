import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AppointmentProvider {
  apiUrl = 'https://localhost:5001/api';
  constructor(public http: HttpClient) {
    console.log('Hello AppointmentProvider Provider');
  }
  getAppointmentsForUser(id) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/appointment/'+id).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  addAppointment(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'/appointment', JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
}