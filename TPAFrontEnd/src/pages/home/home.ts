import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ListPage } from '../list/list';
import { CalendarPage } from '../calendar/calendar';
import { APIService } from '../../providers/apiservice/apiservice';
import { Appointment } from '../../models/appointment';
//import { User } from '../../models/user';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public currentItems: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: APIService) {
    this.restProvider.GetAppointmentsForUser(2).subscribe((currentItems : Appointment[]) => {
      this.currentItems = currentItems;
    });
  }

  itemTapped(event, item) {
    //ToDo: Add Function to directly link to item
  }
  goToChecklist()
  {
    this.navCtrl.push(ListPage);
  }
  goToCalendar(){
    this.navCtrl.push(CalendarPage);
  }
}
