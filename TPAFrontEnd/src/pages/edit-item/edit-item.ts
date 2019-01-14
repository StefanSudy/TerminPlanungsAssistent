import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Appointment } from '../../models/appointment';
import { APIService } from '../../providers/apiservice/apiservice';
import { AppointmentProvider } from '../../providers/appointmentprovider/appointmentprovider';

@IonicPage()
@Component({
  selector: 'page-edit-item',
  templateUrl: 'edit-item.html',
})
export class EditItemPage {
  currentItem: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private restService: APIService, private appointmentProvider: AppointmentProvider, private loadingCtrl: LoadingController) {
    this.currentItem = this.navParams.get('currentItem');
  }
  saveForm(currentItem: Appointment) {
    this.currentItem = currentItem;
    let loader = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Wird gespeichert...'
    })
    loader.present();
    this.restService.PutAppointment(currentItem.id, currentItem)
    .subscribe(
      (updatedItem) => {
        this.appointmentProvider.updateAppointment(updatedItem);
        loader.dismiss();
        this.navCtrl.pop();
      }
    );
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad EditItemPage');
  }
  emptyDate() {
    this.currentItem.dateDue = null;
  }

}
