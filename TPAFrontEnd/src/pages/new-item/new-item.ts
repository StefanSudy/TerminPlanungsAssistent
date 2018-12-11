import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Appointment } from '../../models/appointment';
import { APIService } from '../../providers/apiservice/apiservice';

@IonicPage()
@Component({
  selector: 'page-new-item',
  templateUrl: 'new-item.html',
})
export class NewItemPage {
  newItem: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private restService: APIService) {
    this.newItem = new Appointment;
  }
  saveForm(newItem: Appointment) {
    newItem.status = true;
    newItem.dateCreated = new Date(Date.now());
    newItem.userID = 2;
    this.newItem = newItem;
    this.restService.PostAppointment(newItem).subscribe(
      (createdItem) => {
        this.newItem = createdItem;
      }
    );
    this.navCtrl.pop();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad NewItemPage');
  }
  emptyDate() {
    this.newItem.dateDue = null;
  }
}
