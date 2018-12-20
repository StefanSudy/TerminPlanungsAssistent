import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { APIService } from '../../providers/apiservice/apiservice';
import { Appointment } from '../../models/appointment';
import { ViewItemPage } from '../view-item/view-item';
import { NewItemPage } from '../new-item/new-item';

@Component({
  selector: 'page-list',
  templateUrl: 'checklist.html',

})
export class ChecklistPage {
  currentItems: Appointment[];
  itemExpandHeight: number = 100;
  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: APIService) {

  }

  goToItemView(item) {
    this.navCtrl.push(ViewItemPage, {
      currentItem: item
    });
  }

  ionViewWillLoad() {
    this.restProvider.GetAppointmentsForUser(+localStorage.getItem('user_id')).subscribe((currentItems : Appointment[]) => {
      this.currentItems = currentItems;
      this.currentItems.forEach(element => {
        element.expand = false;
      });
    });

  }

  expandItem(item) {
    this.currentItems.map((listItem) => {
 
      if(item == listItem){
          listItem.expand = !listItem.expand;
      } else {
          listItem.expand = false;
      }
      return listItem;
    });
  }

  goToNewForm() {
    this.navCtrl.push(NewItemPage);
  }
}
