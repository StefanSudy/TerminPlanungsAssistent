import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import * as moment from 'moment';
import { Appointment } from '../../models/appointment';
import { APIService } from '../../providers/apiservice/apiservice';
 
@IonicPage()
@Component({
  selector: 'page-event-modal',
  templateUrl: 'event-modal.html',
})
export class EventModalPage {
  newItem: any;
 
  constructor(public navCtrl: NavController, private navParams: NavParams, public viewCtrl: ViewController, private restService: APIService) {
    this.newItem = new Appointment;
    let preselectedDate = moment(this.navParams.get('selectedDay')).format();
    this.newItem.dateDue = preselectedDate;
  }
 
  cancel() {
    this.viewCtrl.dismiss(false);
  }
 
  save() {
    this.newItem.status = true;
    this.newItem.dateCreated = new Date();
    this.newItem.userID = +localStorage.getItem('user_id');
    this.restService.PostAppointment(this.newItem).subscribe(
      (createdItem) => {
        this.newItem = createdItem;
      }
    );
    this.viewCtrl.dismiss(this.newItem);
  }
 
}