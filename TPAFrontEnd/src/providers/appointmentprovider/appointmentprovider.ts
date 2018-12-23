import { Injectable } from '@angular/core';
import { Appointment } from "../../models/appointment";

@Injectable()
export class AppointmentProvider {

  setAppointments(appointments: Appointment[]) {
    localStorage.setItem('appointments', JSON.stringify(appointments))
  }

  addAppointment(appointment: Appointment) {
    var appointments = this.getAppointments();
    appointments.push(appointment);
    this.setAppointments(appointments);
  }

  getAppointments(): Appointment[] {
    return JSON.parse(localStorage.getItem('appointments'));
  }

  deleteAppointment(appointment: Appointment) {
    var appointments = this.getAppointments();
    var counter: number = 0;
    appointments.forEach(item => {
      if(item.id == appointment.id) {
        appointments.splice(counter, 1);
        this.setAppointments(appointments);
      }
      else
        counter++;
    })
  }

  updateAppointment(appointment: Appointment) {
    var appointments = this.getAppointments();
    var counter: number = 0;
    appointments.forEach(item => {
      if(item.id == appointment.id) {
        appointments[counter] = appointment;
        this.setAppointments(appointments);
      }
      else
        counter++;
    })
  }
}
