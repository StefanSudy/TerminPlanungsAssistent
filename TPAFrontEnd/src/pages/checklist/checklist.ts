import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { APIService } from '../../providers/apiservice/apiservice';
import { Appointment } from '../../models/appointment';
import { ViewItemPage } from '../view-item/view-item';
import { NewItemPage } from '../new-item/new-item';

@Component({
  selector: 'page-list',
  templateUrl: 'checklist.html'
})
export class ChecklistPage {
  currentItems: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: APIService) {
    this.restProvider.GetAppointmentsForUser(2).subscribe((currentItems : Appointment[]) => {
      this.currentItems = currentItems;
    });
  }

  itemTapped(item) {
    this.navCtrl.push(ViewItemPage, {
      currentItem: item
    });
  }
  goToNewForm() {
    this.navCtrl.push(NewItemPage);
  }
}
