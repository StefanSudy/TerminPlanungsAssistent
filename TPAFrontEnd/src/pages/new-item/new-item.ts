import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController} from 'ionic-angular';
import { Appointment } from '../../models/appointment';
import { APIService } from '../../providers/apiservice/apiservice';
import { AppointmentProvider } from '../../providers/appointmentprovider/appointmentprovider';

@IonicPage()
@Component({
  selector: 'page-new-item',
  templateUrl: 'new-item.html',
})
export class NewItemPage {
  newItem: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private restService: APIService, private appointmentProvider: AppointmentProvider, private loadingCtrl: LoadingController) {
    this.newItem = new Appointment;
  }
  saveForm(newItem: Appointment) {
    if(newItem.entryName)
    {
      newItem.status = true;
      newItem.dateCreated = new Date();
      newItem.userID = +localStorage.getItem('user_id');
      this.newItem = newItem;
      let loader = this.loadingCtrl.create({
        spinner: 'crescent',
        content: 'Wird gespeichert...'
      })
      loader.present();
      this.restService.PostAppointment(newItem).subscribe(
        (createdItem) => {
          this.appointmentProvider.addAppointment(createdItem);
          loader.dismiss();
          this.navCtrl.pop();
        }
      );
    }
  }
  emptyDate() {
    this.newItem.dateDue = new Date(-8640000000000000);
  }
}
