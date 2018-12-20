import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
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
    if(newItem.entryName)
    {
      newItem.status = true;
      newItem.dateCreated = new Date();
      newItem.userID = +localStorage.getItem('user_id');
      this.newItem = newItem;
      this.restService.PostAppointment(newItem).subscribe(
        (createdItem) => {
          this.newItem = createdItem;
          this.navCtrl.pop();
        }
      );
    }
  }
  emptyDate() {
    this.newItem.dateDue = new Date(-8640000000000000);
  }
}
