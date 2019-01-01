import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ViewItemPage } from '../view-item/view-item';
import moment from 'moment';
//Api-Services
import { APIService } from '../../providers/apiservice/apiservice';
import { Appointment } from '../../models/appointment';
import { AppointmentProvider } from '../../providers/appointmentprovider/appointmentprovider';
//import { User } from '../../models/user';
/**
 * Generated class for the CalendarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage {
  eventSource = [];
  viewTitle: string;
  selectedDay = new Date();
  public currentItems: any = [];
 
  calendar = {
    mode: 'month',
    currentDate: new Date(),
    locale: 'de-AT'
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController, public restProvider: APIService, public appointmentProvider: AppointmentProvider) {
  }

  addEvent() {
    let modal = this.modalCtrl.create('EventModalPage', {selectedDay: this.selectedDay});
    modal.present();
    modal.onDidDismiss(answer => {
      if (answer) {
        this.appointmentProvider.addAppointment(answer);
        this.currentItems.push(answer);
        let events = this.eventSource;
        let endTime = moment(answer.dateDue).add(answer.duration, 'minutes').format();
        this.eventSource = [];
        events.push({
          title: new String(answer.entryName),
          startTime: new Date(answer.dateDue),
          endTime: new Date(endTime),
          allDay: false,
          id: answer.id
        });
        setTimeout(() => {
          this.eventSource = events;
        });
      }
      
    });
  }
 
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
 
  onEventSelected(event) {
    this.currentItems = this.appointmentProvider.getAppointments();
    // this.restProvider.GetAppointmentsForUser(+localStorage.getItem('user_id')).subscribe((currentItems : Appointment[]) => {
    //   this.currentItems=currentItems;
    // });    
    for(let item of this.currentItems){
      if(item.id == event.id && event.id != null){ //Nur das gerade ausgewählte Element und wenn es in der Datenbank gefunden wurde.
        this.navCtrl.push(ViewItemPage, {
          currentItem: item
        });
      }
    }
  }
 
  onTimeSelected(ev) {
    this.selectedDay = ev.selectedTime;
    
  }

  ionViewWillEnter() {
    this.currentItems = this.appointmentProvider.getAppointments();
    // this.restProvider.GetAppointmentsForUser(+localStorage.getItem('user_id'))
    // .subscribe((currentItems : Appointment[]) => {
    //   this.currentItems=currentItems;

    // });    
  }

  ionViewDidEnter() {
    let events = [];
    let endTime;
    for (let item of this.currentItems) {
      if(item.dateDue != null && item.status == true){    //Nur wenn Datum vorhanden und Item noch nicht abgehandelt. 
        endTime = moment(item.dateDue).add(item.duration, 'minutes').format();
        events.push({
          title: new String(item.entryName),
          startTime: new Date(item.dateDue),
          endTime: new Date(endTime),
          allDay: false,
          id: item.id
        });
      }
    }
    this.eventSource = events;
  }

}
