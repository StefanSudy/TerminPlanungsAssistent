import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { Appointment } from '../../models/appointment';
import { ViewItemPage } from '../view-item/view-item';
import { NewItemPage } from '../new-item/new-item';
import { AppointmentProvider } from '../../providers/appointmentprovider/appointmentprovider';

@Component({
  selector: 'page-list',
  templateUrl: 'checklist.html',

})
export class ChecklistPage {
  currentItems: Array<{item: Appointment, expanded: boolean}> = [];
  itemExpandHeight: number = 80;

  constructor(public navCtrl: NavController, public navParams: NavParams, private appointmentProvider: AppointmentProvider) {
  }

  ionViewWillEnter() {
    var items = this.appointmentProvider.getAppointments();
    items.forEach(item => {
      this.currentItems.push({item: item, expanded: false});
    });
  }

  expandItem(item) {
    this.currentItems.map((listItem) => {
      if(item == listItem){
          listItem.expanded = !listItem.expanded;
      } else {
          listItem.expanded = false;
      }
    });
  }

  goToItemView(item) {
    this.navCtrl.push(ViewItemPage, {
      currentItem: item.item
    });
  }

  goToNewForm() {
    this.navCtrl.push(NewItemPage);
  }
}
