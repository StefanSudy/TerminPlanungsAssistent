import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Appointment } from '../../models/appointment';
import { APIService } from '../../providers/apiservice/apiservice';

@IonicPage()
@Component({
  selector: 'page-edit-item',
  templateUrl: 'edit-item.html',
})
export class EditItemPage {
  currentItem: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private restService: APIService) {
    this.currentItem = this.navParams.get('currentItem');
  }
  saveForm(currentItem: Appointment) {
    this.currentItem = currentItem;
    this.restService.PutAppointment(currentItem.id, currentItem)
    .subscribe(
      (updatedItem) => {
        this.currentItem = updatedItem;
      }
    );
    this.navCtrl.pop();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad EditItemPage');
  }
  emptyDate() {
    this.currentItem.dateDue = null;
  }

}
