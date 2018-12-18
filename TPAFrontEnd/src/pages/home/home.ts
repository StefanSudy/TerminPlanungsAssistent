import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ChecklistPage } from '../checklist/checklist';
import { CalendarPage } from '../calendar/calendar';
import { APIService } from '../../providers/apiservice/apiservice';
import { Appointment } from '../../models/appointment';
import { ViewItemPage } from '../view-item/view-item';
import { NewItemPage } from '../new-item/new-item';
import { User } from '../../models/user';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public currentItems: any = [];
  private user: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: APIService) {
  }
  ionViewDidLoad() {
    this.restProvider.GetAppointmentsForUser(+localStorage.getItem('user_id')).subscribe((currentItems : Appointment[]) => {
      this.currentItems = currentItems;
    });
  }
  itemTapped(item) {
    this.navCtrl.push(ViewItemPage, { 
      currentItem: item
    })
  }
  goToChecklist()
  {
    this.navCtrl.push(ChecklistPage);
  }
  goToCalendar(){
    this.navCtrl.push(CalendarPage);
  }
  goToNewItem() {
    this.navCtrl.push(NewItemPage);
  }
  ionViewWillEnter() {
   //if user is not logged in, push to login
  }
}
